import * as React from 'react'
import { ThemeContext } from 'sproutch'

export const withTheme = () => Component => (props: any) => {
  const { innerRef, ...rest } = props

  return (
    <ThemeContext.Consumer>
      {theme => <Component theme={theme} ref={innerRef} {...rest} />}
    </ThemeContext.Consumer>
  )
}