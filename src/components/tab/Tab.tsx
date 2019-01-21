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
  onUnmount?: () => void
} & Types.ViewProps

class Tab extends React.Component<TabProps> {
  private _layout: LayoutInfo

  get layout(): LayoutInfo {
    return this._layout
  }

  componentWillUnmount() {
    const { onUnmount = () => {} } = this.props
    onUnmount()
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
          const { id, onClick, ref } = this.props
          return (
            <View
              onLayout={this.onLayout.bind(this)}
              style={styles.root}
              ref={view => ref && ((ref as Function)(view))}
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
    const { onLayout = () => null } = this.props
    if (
      this._layout !== undefined &&
      this._layout.height === layout.height &&
      this._layout.width === layout.width &&
      this._layout.x === layout.x &&
      this._layout.y === layout.y
    ) return

    this._layout = layout
    onLayout(layout)
  }
}
export default Tab
