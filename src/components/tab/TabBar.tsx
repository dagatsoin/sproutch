import React from 'react'
import Tab, { TabProps } from './Tab'
import { ScrollView, Platform, Types, GestureView } from 'reactxp'
import { LayoutInfo } from 'reactxp/dist/common/Types';
import ReactDOM from 'react-dom'

import { Theme } from '../../styles/theme'
import { withTheme, InjectedTheme } from '../../styles/withTheme'
import { View } from '../view'
import { tabsBarStyle, TabsBarStyle } from './styles'
import { debounce } from '../../helpers'

type Props = {
  hasTwoLines?: boolean,
  palette: 'primary' | 'secondary' | ''
  style?: Partial<TabsBarStyle>
  children: JSX.Element | JSX.Element[]
  renderLeftIndicator?: () => JSX.Element | JSX.Element[]
  renderRightIndicator?: () => JSX.Element | JSX.Element[]
} & InjectedTheme<Theme<any, any>>

type State = {
  activeTabId?: string
  isScrollEnabled: boolean
  areTabsReady: boolean
  hasLeftScrollIndicator: boolean
  hasRightScrollIndicator: boolean
  maxScroll: number
  currentScroll: number
}

class Tabs extends React.PureComponent<Props, State> {
  state: State = {
    isScrollEnabled: false,
    areTabsReady: false,
    hasLeftScrollIndicator: false,
    hasRightScrollIndicator: false,
    maxScroll: 0,
    currentScroll: 0
  }

  barLayout?: LayoutInfo
  rootRef?: View
  scrollViewRef?: ScrollView
  cursorRef?: View
  tabsRefs: Map<string, Tab> = new Map()
  wrapperRef?: View
  animation: Types.Animated.CompositeAnimation

  static scrollDuration: number
  
