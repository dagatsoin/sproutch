import * as React from 'react'
import { Animated, Platform, ScrollView } from 'reactxp'

import { recall, shouldComponentUpdate } from '../../helpers'
import { Styles } from '../../styles'
import { Theme } from '../../styles/theme'
import { InjectedTheme, withTheme } from '../../styles/withTheme'
import {
  AnimatedCompositeAnimation,
  AnimatedViewStyleRuleSet,
} from '../animated'
import { Paper } from '../paper'
import { LayoutInfo, View } from '../view'
import { ScrollIndicator } from './ScrollIndicator'
import { TabBarStyleOverride, tabsBarStyle, TabsBarStyle } from './styles'
import Tab, { TabProps } from './Tab'

export type TabBarProps = {
  activeTabId?: string
  hasIconOnTop?: boolean
  palette?: 'primary' | 'secondary'
  style?: Partial<TabBarStyleOverride>
  tabs: TabProps[]
  customCursorAnimation?: CustomTabBarCursorAnimation
  isFrozen?: boolean
  renderCustomCursor?: (
    tabLayout: LayoutInfo,
    barLayout: LayoutInfo,
    theme: Theme<any, any>
  ) => React.ReactNode
  leftScrollButton?: (theme: Theme<any, any>) => React.ReactNode
  rightScrollButton?: (theme: Theme<any, any>) => React.ReactNode
  onPressActiveTab?: () => void
  onChange?: (tabId: string) => void
}

type CompleteProps = TabBarProps & InjectedTheme<Theme<any, any>>

export type CustomTabBarCursorAnimation = (
  cursorValues: AnimatedValues,
  targetLayout: LayoutInfo,
  theme: Theme<any, any>
) => {
  opacity?: AnimatedCompositeAnimation
  translateX?: AnimatedCompositeAnimation
  translateY?: AnimatedCompositeAnimation
  rotate?: AnimatedCompositeAnimation
  scaleX?: AnimatedCompositeAnimation
  scaleY?: AnimatedCompositeAnimation
}

type AnimatableKey =
  | 'opacity'
  | 'translateX'
  | 'translateY'
  | 'rotate'
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
  wrapperWidth: number
}

type ControlState = 'stale' | 'isLayoutReady'

type MutationType = 'registerTab' | 'removeTab' | 'setTabLayout'

type PayloadLayout = TabState

type PayloadRegisterTab = TabState

type PayloadRemoveTab = { id: string }

type PayloadType = PayloadLayout | PayloadRegisterTab | PayloadRemoveTab

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

