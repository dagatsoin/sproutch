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
  isScrollEnabled: boolean,
  marginBottom: number
}

export default class Tabs extends React.PureComponent<Props, State> {
  state: State = {
    isScrollEnabled: false,
    marginBottom: 0
  }
  rootRef: ScrollView
  cursorRef: View
  tabsRefs: Tab[] = []
  wrapperRef: View
  valueToIndex = new Map<any, number>()
  
  get children() {
    const { hasTwoLines, palette } = this.props
    return React.Children
      .map(
        this.props.children,
        (child: React.ReactElement<TabProps>) =>
          React.cloneElement(
            child,
            {
              ref: (tab: Tab) => this.tabsRefs.push(tab),
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
    return lastTabRect.x + lastTabRect.width - firstTabRect.x
  }

  async componentDidMount() {
    try{
      const rootRect = await UserInterface.measureLayoutRelativeToWindow(this.rootRef)
      const tabsWidth = await this.getTabsWidth()
      const isScrollEnabled = tabsWidth > rootRect.width
      const marginBottom = Platform.getType() === 'web' && isScrollEnabled
        ? (ReactDOM.findDOMNode(this.rootRef) as HTMLDivElement).clientHeight - (ReactDOM.findDOMNode(this.rootRef) as HTMLDivElement).offsetHeight
        : 0

        this.setState({ 
        isScrollEnabled,
        marginBottom
      })
    } catch(e) {
      console.error(e)
    }
  }

/*
  get activeTabPos(): {x: number, y: number} {
    return this.children.
  }

  private onClickTab(activeTabId: string) {
    this.setState({ activeTabId })
    this.updateCursor()
  }

  private async updateCursor() {
    this.activeTabRect = 
    this.cursor = await UserInterface.measureLayoutRelativeToWindow(this.rootRef)
    this.cursor.setNativeProps({
      transform: `translateX(${this.activeTabPos.x})`
    })
  }*/
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
          return (
            <View style={stylesheet.root}>
              <ScrollView
                ref={(comp: ScrollView) => this.rootRef = comp}
                scrollEnabled={ isScrollEnabled }
                horizontal={true}
                vertical={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={Styles.createScrollViewStyle({marginBottom: this.state.marginBottom})}
              >
                <View
                  style={stylesheet.wrapper}
                  ref={view => this.wrapperRef = view}>
                  {this.children}
                </View>
              </ScrollView>
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
