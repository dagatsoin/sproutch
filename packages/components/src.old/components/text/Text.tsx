import * as React from 'react'
import { Text, Types } from 'reactxp'
import { Styles, Theme, toArray } from '../../styles'
import { ThemeContext } from '../../styles/ThemeContext'

export type TextProps = Types.TextProps & {
  inherited?: boolean
}

export const TextComp = ({
  children,
  inherited,
  style,
  ...props
}: TextProps) => (
  <ThemeContext.Consumer>
    {(theme: Theme<any, any>) => (
      <Text
        style={[
          !inherited
            ? Styles.createTextStyle({
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize,
                fontWeight: theme.typography.fontWeightLight,
                color: theme.palette.text.primary,
              })
            : {},
          ...toArray(style),
        ]}
        {...(props as any)}
      >
        {children}
      </Text>
    )}
  </ThemeContext.Consumer>
)

export default TextComp
