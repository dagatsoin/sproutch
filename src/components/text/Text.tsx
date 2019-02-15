import * as React from 'react'
import { Text, Types } from 'reactxp'

import { Styles, Theme, ThemeContext } from '../../styles'

export type TextProps = Types.TextProps

export const TextComp = ({ children, style, ...props }: TextProps) => (
  <ThemeContext.Consumer>
    {(theme: Theme<any, any>) => (
      <Text
        style={[
          Styles.createTextStyle({
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            fontWeight: theme.typography.fontWeightLight,
          }),
          style,
        ]}
        {...props as any}
      >
        {children}
      </Text>
    )}
  </ThemeContext.Consumer>
)

export default TextComp