  get children() {
    const { hasTwoLines, palette } = this.props
    const { isScrollEnabled } = this.state
    return React.Children
      .map(
        this.props.children,
        (child: React.ReactElement<TabProps>) =>
          React.cloneElement(
            child,
            {
              ref: (tab: Tab) => this.tabsRefs.set(child.props.id, tab),
              onUnmount: () => this.tabsRefs.delete(child.props.id),
              onLayout: () => this.onTabLayout(), // each layout change of a tab will trigger a remeasure of the tab bar
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
    const tabs = Array
      .from(this.tabsRefs.values())
      .filter(t => !this.isTabOutsideOnRight(t))

    return tabs.length
      ? tabs.reduce((farest, tab) => {
        if (farest === undefined) {
          return tab
        }
        return tab.layout.x > farest.layout.x
          ? tab
          : farest
        })
      : undefined
  }

    /**
   * Find the last tab on the left which is completely visible.
   */
  get firstEntirelyDisplayedTab(): Tab | undefined {
    const tabs = Array
      .from(this.tabsRefs.values())
      .filter(this.isTabOutsideOnLeft)

    return tabs.length
      ? tabs.reduce((farest, tab) => {
        if (farest === undefined) {
          return tab
        }
        return tab.layout.x > farest.layout.x
          ? tab
          : farest
        })
      : undefined
  }

  get firstTab(): Tab | undefined {
    return this.tabsRefs.get(this.firstTabId)
  }

  get lastTab(): Tab | undefined {
    return this.tabsRefs.get(this.lastTabId)
  }

  getStyles(isScrollEnabled: boolean) {
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

  isTabOutsideOnRight = (tab: Tab) => {
    const { currentScroll } = this.state
    return !!tab.layout && !!this.barLayout &&
      tab.layout.x + tab.layout.width - currentScroll > this.barLayout.x + this.barLayout.width
  }

  isTabOutsideOnLeft = (tab: Tab) => {
    const { currentScroll } = this.state
    return !!tab.layout && !!this.barLayout &&
      tab.layout.x - currentScroll < this.barLayout.x
  }

  getTabsWidth() {
    if (this.tabsRefs.size === 0) return 0
    const firstTabRect = (this.firstTab as any as Tab).layout
    const lastTabRect = (this.lastTab as any as Tab).layout
    return !!firstTabRect && !!lastTabRect // Tabs are not mounted yet
      ? Math.round(lastTabRect.x + lastTabRect.width - firstTabRect.x) // Some weird float value may happen. Round for consistency.
      : 0
  }

  onTabLayout() {
    const areTabsReady = Array.from(this.tabsRefs.values()).every(tab => !!tab.layout)
    this.setState({ areTabsReady }, () => {
      if (areTabsReady) this.measureTabs()
    })
  }

  onLayout(barLayout: LayoutInfo) {
    // Prevent infine onLayout loop
    if(
      this.barLayout !== undefined &&
      barLayout.height === this.barLayout.height &&
      barLayout.width === this.barLayout.width &&
      barLayout.x === this.barLayout.x &&
      barLayout.y === this.barLayout.y
    ) return

    this.barLayout = barLayout
    if (this.state.areTabsReady) this.measureTabs()
  
  }

  measureTabs() {
    if (this.barLayout === undefined) return 

    const tabsWidth = this.getTabsWidth()
    const isScrollEnabled = tabsWidth > this.barLayout.width
    const hasRightScrollIndicator = isScrollEnabled
    const maxScroll = isScrollEnabled
      ? tabsWidth - this.barLayout.width + this.getStyles(isScrollEnabled).paddingHorizontal * 2
      : 0

    this.setState({ isScrollEnabled, maxScroll, hasRightScrollIndicator }, () => {
      // Edge case for web platform
      if (Platform.getType() === 'web' && isScrollEnabled && !!this.scrollViewRef && !!this.wrapperRef) {
        // Hide the scrollbar
        [ReactDOM.findDOMNode(this.scrollViewRef) as HTMLDivElement]
          .map(scrollView => {
            scrollView.style.marginBottom = `${scrollView.clientHeight - scrollView.offsetHeight}px`
          })
        // Fit the tabs width to their content
        ;[ReactDOM.findDOMNode(this.wrapperRef) as HTMLDivElement]
          .map(wrapper => {
            wrapper.style.display = 'inline-flex'
          })
      
      }
    })
  }

  render() {
    const {
      hasLeftScrollIndicator,
      hasRightScrollIndicator,
      isScrollEnabled
    } = this.state

    const styles = this.getStyles(isScrollEnabled)

    const tabs = (
      <View
        style={styles.wrapper}
        ref={view => this.wrapperRef = view}>
        {this.children}
      </View>
    )

    return (
      <View
        style={styles.root}
        ref={(comp: View) => this.rootRef = comp}
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
        >
          {children}
        </ScrollView>
      </>
    )
  }

  /**
   * This function set the new scroll value for the next tab to be completely visible when clicking on the
   * right indicator.
   * 1 - Find the last tab on the right which is completely visible.
   * 2 - Find the next tab, if any, to display.
   * 3 - Compute the tabs length between the left border of the first tab and the right border of the tab to display.
   * 4 - Compute the delta of scroll to add to the current value.
   */
  private onClickRightScrollIndicator = debounce(() => {
    /* 1 */
    const tabs = Array.from(this.tabsRefs.values())
    const lastEntirelyDisplayedTab = this.lastEntirelyDisplayedTab

    if (lastEntirelyDisplayedTab === undefined) return
    
    /* 2 */
    const lastTabDisplayedIndex = Array.from(this.tabsRefs.values()).findIndex(tab => tab.props.id === lastEntirelyDisplayedTab.props.id)
    const tabToDisplayIndex = lastTabDisplayedIndex < tabs.length - 1
      ? lastTabDisplayedIndex + 1
      : lastTabDisplayedIndex

    /* 3 */
    const tabsBarLengthToNextTabEnd = tabs
      .slice(0, tabToDisplayIndex + 1)
      .reduce((length, tab) => length + tab.layout.width, 0)

    /* 4 */
    const delta = (tabsBarLengthToNextTabEnd - this.state.currentScroll) - (this.barLayout!.width)
    this.scrollTo(this.state.currentScroll + delta + 1)
  }, 200, true)

  /**
   * This function set the new scroll value for the next tab to be completely visible when clicking on the
   * left indicator.
   * 1 - Find the first tab on the left which is completely visible.
   * 2 - Find the previous tab, if any, to display.
   * 3 - Compute the tabs length off all the tabs entirely hidden on the left.
   * 4 - Compute the delta of scroll to add to the current value.
   */
  private onClickLeftScrollIndicator = debounce(() => {
    /* 1 */
    const tabs = Array.from(this.tabsRefs.values())
    const firstEntirelyDisplayedTab = this.firstEntirelyDisplayedTab

    if (firstEntirelyDisplayedTab === undefined) return

    /* 2 */
    const tabToDisplayIndex = Array.from(this.tabsRefs.values()).findIndex(tab => tab.props.id === firstEntirelyDisplayedTab.props.id)

    /* 3 */
    const tabsBarLengthToNextTabEnd = tabs
      .slice(0, tabToDisplayIndex)
      .reduce((length, tab) => length + tab.layout.width, 0)
  
    /* 4 */
    const delta = tabs[tabToDisplayIndex].layout.width - (tabsBarLengthToNextTabEnd + tabs[tabToDisplayIndex].layout.width - this.state.currentScroll)
    console.log(this.state.currentScroll, delta)
    this.scrollTo(this.state.currentScroll - delta)
  }, 200, true)

  private scrollTo(position: number) {
    const value = this.limit(position)
    this.scrollViewRef!.setScrollLeft(value, true)
    this.setState({ currentScroll: value })
  }

  private onScroll(_newScrollTop: number, newScrollLeft: number) {
    if (!this.state.areTabsReady) return
    const maxScroll = this.state.maxScroll
    this.setState({ 
      hasLeftScrollIndicator: newScrollLeft > 0,
      hasRightScrollIndicator: newScrollLeft < maxScroll,
      currentScroll: newScrollLeft
    })
  }

  private renderLeftIndicator(styles: TabsBarStyle) {
    const { isScrollEnabled } = this.state
    const { renderLeftIndicator } = this.props

    if (!isScrollEnabled || !renderLeftIndicator) return <></>

    return (
      <GestureView 
        style={styles.leftIndicator}
        onTap={this.onClickLeftScrollIndicator.bind(this)}
      >
        {renderLeftIndicator()}
      </GestureView>
    )
  }

  private renderRightIndicator(styles: TabsBarStyle) {
    const { isScrollEnabled } = this.state
    const { renderRightIndicator } = this.props

    if (!isScrollEnabled || !renderRightIndicator) return <></>

    return (
      <GestureView 
        style={styles.rightIndicator}
        onTap={this.onClickRightScrollIndicator.bind(this)}
      >
        {renderRightIndicator()}
      </GestureView>
    )
  }

  private limit(value: number = 0) {
    return Math.min(this.state.maxScroll, Math.max(0, (value)))
  }
}

export default withTheme()(Tabs)