import React from 'react'
import { TabProps } from './Tab'
import { ScrollView, Types, GestureView, Styles, Animated, Platform, Button } from 'reactxp'
import { LayoutInfo } from 'reactxp/dist/common/Types'

import { Theme } from '../../styles/theme'
import { withTheme, InjectedTheme } from '../../styles/withTheme'
import { View } from '../view'
import { tabsBarStyle, TabsBarStyle } from './styles'
import { debounce } from '../../helpers'
import { Ripple } from '../ripple'

type Props = {
  activeTabId?: string
  hasTwoLines?: boolean
  palette?: 'primary' | 'secondary'
  style?: Partial<TabsBarStyle>
  children: (setProps: (id: string) => Partial<TabProps>) => JSX.Element
  customCursorAnimation?: CustomAnimation
  renderCustomCursor?: (tabLayout: LayoutInfo, barLayout: LayoutInfo, theme: Theme<any, any>) => JSX.Element | JSX.Element[]
  renderLeftIndicator?: () => JSX.Element | JSX.Element[]
  renderRightIndicator?: () => JSX.Element | JSX.Element[]
} & InjectedTheme<Theme<any, any>>

export type CustomAnimation = (cursorValues: AnimatedValues, targetLayout: LayoutInfo, theme: Theme<any, any>) => {
  opacity?: Types.Animated.CompositeAnimation
  translateX?: Types.Animated.CompositeAnimation
  translateY?: Types.Animated.CompositeAnimation
  rotateX?: Types.Animated.CompositeAnimation
  rotateY?: Types.Animated.CompositeAnimation
  rotateZ?: Types.Animated.CompositeAnimation
  scaleX?: Types.Animated.CompositeAnimation
  scaleY?: Types.Animated.CompositeAnimation
}

type AnimatableKey = 
  | 'opacity'
  | 'translateX'
  | 'translateY'
  | 'rotateX'
  | 'rotateY'
  | 'rotateZ'
  | 'scaleX'
  | 'scaleY'

type AnimatedValues = { [key in AnimatableKey]: Animated.Value }

type SAMModel = {
  tabsState: TabState[]
  tabsWidth: number
}

type State = {
  activeIdFromProps?: string
  activeTabId: string
  isScrollEnabled: boolean
  hasLeftScrollIndicator: boolean
  hasRightScrollIndicator: boolean
}

type ControlState =
 | 'stale'
 | 'isLayoutReady'

type MutationType = 
 | 'registerTab'
 | 'removeTab'
 | 'setLayout'

type PayloadLayout = TabState

type PayloadRegisterTab = TabState

type PayloadRemoveTab = { id: string }

type PayloadType =
 | PayloadLayout
 | PayloadRegisterTab
 | PayloadRemoveTab

type Proposal<T extends PayloadType> = {
  mutation: MutationType
  payload: T
}

type TabState = {
  isStale: boolean
  id: string
  layout?: LayoutInfo
}

type TabLayout = {
  id: string
  layout: LayoutInfo
}

type TabsLayout = {
  barLayout?: LayoutInfo
  currentScroll: number
  maxScroll: number
  tabsState: TabLayout[]
}

class Tabs extends React.PureComponent<Props, State> {
  state: State = {
    activeTabId: '',
    isScrollEnabled: false,
    hasLeftScrollIndicator: false,
    hasRightScrollIndicator: false,
  }

  private layout: TabsLayout = {
    currentScroll: 0,
    maxScroll: 0,
    tabsState: []
  }

  private scrollViewRef?: ScrollView
  private SAMmodel: SAMModel = {
    tabsWidth: 0,
    tabsState: []
  }
  private cursorAnimatedValues = {
    opacity: Animated.createValue(0),
    translateX: Animated.createValue(0),
    translateY: Animated.createValue(0),
    rotateX: Animated.createValue(0),
    rotateY: Animated.createValue(0),
    rotateZ: Animated.createValue(0),
    scaleX: Animated.createValue(0),
    scaleY: Animated.createValue(0),
  }
  private animatedStyle: Types.AnimatedViewStyleRuleSet
  private cursorAnimation: { [key in AnimatableKey]: Types.Animated.CompositeAnimation }
  private controlState: ControlState = 'stale'
  static cursorTransitionDuration = 200

