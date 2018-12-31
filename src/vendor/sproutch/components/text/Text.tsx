import * as React from 'react'
import { InjectedTheme } from 'react-jss'
import { Text } from 'reactxp'
import { Theme, ThemeContext, Types } from 'sproutch'

type Props = Types.TextProps

export const TextComp = ({ children, style, ...props }: Props) => (
  <ThemeContext.Consumer>
    {(theme: Theme<any, any>) => (<Text
      style={{
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightLight,
        ...style as object,
      }}
      {...props as any}
    >
      {children}
    </Text>
    )}
  </ThemeContext.Consumer>
)

export default TextComp