class Tabs extends React.Component<CompleteProps, State> {
  get activeTab(): TabState | undefined {
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

  get tabs(): React.ReactNodeArray {
    return this.props.tabs.map(props => (
      <Tab key={props.id} {...props} {...this.bindTab(props.id)} />
    ))
  }

  private static cursorTransitionDuration = 200
  public state: State = {
    activeTabId: '',
    isScrollEnabled: false,
    hasLeftScrollIndicator: false,
    hasRightScrollIndicator: false,
    wrapperWidth: 0,
  }

  private layout: TabsLayout = {
    currentScroll: 0,
    maxScroll: 0,
    tabsState: [],
  }

  private scrollViewRef?: ScrollView
  private SAMmodel: SAMModel = {
    tabsWidth: 0,
    tabsState: [],
  }
  private cursorAnimatedValues = {
    opacity: Animated.createValue(0),
    translateX: Animated.createValue(0),
    translateY: Animated.createValue(0),
    rotate: Animated.createValue(0),
    scaleX: Animated.createValue(0),
    scaleY: Animated.createValue(1),
  }
  private animatedStyle: AnimatedViewStyleRuleSet
  private cursorAnimation: {
    [key in AnimatableKey]: AnimatedCompositeAnimation
  }
  private controlState: ControlState = 'stale'

  /**
   * This function set the new scroll value for the next tab to be completely visible when clicking on the
   * right indicator.
   * 1 - Find the last tab on the right which is completely visible.
   * 2 - Find the next tab, if any, to display.
   * 3 - Scroll
   */
  private rollRight = recall(
    (iteration: number = 0) => {
      /* 1 */
      const lastEntirelyDisplayedTab = getLastEntirelyDisplayedTab(
        this.layout,
        this.paddingHorizontal
      )
      if (lastEntirelyDisplayedTab === undefined) return

      /* 2 */
      const tabId = lastEntirelyDisplayedTab.id
      const nextTabIndex = Math.min(
        this.SAMmodel.tabsState.findIndex(tab => tab.id === tabId) +
          iteration +
          1,
        this.SAMmodel.tabsState.length - 1
      )
      const nextTab = this.SAMmodel.tabsState[nextTabIndex]

      /* 3 */
      this.scrollToTab(nextTab.id)
    },
    iteration => [iteration],
    500
  )

  /**
   * This function set the new scroll value for the next tab to be completely visible when clicking on the
   * left indicator.
   * 1 - Find the first tab on the left which is completely visible.
   * 2 - Find the provious tab, if any, to display.
   * 3 - Scroll
   */
  private rollLeft = recall(
    (iteration: number = 0) => {
      /* 1 */
      const firstEntirelyDisplayedTab = getFirstEntirelyDisplayedTab(
        this.layout
      )

      if (firstEntirelyDisplayedTab === undefined) return

      /* 2 */
      const tabId = firstEntirelyDisplayedTab.id
      const previousTabIndex = Math.max(
        this.SAMmodel.tabsState.findIndex(tab => tab.id === tabId) -
          (iteration + 1),
        0
      )

      const previousTab = this.SAMmodel.tabsState[previousTabIndex]

      /* 3 */
      this.scrollToTab(previousTab.id)
    },
    iteration => [iteration],
    500
  )

  public static getDerivedStateFromProps(
    nextProps: CompleteProps,
    state: State
  ) {
    const hasActiveTabFromPropsChanged =
      nextProps.activeTabId !== state.activeIdFromProps
    return {
      ...state,
      activeIdFromProps: nextProps.activeTabId,
      activeTabId:
        hasActiveTabFromPropsChanged && !!nextProps.activeTabId
          ? nextProps.activeTabId
          : state.activeTabId,
    }
  }

  constructor(props: CompleteProps) {
    super(props)
    const rotate = this.cursorAnimatedValues.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: Platform.getType() === 'web' ? [0, 360] : ['0deg', '360deg'],
    })

