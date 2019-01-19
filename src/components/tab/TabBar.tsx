import React from 'react'
import Tab, { TabProps } from './Tab'
import { ScrollView, Types, GestureView, Styles, Animated } from 'reactxp'
import { LayoutInfo } from 'reactxp/dist/common/Types'

import { Theme } from '../../styles/theme'
import { withTheme, InjectedTheme } from '../../styles/withTheme'
import { View } from '../view'
import { tabsBarStyle, TabsBarStyle } from './styles'
import { debounce } from '../../helpers'

type Props = {
  activeTabId?: string
  hasTwoLines?: boolean
  palette: 'primary' | 'secondary' | ''
  style?: Partial<TabsBarStyle>
  children: JSX.Element | JSX.Element[]
  renderLeftIndicator?: () => JSX.Element | JSX.Element[]
  renderRightIndicator?: () => JSX.Element | JSX.Element[]
} & InjectedTheme<Theme<any, any>>

type State = {
  activeIdFromProps?: string
  activeTabId: string
  isScrollEnabled: boolean
  scrollStateIsReady: boolean
  hasLeftScrollIndicator: boolean
  hasRightScrollIndicator: boolean
  maxScroll: number
}

class Tabs extends React.PureComponent<Props, State> {
  state: State = {
    activeTabId: '',
    isScrollEnabled: false,
    scrollStateIsReady: false,
    hasLeftScrollIndicator: false,
    hasRightScrollIndicator: false,
    maxScroll: 0,
  }

  private barLayout?: LayoutInfo
  private scrollViewRef?: ScrollView
  private tabsRefs: Map<string, Tab> = new Map()
  private currentScroll = 0
  private cursorAnimatedValues = {
    translateX: Animated.createValue(0.0),
    scaleX: Animated.createValue(0.0)
  }
  private animatedStyle: Types.AnimatedViewStyleRuleSet
  private cursorAnimation: {
    translateX: Types.Animated.CompositeAnimation
    scaleX: Types.Animated.CompositeAnimation
  }

  static cursorTransitionTiming = 200

  get children() {
    const { hasTwoLines, palette } = this.props
    const { activeTabId, isScrollEnabled } = this.state
    return React.Children
      .map(
        this.props.children,
        (child: React.ReactElement<TabProps>) =>
          React.cloneElement(
            child,
            {
              ref: (tab: Tab) => this.tabsRefs.set(child.props.id, tab),
              onUnmount: () => this.tabsRefs.delete(child.props.id),
              onLayout: this.onTabLayout.bind(this), // each layout change of a tab will trigger a remeasure of the tab bar
              onClick: this.onClickTab.bind(this),
              isActive: child.props.id === activeTabId,
              mustGrow: isScrollEnabled,
              hasTwoLines,
              palette
            }
          )
        )
  }

  get firstTabId() {
    return (React.Children.toArray(this.props.children)[0] as React.ReactElement<TabProps>).props.id
  }

  get lastTabId() {
    const count = React.Children.count(this.props.children)

    return count > 0
      ? (React.Children.toArray(this.props.children)[count - 1] as React.ReactElement<TabProps>).props.id
      : ''
  }

  /**
   * Find the last tab on the right which is completely visible.
   */
  get lastEntirelyDisplayedTab(): Tab | undefined {
    return Array
      .from(this.tabsRefs.values())
      .reverse()
      .find(t => !this.isTabOutsideOnRight(t))
  }

    /**
   * Find the last tab on the left which is completely visible.
   */
  get firstEntirelyDisplayedTab(): Tab | undefined {
    return Array
    .from(this.tabsRefs.values())
    .reverse()
    .find(this.isTabOutsideOnLeft)
}

  get firstTab(): Tab | undefined {
    return this.tabsRefs.get(this.firstTabId)
  }

  get lastTab(): Tab | undefined {
    return this.tabsRefs.get(this.lastTabId)
  }
  
  get activeTab(): Tab | undefined  {
    return this.tabsRefs.get(this.state.activeTabId)
  }

