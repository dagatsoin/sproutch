import * as React from 'react'
import { Animated, Styles, Types } from 'reactxp'

import { darkShadow, ThemeContext } from '../../styles/theme'
import { View } from '../view'
import { rippleStyle } from './style'

// const fadeInDuration = 75
const fadeOutDuration = 150
const scaleDuration = 225
const easing = Animated.Easing.CubicBezier(0.4, 0, 0.2, 1)

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

  public componentWillMount() {
    this.animatedStyle = Styles.createAnimatedViewStyle({
      transform: [{ scale: this.animatedScale }],
      opacity: this.animatedOpacity,
    })
  }

  public componentDidMount() {
    const { radiusFrom, radiusTo } = this.props
    this.runningAnimation = true
    Animated.timing(this.animatedScale, {
      toValue: radiusTo / radiusFrom,
      duration: scaleDuration,
      easing,
    }).start(this.onAnimateRadiusEnd.bind(this))
  }

  public componentWillReceiveProps(newProps: RippleProps) {
    const { isFading: fading } = this.props
    if (newProps.isFading !== fading && !this.runningAnimation) {
      this.fadeOut()
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          const { isOnPaper, palette, radiusFrom, x, y } = this.props
          const styleSheet = rippleStyle({
            x,
            y,
            isOnPaper,
            radius: radiusFrom,
            palette,
            theme,
          })
          return (
            <Animated.View
              style={[
                styleSheet.ripple,
                Styles.createViewStyle(
                  {
                    left: x - 5,
                    top: y - 5,
                  },
                  false
                ),
                this.animatedStyle,
              ]}
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
    Animated.timing(this.animatedOpacity, {
      toValue: 0,
      duration: fadeOutDuration,
      easing: Animated.Easing.Linear(),
    }).start(this.props.onRippleEnd)
  }
}

export default Ripple