  get activeTab(): TabState | undefined  {
    return this.SAMmodel.tabsState.find(s => s.id === this.state.activeTabId)
  }

  get paddingHorizontal(): number {
    return this.getStyles(this.state.isScrollEnabled).paddingHorizontal
  }

  get isLayoutReady() {
    return (
      this.layout.barLayout !== undefined &&
      this.SAMmodel.tabsState.length > 0 &&
      this.SAMmodel.tabsState.every(tab => !tab.isStale)
    )
  }

  static getDerivedStateFromProps(nextProps: Props, state: State) {
    const hasActiveTabFromPropsChanged = nextProps.activeTabId !== state.activeIdFromProps
    return {
      ...state,
      activeIdFromProps: nextProps.activeTabId,
      activeTabId: hasActiveTabFromPropsChanged && !!nextProps.activeTabId
        ? nextProps.activeTabId
        : state.activeTabId
    }
  }

  componentDidMount(){
    const rotateX = this.cursorAnimatedValues.rotateX.interpolate({
        inputRange: [0, 1],
        outputRange: Platform.getType() === 'web'
          ? [0, 360]
          : ['0deg', '360deg']
      })
    const rotateY = this.cursorAnimatedValues.rotateY.interpolate({
        inputRange: [0, 1],
        outputRange: Platform.getType() === 'web'
          ? [0, 360]
          : ['0deg', '360deg']
      })
    const rotateZ = this.cursorAnimatedValues.rotateZ.interpolate({
        inputRange: [0, 1],
        outputRange: Platform.getType() === 'web'
          ? [0, 360]
          : ['0deg', '360deg']
      })
    
    this.animatedStyle = Styles.createAnimatedViewStyle({
      transform: [
        { translateX: this.cursorAnimatedValues.translateX },
        { translateY: this.cursorAnimatedValues.translateY },
        { rotateX },
        { rotateY },
        Platform.getType() !== 'web'
            ? { rotateZ }
            : undefined as any, // waiting for ReactXP to fix the rotateZ issue for web
        { scaleX: this.cursorAnimatedValues.scaleX },
        { scaleY: this.cursorAnimatedValues.scaleY },
      ].filter(t => !!t)
    })
    const firstTabId = getFirstTabId(this.SAMmodel)
    if (!!this.props.activeTabId || !!firstTabId) {
      this.setState({ activeTabId: this.props.activeTabId || firstTabId! })
    }
  }

  render() {
    const {
      hasLeftScrollIndicator,
      hasRightScrollIndicator,
      isScrollEnabled,
    } = this.state

    const styles = this.getStyles(isScrollEnabled)

    const tabs = (
      <View style={styles.wrapper}>
        { this.renderCursor(styles) }
        {this.props.children(this.bindTab.bind(this))}
      </View>
    )

    return (
      <View
        style={styles.root}
        onLayout={this.onLayout.bind(this)}
      >
        {
          isScrollEnabled
            ? this.renderInScrollView(tabs, styles, isScrollEnabled, hasLeftScrollIndicator, hasRightScrollIndicator)
            : tabs
        }
      </View>
    )
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    // Prevent cursor animation when scrolling with with arrows
    if ((this.state.activeTabId !== prevState.activeTabId) && this.controlState === 'isLayoutReady') {
      this.scrollToTab(this.state.activeTabId)
      this.updateCursorPosition()
    }
  }

  /**
   * This function inject some additional props into the child.
   */
  private bindTab(id: string): Partial<TabProps>  {
    const { hasTwoLines, palette } = this.props
    const { activeTabId, isScrollEnabled } = this.state

    return {
      onWillMount: this.registerTab.bind(this),
      onTabLayout: this.setTabLayout.bind(this),
      onUnmount: this.removeTab.bind(this),
      onClick: this.onClickTab.bind(this),
      isActive: id === activeTabId,
      mustGrow: isScrollEnabled,
      hasTwoLines,
      palette
    }
  }

