import React from 'react'
import Tab, { TabProps } from './Tab'
import { UserInterface, ScrollView, Styles, Platform } from 'reactxp'
import ReactDOM from 'react-dom'

import { ThemeContext } from '../../styles/theme'
import { View } from '../view'
import { tabsBarStyle, TabsBarStyle } from './styles'

type Props = {
  hasTwoLines?: boolean,
  palette: 'primary' | 'secondary' | ''
  style?: Partial<TabsBarStyle>
  children: JSX.Element | JSX.Element[]
}

type State = {
  activeTabId?: string
  isScrollEnabled: boolean
  marginBottom: number
  barWidth: number
  tabsWidth: number
}

export default class Tabs extends React.PureComponent<Props, State> {
  state: State = {
    isScrollEnabled: false,
    marginBottom: 0,
    barWidth: 0,
    tabsWidth: 0
  }
  rootRef: View
  scrollViewRef: ScrollView
  cursorRef: View
  tabsRefs: Tab[] = []
  wrapperRef: View
  valueToIndex = new Map<any, number>()
  
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
              ref: (tab: Tab) => this.tabsRefs.push(tab),
              mustGrow: isScrollEnabled,
              hasTwoLines,
              palette
            }
          )
        )
  }

  async getTabsWidth() {
    if (this.tabsRefs.length === 0) return 0
    const firstTabRect = await UserInterface.measureLayoutRelativeToAncestor(this.tabsRefs[0], this.rootRef)
    const lastTabRect = await UserInterface.measureLayoutRelativeToAncestor(this.tabsRefs[this.tabsRefs.length - 1], this.rootRef)
    return Math.round(lastTabRect.x + lastTabRect.width - firstTabRect.x) // Some weird float value may happen. Round for consistency.
  }

  async measureTabs() {
    try{
      const rootRect = await UserInterface.measureLayoutRelativeToAncestor(this.rootRef, this.rootRef)
      const tabsWidth = await this.getTabsWidth()
      const isScrollEnabled = tabsWidth > rootRect.width

      // Update only when layout is different
      if (this.state.barWidth !== rootRect.width || this.state.tabsWidth !== tabsWidth) {
        this.setState({ 
          isScrollEnabled,
          tabsWidth,
          barWidth: rootRect.width
        }, () => {
          requestAnimationFrame(() => {
            const marginBottom = Platform.getType() === 'web' && isScrollEnabled
              ? (ReactDOM.findDOMNode(this.scrollViewRef) as HTMLDivElement).clientHeight - (ReactDOM.findDOMNode(this.scrollViewRef) as HTMLDivElement).offsetHeight
              : 0
            this.setState({ 
              marginBottom
            })
          })
        })
      }
    } catch(e) {
      console.error(e)
    }
  }

  render() {
    const {
      palette,
      hasTwoLines = false,
      style,
   } = this.props
    return (
      <ThemeContext.Consumer>
        {theme => {
          const { isScrollEnabled } = this.state
          const stylesheet = tabsBarStyle({
            theme,
            palette,
            style,
            options: {
              hasTwoLines,
              isScrollEnabled
            }
          })

          const tabs = <View
            style={stylesheet.wrapper}
            ref={view => this.wrapperRef = view}>
            {this.children}
          </View>

          return (
            <View
              style={stylesheet.root}
              ref={(comp: View) => this.rootRef = comp}
              onLayout={this.measureTabs.bind(this)}
            >
              {
                isScrollEnabled
                  ? this.renderInScrollView(tabs)
                  : tabs
              }
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
  
  private renderInScrollView(children: JSX.Element | JSX.Element[]) {
    const { isScrollEnabled } = this.state

    return (
      <ScrollView
        ref={(comp: ScrollView) => this.scrollViewRef = comp}
        scrollEnabled={ isScrollEnabled }
        horizontal={true}
        vertical={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={Styles.createScrollViewStyle({marginBottom: this.state.marginBottom})}
      >
        {children}
      </ScrollView>
    )
  }
}
