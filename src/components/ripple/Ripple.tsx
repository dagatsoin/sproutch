import * as React from 'react'

import style from './style'
import { View } from '../view';
import { ThemeContext } from '../../styles/theme'

type Props = {
  timeout: {
    exit: number
    enter: number
  }
  pulsate: boolean
  rippleX: number
  rippleY: number
  rippleSize: number
}

type State = {

}

class Ripple extends React.PureComponent<Props, State> {
  //private containerRef: View
  //private firstRippleRef: View

  public render() {
    return (
      <ThemeContext.Consumer>
        { theme => {
          const styleSheet = style({
            theme
          })
          return (
            <View
              //ref={comp => this.containerRef = comp}
              style={styleSheet.root}
            >
              <View
                //ref={comp => this.firstRippleRef = comp}
                style={styleSheet.root}
              />
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Ripple