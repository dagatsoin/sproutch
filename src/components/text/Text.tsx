import * as React from 'react'
import { Text, Types } from 'reactxp'

import { Theme, ThemeContext } from '../../styles/theme'

export type TextProps = Types.TextProps

export const TextComp = ({ children, style, ...props }: TextProps) => (
  <ThemeContext.Consumer>
    {(theme: Theme<any, any>) => (
      <Text
        style={{
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.fontSize,
          fontWeight: theme.typography.fontWeightLight,
          ...(style as object),
        }}
        {...props as any}
      >
        {children}
      </Text>
    )}
  </ThemeContext.Consumer>
)

export default TextComp
