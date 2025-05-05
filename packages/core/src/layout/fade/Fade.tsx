import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'
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
export const Fade = function({
  isAnimatedOnMount,
  isVisible = false,
  ...props
}: FadeProps) {
  const [ state, setState ]= useState<Partial<{
    shouldBeVisible: boolean
    isRunning: boolean
  }>>({
    shouldBeVisible: isVisible,
    isRunning: !!isAnimatedOnMount
  })

  const initialValue = useMemo(() => {
    // Initial state of the spring

    return {
      opacityFrom: isAnimatedOnMount
        ? Number(!isVisible)
        : Number(isVisible),
      opacityTo: isAnimatedOnMount
        ? Number(isVisible)
        : Number(!isVisible)
    }
  }, [])

  const animatedValueRef = useRef(new Animated.Value(initialValue.opacityFrom));

  const onEnd = useCallback(function() {
    setState(state => ({
      ...state,
      isRunning: false,
    }))
    props.onAnimationEnd?.()
  }, [props.onAnimationEnd])

  componentDidMount(function() {
    if (isAnimatedOnMount) {
      Animated.timing(animatedValueRef.current, {
        toValue: initialValue.opacityTo,
        duration: props.duration,
        useNativeDriver: true,
      }).start(onEnd)
    }
  })

  useEffect(function() {

    animatedValueRef.current.stopAnimation()

    Animated.timing(animatedValueRef.current, {
      toValue: Number(isVisible),
      duration: props.duration,
      useNativeDriver: true,
    }).start(onEnd)

    setState({
      isRunning: true,
      shouldBeVisible: isVisible
    })

  }, [isVisible])

  return (state.shouldBeVisible || (!state.shouldBeVisible && state.isRunning)) && <Animated.View
    style={{ ...props.style as object, opacity: animatedValueRef.current }}>
      {props.children}
    </Animated.View>
}