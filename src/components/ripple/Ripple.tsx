import * as React from 'react'

import { rippleStyle } from './style'
import { View } from '../view';
import { ThemeContext, darkShadow } from '../../styles/theme'
import { Styles, Types, Animated } from 'reactxp';

//const fadeInDuration = 75
const fadeOutDuration = 150
const scaleDuration = 225
const easing = Animated.Easing.CubicBezier(.4, 0, .2, 1)

export type RippleProps = {
  id: number
  isFading: boolean
  x: number
  y: number
  radiusTo: number
  radiusFrom: number
  isOnPaper?: boolean
  palette?: 'primary' | 'secondary'
  onRippleEnd: () => void
}

class Ripple extends React.PureComponent<RippleProps, {}> {
  private animatedScale = Animated.createValue(1) 
  private animatedOpacity = Animated.createValue(darkShadow.press)
  private animatedStyle: Types.AnimatedViewStyleRuleSet
  private runningAnimation = false
  
  componentWillMount() {
    this.animatedStyle = Styles.createAnimatedViewStyle({
        transform: [{ scale: this.animatedScale }],
        opacity: this.animatedOpacity
    })
  }

  componentDidMount() {
    const { radiusFrom, radiusTo } = this.props
    this.runningAnimation = true
    Animated
      .timing(
        this.animatedScale,
        {
          toValue: radiusTo/radiusFrom,
          duration: scaleDuration,
          easing
        }
      ).start(this.onAnimateRadiusEnd.bind(this))
  }

  componentWillReceiveProps(newProps: RippleProps) {
    const { isFading: fading } = this.props
    if (newProps.isFading !== fading && !this.runningAnimation) {
      this.fadeOut()
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        { theme => {
          const { isOnPaper, palette, radiusFrom, x, y } =  this.props
          const styleSheet = rippleStyle({
            x,
            y,
            isOnPaper,
            radius: radiusFrom,
            palette,
            theme
          })
          return (
            <View
              style={[styleSheet.ripple, Styles.createViewStyle({
                left: x - 5,
                top: y - 5,
              })]}
              animated={this.animatedStyle}
            />
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  private onAnimateRadiusEnd() {
    this.runningAnimation = false
    if (this.props.isFading) {
      this.fadeOut()
    }
  }

  private fadeOut() {
    if (this.runningAnimation) return // already fading

    this.runningAnimation = true
    Animated
      .timing(
        this.animatedOpacity,
        {
          toValue: 0,
          duration: fadeOutDuration,
          easing: Animated.Easing.Linear()
        }
      ).start(this.props.onRippleEnd)
  }
}

export default Ripple