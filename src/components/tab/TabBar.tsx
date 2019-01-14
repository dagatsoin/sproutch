import React from 'react'
import Tab, { TabProps } from './Tab'
import { UserInterface, ScrollView, Styles, Platform } from 'reactxp'
import { LayoutInfo } from 'reactxp/dist/common/Types';

import { View } from '../view'
import { tabsBarStyle, TabsBarStyle } from './styles'
import { ThemeContext } from '../../styles/theme';

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

  async componentDidMount() {
    const rootRect = await UserInterface.measureLayoutRelativeToWindow(this.rootRef)
    Promise.all(this.tabsRefs.map(UserInterface.measureLayoutRelativeToWindow) as any[])
      .then(r => {
        const tabsWidth = r.reduce((sum: number, rect: LayoutInfo) => sum + rect.width, 0)
        
        const marginBottom = Platform.getType() === 'web' && this.state.isScrollEnabled
          ? rootRect.height
          : - (rootRect.height - (this.props.hasTwoLines
            ? 72
            : 48
          ))

        this.setState({ 
          isScrollEnabled: tabsWidth > rootRect.width,
          marginBottom
         }) 
      })
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
          const { isScrollEnabled: scrollEnabled } = this.state
          const stylesheet = tabsBarStyle({
            theme,
            palette,
            style,
            options: {
              hasTwoLines,
            }
          })
          return (
            <View>
              <ScrollView
                ref={(comp: ScrollView) => this.rootRef = comp}
                scrollEnabled={ scrollEnabled }
                horizontal={true}
                vertical={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={Styles.createScrollViewStyle({marginBottom: this.state.marginBottom})}
              >
                <View style={stylesheet.root}>
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