  private updateCursorPosition() {
    if (!!this.cursorAnimation) {
      Object.keys(this.cursorAnimation).forEach(key => this.cursorAnimation[key].stop())
    }
    
    this.cursorAnimation = this.getAnimation(
      {
        opacity: 1,
        translateX: this.activeTab!.layout!.x + this.activeTab!.layout!.width * .5,
        translateY: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scaleX: this.activeTab!.layout!.width,
        scaleY: 2,
      },
    )
    Object.keys(this.cursorAnimation).forEach(key => this.cursorAnimation[key].start())
  }

  private renderCursor(style: TabsBarStyle) {
   return this.controlState === 'isLayoutReady'
      ? this.props.renderCustomCursor
        ? this.renderCustomCursor(style)
        : (
          <View
            style={[style.cursor]}
            animated={this.animatedStyle}
          />
        )
      : <></>
  }

  private renderCustomCursor(style: TabsBarStyle) {
    if (!this.props.renderCustomCursor) return <></>
    const customCursor = this.props.renderCustomCursor(this.activeTab!.layout!, this.layout.barLayout!, this.props.theme!) as React.ReactElement<View>
    return React.cloneElement(
      customCursor,
      {
        ...customCursor.props,
        style: [style.cursor, (customCursor.props as any).style],
        animated: this.animatedStyle
      } as any
    )
  }
  
  private renderInScrollView(
    tabs: JSX.Element | JSX.Element[],
    styles: TabsBarStyle,
    isScrollEnabled: boolean,
    hasLeftScrollIndicator: boolean,
    hasRightScrollIndicator: boolean
  ) {
    return (
      <>
        {hasLeftScrollIndicator && this.renderLeftIndicator(styles)}
        {hasRightScrollIndicator && this.renderRightIndicator(styles)}
        <ScrollView
          ref={(comp: ScrollView) => this.scrollViewRef = comp}
          scrollEnabled={ isScrollEnabled }
          horizontal={true}
          vertical={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll.bind(this)}
          style={styles.scrollView}
        >
          {tabs}
        </ScrollView>
      </>
    )
  }

  private getStyles(isScrollEnabled: boolean) {
    const { hasTwoLines, palette, theme, style } = this.props

    return tabsBarStyle({
        theme: theme!,
        palette,
        style,
        options: {
          hasTwoLines,
          isScrollEnabled
        }
      })
  }

  private onLayout(barLayout: LayoutInfo) {
    // Prevent infine onLayout loop
    if(
      this.layout.barLayout !== undefined &&
      barLayout.height === this.layout.barLayout.height &&
      barLayout.width === this.layout.barLayout.width &&
      barLayout.x === this.layout.barLayout.x &&
      barLayout.y === this.layout.barLayout.y
    ) return

    this.layout.barLayout = barLayout
    this.computeState()
  }

  private computeState() {
    /*
     * Compute control state
     */

    if (this.controlState === 'stale') {
      // The component has just been mounted or some tabs has moved.
      // Wait for all tabs to be rendered
      if (this.isLayoutReady) {
        this.controlState = 'isLayoutReady'
      }
    } else if (this.controlState === 'isLayoutReady') {
      // Bar and tabs layouts are ready.
      // A tab has been removed while setting the scroll layout. Go back to `stale` state
      if (!this.isLayoutReady) {
        this.controlState = 'stale'
      }
    }
    /**
     * Update the view
     */
    this.layout.tabsState = this.SAMmodel.tabsState
        .filter(s => !s.isStale)
        .map(({id, layout}) => ({id, layout: layout!}))

    if (this.controlState === 'isLayoutReady' && this.activeTab) {
      this.updateCursorPosition()
    }

    /*
     * What to do next?
     */
    
    switch(this.controlState) {
      default:
      case 'stale':
        // The component has just been mounted or some tabs has moved.
        // Wait for all tabs to be rendered
        break

      case 'isLayoutReady':
        // Bar and tabs layouts are ready.
        // Now, state if the scroll mode is needed
        this.setScrollState()
        break
    }
  }

  /*
   * ACTIONS
   */

  /**
   * Register a tab
   */
  private registerTab(id: string) {
    this.present({
      mutation: 'registerTab',
      payload: { id }
    } as Proposal<PayloadRegisterTab>)
  } 