    this.animatedStyle = Styles.createAnimatedViewStyle({
      transform: [
        { translateX: this.cursorAnimatedValues.translateX },
        { translateY: this.cursorAnimatedValues.translateY },
        { scaleX: this.cursorAnimatedValues.scaleX },
        { scaleY: this.cursorAnimatedValues.scaleY },
        { rotate },
      ],
    })
  }

  public componentDidMount() {
    const firstTabId = getFirstTabId(this.SAMmodel)
    if (!!this.props.activeTabId || !!firstTabId) {
      this.setState({ activeTabId: this.props.activeTabId || firstTabId! })
    }
  }

  public shouldComponentUpdate(nextProps: CompleteProps, nextState: State) {
    return shouldComponentUpdate(nextProps, nextState, this.props, this.state)
  }

  public render() {
    const { isFrozen } = this.props
    const {
      hasLeftScrollIndicator,
      hasRightScrollIndicator,
      isScrollEnabled,
    } = this.state

    const styles = this.getStyles(isScrollEnabled)

    // In case of explicite scroll disabling, an offset is added on the content to mimic
    // the last known scroll
    const left = isFrozen ? { left: -this.layout.currentScroll } : {}
    const tabs = (
      <View
        style={[
          styles.scrollContent,
          { minWidth: this.state.wrapperWidth },
          left,
        ]}
      >
        {this.renderCursor(styles)}
        {this.tabs}
      </View>
    )

    return (
      <Paper
        elevation={2}
        style={{
          root: styles.root,
          content: styles.container,
        }}
        onLayout={this.onLayout}
      >
        {this.renderInScrollView(
          tabs,
          styles,
          isScrollEnabled,
          hasLeftScrollIndicator,
          hasRightScrollIndicator
        )}
      </Paper>
    )
  }

  public componentDidUpdate(_prevProps: CompleteProps, prevState: State) {
    // Prevent cursor animation when scrolling with arrows
    if (
      this.state.activeTabId !== prevState.activeTabId &&
      this.controlState === 'isLayoutReady'
    ) {
      this.scrollToTab(this.state.activeTabId)
    }
    if (this.activeTab && this.activeTab.layout) this.updateCursorPosition()
  }

  /**
   * This function inject some additional props into the child.
   */
  private bindTab = (id: string) => {
    const { hasIconOnTop, palette, isFrozen } = this.props
    const { activeTabId, isScrollEnabled } = this.state

    return {
      onWillMount: this.registerTab,
      onTabLayout: this.setTabLayout,
      onUnmount: this.removeTab,
      onPress: this.onPressTab,
      isFrozen, // remove ripple, disable click but keep the look
      isActive: id === activeTabId,
      mustGrow: isScrollEnabled,
      hasIconOnTop,
      palette,
    }
  }

  private updateCursorPosition() {
    if (!!this.cursorAnimation) {
      Object.keys(this.cursorAnimation).forEach(key =>
        this.cursorAnimation[key].stop()
      )
    }

    this.cursorAnimation = this.getAnimation({
      opacity: 1,
      translateX:
        this.activeTab!.layout!.x + this.activeTab!.layout!.width * 0.5,
      translateY: 0,
      rotate: 0,
      scaleX: this.activeTab!.layout!.width,
      scaleY: 1,
    })
    Object.keys(this.cursorAnimation).forEach(key =>
      this.cursorAnimation[key].start()
    )
  }

  private renderCursor(style: TabsBarStyle) {
    const activeTabLayout =
      this.activeTab && this.activeTab.layout
        ? this.activeTab.layout
        : { x: 0, y: 0, width: 0, height: 0 }

    const barLayout =
      this.layout && this.layout.barLayout
        ? this.layout.barLayout
        : { x: 0, y: 0, width: 0, height: 0 }

    return (
      <Animated.View
        style={[style.cursorAnimatedContainer, this.animatedStyle]}
      >
        {this.props.renderCustomCursor ? (
          this.props.renderCustomCursor(
            activeTabLayout,
            barLayout,
            this.props.theme
          )
        ) : (
          <View style={style.cursor} />
        )}
      </Animated.View>
    )
  }

  private renderInScrollView(
    tabs: React.ReactNode,
    styles: TabsBarStyle,
    isScrollEnabled: boolean,
    hasLeftScrollIndicator: boolean,
    hasRightScrollIndicator: boolean
  ) {
    const {
      palette,
      theme,
      leftScrollButton,
      rightScrollButton,
      isFrozen,
    } = this.props

    return (
      <>
        <ScrollView
          ref={(comp: any) => (this.scrollViewRef = comp)}
          scrollEnabled={isScrollEnabled && !isFrozen}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}
          style={styles.scrollView}
        >
          {tabs}
        </ScrollView>
        {hasLeftScrollIndicator && leftScrollButton && (
          <ScrollIndicator
            palette={palette}
            style={styles.leftIndicator}
            slot={leftScrollButton}
            theme={theme}
            onPress={() => this.rollLeft()}
          />
        )}
        {hasRightScrollIndicator && rightScrollButton && (
          <ScrollIndicator
            palette={palette}
            style={styles.rightIndicator}
            slot={rightScrollButton}
            theme={theme}
            onPress={() => this.rollRight()}
          />
        )}
      </>
    )
  }

  private getStyles(isScrollEnabled: boolean) {
    const { hasIconOnTop, palette, theme, style } = this.props

    return tabsBarStyle({
      theme,
      palette,
      style,
      options: {
        hasIconOnTop,
        isScrollEnabled,
      },
    })
  }

  private onLayout = (barLayout: LayoutInfo) => {
    // Prevent infine onLayout loop
    if (
      this.layout.barLayout !== undefined &&
      barLayout.height === this.layout.barLayout.height &&
      barLayout.width === this.layout.barLayout.width &&
      barLayout.x === this.layout.barLayout.x &&
      barLayout.y === this.layout.barLayout.y
    )
      return

    this.layout.barLayout = barLayout
    this.computeState()
  }

  private computeState() {
    const previousControlState = this.controlState
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
      .map(({ id, layout }) => ({ id, layout: layout! }))

    if (this.controlState === 'isLayoutReady' && this.activeTab) {
      // ALl the layouts are known. Set the initial cursor layout.
      if (previousControlState === 'stale' && this.activeTab.layout) {
        this.cursorAnimatedValues.translateX.setValue(this.activeTab.layout.x)
        this.cursorAnimatedValues.scaleX.setValue(this.activeTab.layout.width)
      }
      this.updateCursorPosition()
    }

    /*
     * What to do next?
     */

    switch (this.controlState) {
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
  private registerTab = (id: string) => {
    this.present({
      mutation: 'registerTab',
      payload: { id },
    } as Proposal<PayloadRegisterTab>)
  }

  /**
   * Remove a tab
   */
  private removeTab = (id: string) => {
    this.present({
      mutation: 'removeTab',
      payload: { id },
    } as Proposal<PayloadRemoveTab>)
  }

  /*
   * A tab wants to update its layout
   */
  private setTabLayout = (payload: { id: string; layout: LayoutInfo }) => {
    this.present({
      mutation: 'setTabLayout',
      payload,
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
      this.SAMmodel.tabsState = this.SAMmodel.tabsState.filter(
        t => t.id !== payload.id
      )
      // Let add this tab
      this.SAMmodel.tabsState.push({ id: payload.id, isStale: true })
      this.computeState()
    } else if (proposal.mutation === 'setTabLayout') {
      const payload = proposal.payload as PayloadLayout
      if (!payload.layout) return
      if (this.isLayoutReady) {
        // The tabs are still ready.
        this.SAMmodel.tabsState = this.SAMmodel.tabsState.map(ref => {
          if (ref.id === payload.id) return payload
          return { ...ref }
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
      this.SAMmodel.tabsState = this.SAMmodel.tabsState.filter(
        s => s.id !== payload.id
      )
      this.SAMmodel.tabsWidth = getTabsWidth(this.SAMmodel)
      this.computeState()
    }
    // Always sort the tabs state in the same order as the props.
    this.props.tabs.reduce((newOrderedArray, tab) => {
      const tabToOrder = this.SAMmodel.tabsState.findIndex(t => t.id === tab.id)
      return !!tabToOrder ? [tabToOrder, ...newOrderedArray] : newOrderedArray
    }, [])
  }

  private setScrollState() {
    const isScrollEnabled =
      this.SAMmodel.tabsWidth > this.layout.barLayout!.width
    const hasRightScrollIndicator = isScrollEnabled
    this.layout.maxScroll = isScrollEnabled
      ? this.SAMmodel.tabsWidth -
        this.layout.barLayout!.width +
        this.getStyles(isScrollEnabled).paddingHorizontal * 2
      : 0
    const wrapperWidth =
      ((this.layout && this.layout.barLayout && this.layout.barLayout.width) ||
        0) -
      this.paddingHorizontal * 2

    this.setState(
      { isScrollEnabled, hasRightScrollIndicator, wrapperWidth },
      () => {
        if (!this.props.isFrozen) {
          this.scrollToTab(this.state.activeTabId, false)
        }
      }
    )
  }

  private scrollToTab(id: string, animated?: boolean) {
    const offset = this.getTabOffset(id)
    this.scrollTo(this.layout.currentScroll + offset, animated)
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
      const offsetBorderRight = getTabRightOffset(
        tab,
        this.layout,
        this.paddingHorizontal
      )
      if (offsetBorderLeft < 0) {
        return offsetBorderLeft
      } else if (offsetBorderRight > 0) {
        return offsetBorderRight
      } else return 0
    }
  }

  private scrollTo(position: number, animated: boolean = true) {
    const value = this.limit(position)
    this.scrollViewRef && this.scrollViewRef.setScrollLeft(value, animated)
    this.layout.currentScroll = Math.round(value) // Round to prevent sub pixel edge case behaviors
  }

  private onScroll = (_newScrollTop: number, newScrollLeft: number) => {
    this.layout.currentScroll = Math.round(newScrollLeft) // Round to prevent sub pixel edge case behaviors
    if (
      this.layout.currentScroll > 0 !== this.state.hasLeftScrollIndicator ||
      this.layout.currentScroll < this.layout.maxScroll !==
        this.state.hasRightScrollIndicator
    ) {
      this.setState({
        hasLeftScrollIndicator: this.layout.currentScroll > 0,
        hasRightScrollIndicator:
          this.layout.currentScroll < this.layout.maxScroll,
      })
    }
  }

  private limit(value: number = 0) {
    return Math.min(this.layout.maxScroll, Math.max(0, value))
  }

  private onPressTab = (activeTabId: string) => {
    const { onChange, onPressActiveTab } = this.props
    // Offset the tab if it overflows
    if (activeTabId !== this.state.activeTabId) {
      this.scrollToTab(activeTabId)
      onChange && onChange(activeTabId)
      this.setState({ activeTabId })
    } else {
      onPressActiveTab && onPressActiveTab()
    }
  }

  private getAnimation({
    opacity,
    translateX,
    translateY,
    rotate,
    scaleX,
    scaleY,
  }: { [key in AnimatableKey]: number }) {
    const customAnimation = this.props.customCursorAnimation
      ? this.props.customCursorAnimation(
          this.cursorAnimatedValues,
          this.activeTab!.layout!,
          this.props.theme
        )
      : {}

    return {
      opacity:
        customAnimation.opacity ||
        Animated.timing(this.cursorAnimatedValues.opacity, {
          toValue: opacity,
          duration: Tabs.cursorTransitionDuration,
          easing: Animated.Easing.InOut(),
        }),
      translateX:
        customAnimation.translateX ||
        Animated.timing(this.cursorAnimatedValues.translateX, {
          toValue: translateX,
          duration: Tabs.cursorTransitionDuration,
          easing: Animated.Easing.InOut(),
        }),
      translateY:
        customAnimation.translateY ||
        Animated.timing(this.cursorAnimatedValues.translateY, {
          toValue: translateY,
          duration: Tabs.cursorTransitionDuration,
          easing: Animated.Easing.InOut(),
        }),
      rotate:
        customAnimation.rotate ||
        Animated.timing(this.cursorAnimatedValues.rotate, {
          toValue: rotate,
          duration: Tabs.cursorTransitionDuration,
          easing: Animated.Easing.InOut(),
        }),
      scaleX:
        customAnimation.scaleX ||
        Animated.timing(this.cursorAnimatedValues.scaleX, {
          toValue: scaleX,
          duration: Tabs.cursorTransitionDuration,
          easing: Animated.Easing.InOut(),
        }),
      scaleY:
        customAnimation.scaleY ||
        Animated.timing(this.cursorAnimatedValues.scaleY, {
          toValue: scaleY,
          duration: Tabs.cursorTransitionDuration,
          easing: Animated.Easing.InOut(),
        }),
    }
  }
}

function getFirstTab(model: SAMModel): TabState | undefined {
  return model.tabsState[0] || undefined
}

function getLastTab(model: SAMModel): TabState | undefined {
  return model.tabsState[model.tabsState.length - 1]
}

function getFirstTabId(model: SAMModel): string | undefined {
  const tab = model.tabsState[0]
  return tab ? tab.id : undefined
}

function getTabsWidth(model: SAMModel): number {
  if (model.tabsState.length === 0) return 0
  const firstTabRect = getFirstTab(model)!.layout!
  const lastTabRect = getLastTab(model)!.layout!
  return !!firstTabRect && !!lastTabRect // Tabs are not mounted yet
    ? Math.round(lastTabRect.x + lastTabRect.width - firstTabRect.x) // Round to prevent sub pixel edge case behaviors
    : 0
}

function getTabRightOffset(
  tab: TabLayout,
  tabsLayout: TabsLayout,
  paddingHorizontal: number
): number {
  return (
    tab.layout!.x +
    tab.layout!.width -
    tabsLayout.currentScroll -
    (tabsLayout.barLayout!.x +
      tabsLayout.barLayout!.width -
      paddingHorizontal * 2)
  )
}

function getTabLeftOffset(tab: TabLayout, tabsLayout: TabsLayout): number {
  return tab.layout!.x - tabsLayout.currentScroll - tabsLayout.barLayout!.x
}

function isTabOutsideOnRight(
  tabState: TabLayout,
  tabsLayout: TabsLayout,
  paddingHorizontal: number
): boolean {
  return getTabRightOffset(tabState, tabsLayout, paddingHorizontal) > 0
}

function isTabOutsideOnLeft(
  tabState: TabLayout,
  tabsLayout: TabsLayout
): boolean {
  return getTabLeftOffset(tabState, tabsLayout) < 0
}

/**
 * Find the last tab on the right which is completely visible.
 */
function getLastEntirelyDisplayedTab(
  tabsLayout: TabsLayout,
  paddingHorizontal: number
): TabLayout | undefined {
  return tabsLayout.tabsState
    .slice()
    .reverse()
    .find(t => !isTabOutsideOnRight(t, tabsLayout, paddingHorizontal))
}

/**
 * Find the last tab on the left which is completely visible.
 */
function getFirstEntirelyDisplayedTab(
  tabsLayout: TabsLayout
): TabLayout | undefined {
  return tabsLayout.tabsState
    .slice()
    .find(t => !isTabOutsideOnLeft(t, tabsLayout))
}

export default withTheme(Tabs)
