import * as React from 'react'
import { ThemeContext, View } from 'sproutch'

import style from './style'

class Ripple extends React.PureComponent {
  private containerRef: View
  private firstRippleRef: View

  public render() {
    return (
      <ThemeContext.Consumer>
        { theme => {
          const styleSheet = style({
            theme
          })
          return (
            <View
              ref={comp => this.containerRef = comp}
              style={styleSheet.container}
            >
              <View
                ref={comp => this.firstRippleRef = comp}
                style={styleSheet.firstRipple}
              />
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}