  get paddingHorizontal(): number {
    return this.getStyles(this.state.isScrollEnabled).paddingHorizontal
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
    const { scaleX, translateX } = this.cursorAnimatedValues
    this.animatedStyle = Styles.createAnimatedViewStyle({
      transform: [{ translateX }, { scaleX }]
    })
    this.setState({ activeTabId: this.props.activeTabId || this.firstTabId })
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
        {this.children}
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

  componentDidUpdate() {
    this.updateCursorPosition()
  }

  private updateCursorPosition() {
    if (!this.isLayoutReady) return 
    if (!!this.cursorAnimation) {
      this.cursorAnimation.translateX.stop()
      this.cursorAnimation.scaleX.stop()
    }
    const translateX = this.activeTab!.layout.x + this.activeTab!.layout.width * .5
    const scaleX = this.activeTab!.layout.width
    this.cursorAnimation = this.getAnimation(translateX, scaleX, Tabs.cursorTransitionTiming)
    this.cursorAnimation.translateX.start()
    this.cursorAnimation.scaleX.start()
  }

  private renderCursor(style: TabsBarStyle) {
   return this.isLayoutReady
      ? (
        <View
          style={[style.cursor]}
          animated={this.animatedStyle}
        />
      )
      : <></>
  }
  
  private renderInScrollView(
    children: JSX.Element | JSX.Element[],
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
          {children}
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

  private isTabOutsideOnRight = (tab: Tab) => {
    const offsetBorderRight = this.getTabRightOffset(tab)
    return offsetBorderRight > 0
  }

  private isTabOutsideOnLeft = (tab: Tab) => {
    const offsetBorderLeft = this.getTabLeftOffset(tab)
    return offsetBorderLeft < 0
  }

  private getTabsWidth() {
    if (this.tabsRefs.size === 0) return 0
    const firstTabRect = (this.firstTab as any as Tab).layout
    const lastTabRect = (this.lastTab as any as Tab).layout
    return !!firstTabRect && !!lastTabRect // Tabs are not mounted yet
      ? Math.round(lastTabRect.x + lastTabRect.width - firstTabRect.x) // Some weird float value may happen. Round for consistency.
      : 0
  }

  private onTabLayout() {
    this.nap()
  }

  private onLayout(barLayout: LayoutInfo) {
    // Prevent infine onLayout loop
    if(
      this.barLayout !== undefined &&
      barLayout.height === this.barLayout.height &&
      barLayout.width === this.barLayout.width &&
      barLayout.x === this.barLayout.x &&
      barLayout.y === this.barLayout.y
    ) return

    this.barLayout = barLayout
    this.nap()
  }

  private get isLayoutReady() {
    return (
      this.barLayout !== undefined &&
      Array.from(this.tabsRefs.values()).every(tab => !!tab.layout)
    )
  }
  /*
   * this Next Action Predicate is a little state machine to handle the mounting and measurment
   * phases:
   * 1 - the tabs are mounted
   * 2 - state
   * 3 - remove the scroll bar on web and center on the initial tab.
   */
  private nap() {
    if (!this.isLayoutReady && !this.state.scrollStateIsReady) {
      // wait
    } else if (this.isLayoutReady && !this.state.scrollStateIsReady) {
      this.setScrollState()
    } else if (this.isLayoutReady && this.state.scrollStateIsReady) {
      this.rollLeft(this.props.activeTabId || this.firstTabId)
      this.updateCursorPosition()
    }
  }

  private setScrollState() {
    if (this.barLayout === undefined) return 

    const tabsWidth = this.getTabsWidth()
    const isScrollEnabled = tabsWidth > this.barLayout.width
    const hasRightScrollIndicator = isScrollEnabled
    const maxScroll = isScrollEnabled
      ? tabsWidth - this.barLayout.width + this.getStyles(isScrollEnabled).paddingHorizontal * 2
      : 0

    this.setState({ isScrollEnabled, maxScroll, hasRightScrollIndicator, scrollStateIsReady: true }, this.nap)
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
    const tabs = Array.from(this.tabsRefs.values())
    const lastEntirelyDisplayedTab = this.lastEntirelyDisplayedTab

    if (lastEntirelyDisplayedTab === undefined) return
    
    /* 2 */
    const tabId = id || lastEntirelyDisplayedTab.props.id
    const nextTabIndex = tabs.findIndex(tab => tab.props.id === tabId) + 1
    const nextTab = tabs[nextTabIndex]
    if (!nextTab) return // that was the last tab

     /* 3 */
     this.scrollToTab(nextTab.props.id)
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
    const tabs = Array.from(this.tabsRefs.values())
    const firstEntirelyDisplayedTab = this.firstEntirelyDisplayedTab

    if (firstEntirelyDisplayedTab === undefined) return

    /* 2 */
    const tabId = id || firstEntirelyDisplayedTab.props.id
    const previousTabIndex = tabs.findIndex(tab => tab.props.id === tabId)
    const previousTab = tabs[previousTabIndex]
    if (!previousTab) return // that was the last tab

     /* 3 */
    this.scrollToTab(previousTab.props.id)
  }, 200, true)

  private scrollToTab(id: string) {
    const offset = this.getTabOffset(id)  
    this.scrollTo(this.currentScroll + offset)
  }

  /**
   * Return the offset of the left border of a tab and the left or right border of the tabs bar.
   * If the number is negative, the tab is overflowing from the left side.
   * Otherwize the tab is overflowing from the right side.
   */
  private getTabOffset(id: string) {
    const tab = this.tabsRefs.get(id)
    if (tab === undefined) return 0
    else {
      const offsetBorderLeft = this.getTabLeftOffset(tab)
      const offsetBorderRight = this.getTabRightOffset(tab)
      if (offsetBorderLeft < 0) {
        return offsetBorderLeft
      } else if(offsetBorderRight > 0) {
        return offsetBorderRight
      } else return 0 
    }
  }

  private getTabLeftOffset(tab: Tab) {
    return tab.layout.x - this.currentScroll - this.barLayout!.x
  }

  private getTabRightOffset(tab: Tab) {
    return (tab.layout.x + tab.layout.width + this.paddingHorizontal - this.currentScroll) - (this.barLayout!.x + this.barLayout!.width - this.paddingHorizontal)
  }

  private scrollTo(position: number, animated = true) {
    const value = this.limit(position)
    this.scrollViewRef!.setScrollLeft(value, animated)
    this.currentScroll = value
  }

  private onScroll(_newScrollTop: number, newScrollLeft: number) {
    const maxScroll = this.state.maxScroll
    this.currentScroll = newScrollLeft
    this.setState({ 
      hasLeftScrollIndicator: newScrollLeft > 0,
      hasRightScrollIndicator: newScrollLeft < maxScroll,
    })
  }

  private renderLeftIndicator(styles: TabsBarStyle) {
    const { isScrollEnabled } = this.state
    const { renderLeftIndicator } = this.props

    return isScrollEnabled && renderLeftIndicator
      ? (
        <GestureView 
          style={styles.leftIndicator}
          onTap={() => this.rollLeft()}
        >
          {renderLeftIndicator()}
        </GestureView>
      )
      : <></>
  }

  private renderRightIndicator(styles: TabsBarStyle) {
    const { isScrollEnabled } = this.state
    const { renderRightIndicator } = this.props

    return isScrollEnabled && renderRightIndicator
      ? (
        <GestureView 
          style={styles.rightIndicator}
          onTap={() => this.rollRight()}
        >
          {renderRightIndicator()}
        </GestureView>
      )
      : <></>
  }

  private limit(value: number = 0) {
    return Math.min(this.state.maxScroll, Math.max(0, (value)))
  }

  private onClickTab(activeTabId: string) {
    // Offset the tab if it overflows
    this.scrollToTab(activeTabId)
    this.setState({ activeTabId })
  }

  private getAnimation(translateX: number, scaleX: number, duration: number) {
    return {
      translateX: Animated
        .timing(
          this.cursorAnimatedValues.translateX,
          {
            toValue: translateX,
            duration,
            easing: Animated.Easing.InOut()
          }
        ),
      scaleX: Animated
      .timing(
        this.cursorAnimatedValues.scaleX,
        {
          toValue: scaleX,
          duration,
          easing: Animated.Easing.InOut()
        }
      ),
    }
  }
}

export default withTheme()(Tabs)