import * as React from 'react'
import { GestureView, Types } from 'reactxp'
import { StyleRuleSet, StyleRuleSetRecursive } from 'reactxp/dist/common/Types'

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
  hasTwoLines?: boolean,
  isDisable?: boolean
  palette?: 'primary' | 'secondary' | ''
  notification?: boolean
  style?: Partial<TabStyle>
  onClick?: (index: string) => void
} & Types.ViewProps

class Tab extends React.Component<TabProps> {
  render() {
    const {
      renderIcon,
      label,
      isActive = false,
      isDisable = false,
      hasTwoLines = false,
      palette,
      style,
      onClick,
      id: tabIndex,
    } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => {
          const stylesheet = tabStyle({
            theme,
            palette,
            style,
            options: {
              hasTwoLines,
              isDisable,
              isActive,
              hasIcon: !!renderIcon,
              hasLabel: !!label,
            }
          })
          const { ref } = this.props
          return (
            <GestureView
              ref={view => ref && ((ref as Function)(view))}
              onTap={() => (onClick ? onClick(tabIndex) : null)}
              style={stylesheet.root}
            >
              {renderIcon && renderIcon(stylesheet.icon)}
              {label && <Text style={stylesheet.label}>{label}</Text>}
              {isActive && <View style={stylesheet.cursor} />}
            </GestureView>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Tab
