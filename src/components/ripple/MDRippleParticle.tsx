import * as React from 'react'
import { Animated, Styles, Types } from 'reactxp'

import { colorManipulator, Theme } from '../../styles'
import { ParticleProps } from './ParticleProps'
import { rippleStyle } from './style'

const fadeOutDuration = 150
const scaleDuration = 225
const easing = Animated.Easing.CubicBezier(0.4, 0, 0.2, 1)

type MDRippleParticleOptions = {
  theme: Theme<any, any>
  color: string
}

class Particle extends React.PureComponent<
  ParticleProps<MDRippleParticleOptions>,
  {}
> {
  private animatedScale = Animated.createValue(1)
  private animatedOpacity: Animated.Value
  private animatedStyle: Types.AnimatedViewStyleRuleSet
  private runningAnimation = false

  public componentWillMount() {
    const { options } = this.props
    const color = options.color || '#000'
    const overlayLuminance = colorManipulator.getLuminance(color)
    const pressedOverlayOpacity = options.theme.palette.state.pressed
    const overlayOpacity =
      overlayLuminance < 0.3
        ? pressedOverlayOpacity.dark
        : overlayLuminance < 0.7
        ? pressedOverlayOpacity.medium
        : pressedOverlayOpacity.light

    this.animatedOpacity = Animated.createValue(overlayOpacity)
    this.animatedStyle = Styles.createAnimatedViewStyle({
      transform: [{ scale: this.animatedScale }],
      opacity: this.animatedOpacity,
    })
  }

  public componentDidMount() {
    this.runningAnimation = true
    Animated.timing(this.animatedScale, {
      toValue: this.radiusTo / this.radiusFrom,
      duration: scaleDuration,
      easing,
    }).start(this.onAnimateRadiusEnd.bind(this))
  }

  public componentWillReceiveProps(
    newProps: ParticleProps<MDRippleParticleOptions>
  ) {
    const { isDying: fading } = this.props
    if (newProps.isDying !== fading && !this.runningAnimation) {
      this.fadeOut()
    }
  }

  public render() {
    const { width, height } = this.props.emitterLayout
    const radiusFrom = Math.min(width, height) / 2
    const { options, x, y } = this.props
    const { color } = options
    const styleSheet = rippleStyle({
      x,
      y,
      radius: radiusFrom,
      color,
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
  }

  private get radiusFrom() {
    const { width, height } = this.props.emitterLayout
    return Math.min(width, height) / 2
  }

  private get radiusTo() {
    const { width, height } = this.props.emitterLayout
    return Math.sqrt(width ** 2 + height ** 2)
  }

  private onAnimateRadiusEnd() {
    this.runningAnimation = false
    if (this.props.isDying) {
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
    }).start(this.props.onDeath)
  }
}

export default Particle