  /**
   * Remove a tab
   */
  private removeTab(id: string) {
    this.present({
      mutation: 'removeTab',
      payload: { id }
    } as Proposal<PayloadRemoveTab>)
  } 

  /*
   * A tab wants to update its layout
   */
  private setTabLayout(payload: { id: string, layout: LayoutInfo }) {
    this.present({
      mutation: 'setLayout',
      payload
    } as Proposal<PayloadLayout>)
  }

  /*
   * MUTATIONS
   */
  private present(proposal: Proposal<any>) {
    if (proposal.mutation === 'registerTab') {
      const payload = proposal.payload as PayloadRegisterTab
      // The tabs are still valid. Register a tab now will stale the layout.
      // Remove existing tab if needed
      this.SAMmodel.tabsState = this.SAMmodel.tabsState.filter(t => t.id !== payload.id)
      // Let add this tab
      this.SAMmodel.tabsState.push({id: payload.id, isStale: true})
      this.computeState()
    } else if (proposal.mutation === 'setLayout') {
      const payload = proposal.payload as PayloadLayout
      if (!payload.layout) return
      if (this.isLayoutReady) {
        // The tabs are still ready.
        this.SAMmodel.tabsState = this.SAMmodel.tabsState.map(ref => {
          if (ref.id === payload.id) return payload
          return ({...ref })
        })
      } else {
        // Let set this tab has ready
        const tab = this.SAMmodel.tabsState.find(ref => ref.id === payload.id)
        if (tab) {
          tab.isStale = false
          tab.layout = payload.layout
        }
        this.SAMmodel.tabsWidth = getTabsWidth(this.SAMmodel)
      }    
      this.computeState()
    } else if (proposal.mutation === 'removeTab') {
      // removeTab is also happen during stale control state while refreshing a tab.
      // In this case, it is the registerTab mutation which handle this case.
      if (this.controlState === 'stale') return 
      const payload = proposal.payload as PayloadRemoveTab
      this.SAMmodel.tabsState = this.SAMmodel.tabsState
        .filter(s => s.id !== payload.id)
      this.SAMmodel.tabsWidth = getTabsWidth(this.SAMmodel)
      this.computeState()
    }
    // Always sort the tabs state by ID
    this.SAMmodel.tabsState.sort((a, b) => {
      return a.id.toUpperCase() < b.id.toUpperCase()
        ? -1
        : 1
    })
  }

  private setScrollState() {
    const isScrollEnabled = this.SAMmodel.tabsWidth > this.layout.barLayout!.width
    const hasRightScrollIndicator = isScrollEnabled
    this.layout.maxScroll = isScrollEnabled
      ? this.SAMmodel.tabsWidth - this.layout.barLayout!.width + this.getStyles(isScrollEnabled).paddingHorizontal * 2
      : 0
    this.setState({ isScrollEnabled, hasRightScrollIndicator })
  }

  /**
   * This function set the new scroll value for the next tab to be completely visible when clicking on the
   * right indicator.
   * 1 - Find the last tab on the right which is completely visible.
   * 2 - Find the next tab, if any, to display.
   * 3 - Scroll
   */
  private rollRight = debounce((id?: string) => {
    /* 1 */
    const lastEntirelyDisplayedTab = getLastEntirelyDisplayedTab(this.layout, this.paddingHorizontal)
    if (lastEntirelyDisplayedTab === undefined) return

    /* 2 */
    const tabId = id || lastEntirelyDisplayedTab.id
    const nextTabIndex = this.SAMmodel.tabsState.findIndex(tab => tab.id === tabId) + 1
    const nextTab = this.SAMmodel.tabsState[nextTabIndex]
    if (!nextTab) return // that was the last tab

    /* 3 */
    this.scrollToTab(nextTab.id)
  }, 200, true)

