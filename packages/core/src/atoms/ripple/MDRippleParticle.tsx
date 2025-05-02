import { Animated, Easing, Platform, StyleSheet } from "react-native";
import { ParticleProps } from "./ParticleProps";
import { useEffect, useRef } from "react";
import { rippleStyle } from "./style";
import { colorManipulator, Theme } from "../../styles";

export type MDRippleParticleOptions = {
  theme: Theme<unknown>
  color: string
}

const fadeOutDuration = 150
const scaleDuration = 225
const easing = Easing.bezier(0.4, 0, 0.2, 1)

export default function Particle(props: ParticleProps<MDRippleParticleOptions>) {
  const animatedScaleRef = useRef(new Animated.Value(1))
  const runningAnimationRef = useRef(false)

  const { options, emitterLayout, x, y } = props
  
  const isDyingRef = useRef(props.isDying)
  isDyingRef.current = props.isDying

  const color = options.color || '#000'
  const overlayLuminance = colorManipulator.getLuminance(color)
  const pressedOverlayOpacity = options.theme.palette.state.pressed
  const overlayOpacity =
    overlayLuminance < 0.3
      ? pressedOverlayOpacity.dark
      : overlayLuminance < 0.7
        ? pressedOverlayOpacity.medium
        : pressedOverlayOpacity.light

  const animatedOpacityRef = useRef(new Animated.Value(overlayOpacity))

  const animatedStyleRef = useRef(StyleSheet.create({
    root: {
      transform: [{ scale: animatedScaleRef.current }],
      opacity: animatedOpacityRef.current,
    }
  }))

  const { width, height } = emitterLayout

  const radiusFrom = Math.min(width, height) / 2
  const radiusTo = Math.sqrt(width ** 2 + height ** 2)

  useEffect(function(){
    runningAnimationRef.current = true
    Animated.timing(animatedScaleRef.current, {
      toValue: radiusTo / radiusFrom,
      duration: scaleDuration,
      useNativeDriver: Platform.OS !== 'web',
      easing,
    }).start(function() {
      runningAnimationRef.current = false
      if (isDyingRef.current) {
        fadeOut()
      }
    })
  }, [])

  function fadeOut() {
    if (runningAnimationRef.current) return // already fading

    runningAnimationRef.current = true
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Animated.timing(animatedOpacityRef.current, {
      toValue: 0,
      duration: fadeOutDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(props.onDeath)
  }
  
  useEffect(() => {
    if (isDyingRef.current && !runningAnimationRef.current) {
      fadeOut()
    }
  }, [isDyingRef.current])

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
        animatedStyleRef.current.root,
      ]}
    />
  )
}