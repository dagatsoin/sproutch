import { useEffect, useState, useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { AnimatedView } from '../../atoms/animated'
import { useSpring } from '@react-spring/core'
import { componentDidMount } from '../../utils'

export type FadeProps = React.PropsWithChildren<{
  isVisible: boolean
  /**
   * Auto start the animation.
   * eg: isVisible is set to 'true', the component will fade in at mount.
   */
  isAnimatedOnMount?: boolean
  duration?: number
  style?: StyleProp<ViewStyle>
  onAnimationEnd?: () => void
}>

/**
 * A container which fade in/out its children.
 * - The whole DOM/native tree is removed after the fade out animation.
 * - `isAnimatedOnMount` enables automatic animation on mount
 */
export const Fade = function(props: FadeProps) {
  const [ state, setState ]= useState<Partial<{
    shouldBeVisible: boolean
    isRunning: boolean
  }>>({
    shouldBeVisible: props.isVisible,
    isRunning: !!props.isAnimatedOnMount
  })

  const [spring, animation] = useSpring(() => {
    // Initial state of the spring
    const { isAnimatedOnMount } = props

    const opacityFrom = isAnimatedOnMount
      ? props.isVisible
        ? 0
        : 1
      : props.isVisible
      ? 1
      : 0

    const opacityTo = isAnimatedOnMount
    ? props.isVisible
      ? 1
      : 0
    : props.isVisible
    ? 0
    : 1

    return {
      from: { opacity: opacityFrom },
      to: { opacity: opacityTo },
      duration: props.duration,
      onRest: function() {
        setState(state => ({
          ...state,
          isRunning: false,
        }))
        props.onAnimationEnd?.()
      }
    }
  }, [])

  componentDidMount(function() {
    if (props.isAnimatedOnMount) {
      void animation.start()
    }
  })

  useEffect(function() {
    animation.stop()
    animation.update({to: {opacity: props.isVisible ? 1 : 0 }})

    setState({
      isRunning: true,
      shouldBeVisible: props.isVisible
    })

    void animation.start()
  }, [props.isVisible])

  const animatedStyle = useMemo(() => ({
    padding: 10,
    ...spring,
  }), [props.style])

  return (state.shouldBeVisible || (!state.shouldBeVisible && state.isRunning)) && <AnimatedView style={animatedStyle}>{props.children}</AnimatedView>
}