  /**
   * This function set the new scroll value for the next tab to be completely visible when clicking on the
   * left indicator.
   * 1 - Find the first tab on the left which is completely visible.
   * 2 - Find the provious tab, if any, to display.
   * 3 - Scroll
   */
  private rollLeft = debounce((id?: string) => {
    /* 1 */
    const firstEntirelyDisplayedTab = getFirstEntirelyDisplayedTab(this.layout)

    if (firstEntirelyDisplayedTab === undefined) return

    /* 2 */
    const tabId = id || firstEntirelyDisplayedTab.id
    const previousTabIndex = this.SAMmodel.tabsState.findIndex(tab => tab.id === tabId)
    const previousTab = this.SAMmodel.tabsState[previousTabIndex]
    if (!previousTab) return // that was the last tab

     /* 3 */
    this.scrollToTab(previousTab.id)
  }, 200, true)

  private scrollToTab(id: string) {
    const offset = this.getTabOffset(id)  
    this.scrollTo(this.layout.currentScroll + offset)
  }

  /**
   * Return the offset of the left border of a tab and the left or right border of the tabs bar.
   * If the number is negative, the tab is overflowing from the left side.
   * Otherwize the tab is overflowing from the right side.
   */
  private getTabOffset(id: string) {
    const tab = this.layout.tabsState.find(t => t.id === id)
    if (tab === undefined) return 0
    else {
      const offsetBorderLeft = getTabLeftOffset(tab, this.layout)
      const offsetBorderRight = getTabRightOffset(tab, this.layout, this.paddingHorizontal)
      if (offsetBorderLeft < 0) {
        return offsetBorderLeft
      } else if(offsetBorderRight > 0) {
        return offsetBorderRight
      } else return 0 
    }
  }

  private scrollTo(position: number, animated = true) {
    const value = this.limit(position)
    this.scrollViewRef ?
      this.scrollViewRef.setScrollLeft(value, animated)
      : 0
    this.layout.currentScroll = value
  }

  private onScroll(_newScrollTop: number, newScrollLeft: number) {
    this.layout.currentScroll = Math.round(newScrollLeft)
    this.setState({ 
      hasLeftScrollIndicator: this.layout.currentScroll > 0,
      hasRightScrollIndicator: this.layout.currentScroll < this.layout.maxScroll,
    })
  }

  private renderLeftIndicator(styles: TabsBarStyle) {
    const { isScrollEnabled } = this.state
    const { palette, renderLeftIndicator } = this.props

    return isScrollEnabled && renderLeftIndicator
      ? (
        <View 
          style={styles.leftIndicator}
          onPress={() => this.rollLeft()}
        >
          {renderLeftIndicator()}
          <Ripple palette={palette}/>
        </View>
      )
      : <></>
  }

  private renderRightIndicator(styles: TabsBarStyle) {
    const { isScrollEnabled } = this.state
    const { palette, renderRightIndicator } = this.props

    return isScrollEnabled && renderRightIndicator
      ? (
        <View 
          style={styles.rightIndicator}
          onPress={() => this.rollRight()}
        >
          {renderRightIndicator()}
          <Ripple palette={palette}/>
        </View>
      )
      : <></>
  }

  private limit(value: number = 0) {
    return Math.min(this.layout.maxScroll, Math.max(0, (value)))
  }

  private onClickTab(activeTabId: string) {
    // Offset the tab if it overflows
    this.scrollToTab(activeTabId)
    this.setState({ activeTabId })
  }

