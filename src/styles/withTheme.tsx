import * as React from 'react'
import { ThemeContext } from './theme'

export const withTheme = () => (Component: React.ComponentClass<any, any>) => (props: any) => {
  const { innerRef, ...rest } = props

  return (
    <ThemeContext.Consumer>
      {theme => <Component theme={theme} ref={innerRef} {...rest} />}
    </ThemeContext.Consumer>
  )
}