import * as React from 'react'
import { GestureView } from 'reactxp'
import { StyleRuleSet, StyleRuleSetRecursive } from 'reactxp/dist/common/Types'
import { Text, TextStyle, ThemeContext, View } from 'sproutch'

import tabStyle, { TabStyle } from './styles'

type Props = {
  tabIndex: string
  renderIcon?: (
    style: StyleRuleSetRecursive<StyleRuleSet<TextStyle>>
  ) => JSX.Element
  label?: string
  isActive?: boolean
  hasTwoLines?: boolean,
  isDisable?: boolean
  palette?: 'primary' | 'secondary'
  notification?: boolean
  style?: Partial<TabStyle>
  onClick?: (index: string) => void
}

const Tab: React.SFC<Props> = ({
  renderIcon,
  label,
  isActive = false,
  isDisable = false,
  hasTwoLines = false,
  palette,
  style,
  onClick,
  tabIndex,
  notification
}: Props) => {
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

        return (
          <GestureView
            onTap={() => (onClick ? onClick(tabIndex) : null)}
            style={stylesheet.container}
          >
            {renderIcon && renderIcon(stylesheet.icon)}
            {label && <Text style={stylesheet.label}>{label}</Text>}
            <View style={stylesheet.cursor} />
          </GestureView>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default Tab
