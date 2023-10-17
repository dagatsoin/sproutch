import * as React from 'react'

import { colorManipulator, Theme, StyleSheet } from '../../styles'
import { ParticleProps } from './ParticleProps'
import { rippleStyle } from './style'
import { Animated, Easing, RegisteredStyle, ViewStyle } from 'react-native'

const fadeOutDuration = 150
const scaleDuration = 225
const easing = Easing.bezier(0.4, 0, 0.2, 1)

export type MDRippleParticleOptions = {
  theme: Theme<unknown>
  color: string
}

class Particle extends React.PureComponent<
  ParticleProps<MDRippleParticleOptions>,
  Record<string, unknown>
> {
  private animatedScale = new Animated.Value(1)
  private animatedOpacity: any
  private animatedStyle!: { root: RegisteredStyle<ViewStyle> }
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

    this.animatedOpacity = new Animated.Value(overlayOpacity)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.animatedStyle = StyleSheet.create({
      root: {
        transform: [{ scale: this.animatedScale }],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        opacity: this.animatedOpacity,
      }
    }) as any
  }

  public componentDidMount() {
    this.runningAnimation = true
    Animated.timing(this.animatedScale, {
      toValue: this.radiusTo / this.radiusFrom,
      duration: scaleDuration,
      useNativeDriver: true,
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
          {
            left: x - 5,
            top: y - 5
          },
          this.animatedStyle.root,
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Animated.timing(this.animatedOpacity, {
      toValue: 0,
      duration: fadeOutDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(this.props.onDeath)
  }
}

export default Particle
