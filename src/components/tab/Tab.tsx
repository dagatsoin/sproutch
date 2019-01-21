import * as React from 'react'
import { Types } from 'reactxp'
import { StyleRuleSet, StyleRuleSetRecursive, LayoutInfo } from 'reactxp/dist/common/Types'

import  { tabStyle, TabStyle } from './styles'
import { TextStyle } from '../../styles/createStyleSheet';
import { ThemeContext } from '../../styles/theme';
import { Text } from '../text';
import { View } from '../view';

export type TabProps = {
  id: string
  renderIcon?: (
    style: StyleRuleSetRecursive<StyleRuleSet<TextStyle>>
  ) => JSX.Element
  label?: string
  isActive?: boolean
  hasTwoLines?: boolean
  isDisable?: boolean
  mustGrow?: boolean
  palette?: 'primary' | 'secondary' | ''
  notification?: boolean
  style?: Partial<TabStyle>
  onClick?: (index: string) => void
  onUnmount?: (id: string) => void
  onTabLayout?: (tab: { id: string, layout: LayoutInfo }) => void
  onWillMount?: (id: string) => void
}

class Tab extends React.Component<TabProps  & Types.ViewProps> {
  private layout: LayoutInfo

  componentWillMount() {
    const { onWillMount = () => {} } = this.props
    onWillMount(this.props.id)
  }

  componentDidMount() {
    this.onLayout(this.layout)
  }

  componentWillUnmount() {
    console.log("unmount")

    const { onUnmount = () => {} } = this.props
    onUnmount(this.props.id)
  }

  render() {
    const {
      renderIcon,
      label,
      isActive = false,
      isDisable = false,
      hasTwoLines = false,
      mustGrow = false,
      palette,
      style,
    } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => {
          const styles = tabStyle({
            theme,
            palette,
            style,
            options: {
              hasTwoLines,
              isDisable,
              isActive,
              mustGrow,
              hasIcon: !!renderIcon,
              hasLabel: !!label,
            }
          })
          const { id, onClick } = this.props

          return (
            <View
              onLayout={this.onLayout.bind(this)}
              style={styles.root}
              onPress={() => !!onClick && onClick(id)}
            >
              {renderIcon && renderIcon(styles.icon)}
              {label && <Text style={styles.label}>{label}</Text>}
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  private onLayout(layout: LayoutInfo) {
    const { id, onTabLayout } = this.props
    if (
      this.layout !== undefined &&
      this.layout.height === layout.height &&
      this.layout.width === layout.width &&
      this.layout.x === layout.x &&
      this.layout.y === layout.y
    ) return
    this.layout = layout
    onTabLayout && onTabLayout({
      id,
      layout
    })
  }
}
export default Tab
