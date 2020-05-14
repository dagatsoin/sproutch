import * as React from 'react'

import { ThemeContext } from '../../styles/ThemeContext'
import { View } from '../view'
import { PaperProps } from './PaperProps'
import { createWebPaperStyle } from './style'

export default class Paper extends React.Component<PaperProps, {}> {
  public render() {
    const { style = {}, ...props } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => {
          const rootStyle = createWebPaperStyle(theme)
          return (
            <View
              elevation={this.props.elevation}
              ref={(comp: View | null) => {
                this.props.ref && this.props.ref(comp)
              }}
              style={[rootStyle, style.root, style.content]}
              {...props}
            />
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
