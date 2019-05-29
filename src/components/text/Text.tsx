import * as React from 'react'
import { Text, Types } from 'reactxp'

import { Styles, Theme } from '../../styles'
import { ThemeContext } from '../../styles/ThemeContext'

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
            color: theme.palette.text.primary,
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