  private getAnimation({
    opacity,
    translateX,
    translateY,
    rotateX,
    rotateY,
    rotateZ,
    scaleX,
    scaleY,
  }: { [key in AnimatableKey]: number }) {
    const customAnimation = this.props.customCursorAnimation
      ? this.props.customCursorAnimation(this.cursorAnimatedValues, this.activeTab!.layout!, this.props.theme!)
      : {}

    return {
      opacity: customAnimation.opacity || Animated
        .timing(
          this.cursorAnimatedValues.opacity,
          {
            toValue: opacity,
            duration: Tabs.cursorTransitionDuration,
            easing: Animated.Easing.InOut(),
          }
        ),
      translateX: customAnimation.translateX || Animated
          .timing(
            this.cursorAnimatedValues.translateX,
            {
              toValue: translateX,
              duration: Tabs.cursorTransitionDuration,
              easing: Animated.Easing.InOut(),
            }
          ),
      translateY: customAnimation.translateY || Animated
        .timing(
          this.cursorAnimatedValues.translateY,
          {
            toValue: translateY,
            duration: Tabs.cursorTransitionDuration,
            easing: Animated.Easing.InOut(),
          }
        ),
      rotateX: customAnimation.rotateX || Animated
        .timing(
          this.cursorAnimatedValues.rotateX,
          {
            toValue: rotateX,
            duration: Tabs.cursorTransitionDuration,
            easing: Animated.Easing.InOut(),
          }
        ),
      rotateY: customAnimation.rotateY || Animated
        .timing(
          this.cursorAnimatedValues.rotateY,
          {
            toValue: rotateY,
            duration: Tabs.cursorTransitionDuration,
            easing: Animated.Easing.InOut(),
          }
        ),
      rotateZ: customAnimation.rotateZ || Animated
        .timing(
          this.cursorAnimatedValues.rotateZ,
          {
            toValue: rotateZ,
            duration: Tabs.cursorTransitionDuration,
            easing: Animated.Easing.InOut(),
          }
        ),
      scaleX: customAnimation.scaleX || Animated
        .timing(
          this.cursorAnimatedValues.scaleX,
          {
            toValue: scaleX,
            duration: Tabs.cursorTransitionDuration,
            easing: Animated.Easing.InOut(),
          }
        ),
      scaleY: customAnimation.scaleY || Animated
        .timing(
          this.cursorAnimatedValues.scaleY,
          {
            toValue: scaleY,
            duration: Tabs.cursorTransitionDuration,
            easing: Animated.Easing.InOut(),
          }
        )
    }
  }
}

function getFirstTab(model: SAMModel): TabState | undefined{
  return model.tabsState[0] || undefined
}

function getLastTab(model: SAMModel): TabState | undefined {
  return model.tabsState[model.tabsState.length - 1]
}

function getFirstTabId(model: SAMModel): string | undefined {
  const tab = model.tabsState[0]
  return tab !== undefined
    ? tab.id
    : undefined
}

function getTabsWidth(model: SAMModel): number {
  if (model.tabsState.length === 0) return 0
  const firstTabRect = getFirstTab(model)!.layout!
  const lastTabRect = getLastTab(model)!.layout!
  return !!firstTabRect && !!lastTabRect // Tabs are not mounted yet
    ? Math.round(lastTabRect.x + lastTabRect.width - firstTabRect.x) // Some weird float value may happen. Round for consistency.
    : 0
}

function getTabRightOffset(tab: TabLayout, tabsLayout: TabsLayout, paddingHorizontal: number): number {
  return (tab.layout!.x + tab.layout!.width - tabsLayout.currentScroll) - (tabsLayout.barLayout!.x + tabsLayout.barLayout!.width - paddingHorizontal * 2)
}

function getTabLeftOffset(tab: TabLayout, tabsLayout: TabsLayout) {
  return tab.layout!.x - tabsLayout.currentScroll - tabsLayout.barLayout!.x
}

function isTabOutsideOnRight(tabState: TabLayout, tabsLayout: TabsLayout, paddingHorizontal: number) {
  return getTabRightOffset(tabState, tabsLayout, paddingHorizontal) > 0
}

function isTabOutsideOnLeft(tabState: TabLayout, tabsLayout: TabsLayout) {
  return getTabLeftOffset(tabState, tabsLayout) < 0
}

/**
 * Find the last tab on the right which is completely visible.
 */
function getLastEntirelyDisplayedTab(tabsLayout: TabsLayout, paddingHorizontal): TabLayout | undefined {
  return tabsLayout.tabsState
    .slice()
    .reverse()
    .find(t => !isTabOutsideOnRight(t, tabsLayout, paddingHorizontal))
}

  /**
 * Find the last tab on the left which is completely visible.
 */
function getFirstEntirelyDisplayedTab(tabsLayout: TabsLayout): TabLayout | undefined {
  return tabsLayout.tabsState
  .slice()
  .reverse()  
  .find(t => isTabOutsideOnLeft(t, tabsLayout))
}

export default withTheme()(Tabs)