import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native'
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

  const initialValue = useMemo(() => {
    // Initial state of the spring
    const { isAnimatedOnMount, isVisible } = props

    return {
      opacityFrom: isAnimatedOnMount
        ? Number(!isVisible)
        : Number(isVisible),
      opacityTo: isAnimatedOnMount
        ? Number(isVisible)
        : Number(!isVisible)
    }
  }, [])

  const fadeAnim = useRef(new Animated.Value(initialValue.opacityFrom));

  const onEnd = useCallback(function() {
    setState(state => ({
      ...state,
      isRunning: false,
    }))
    props.onAnimationEnd?.()
  }, [props.onAnimationEnd])

  componentDidMount(function() {
    if (props.isAnimatedOnMount) {
      Animated.timing(fadeAnim.current, {
        toValue: initialValue.opacityTo,
        duration: props.duration,
        useNativeDriver: true,
      }).start(onEnd)
    }
  })

  useEffect(function() {

    fadeAnim.current.stopAnimation()

    Animated.timing(fadeAnim.current, {
      toValue: Number(props.isVisible),
      duration: props.duration,
      useNativeDriver: true,
    }).start(onEnd)

    setState({
      isRunning: true,
      shouldBeVisible: props.isVisible
    })

  }, [props.isVisible])

  return (state.shouldBeVisible || (!state.shouldBeVisible && state.isRunning)) &&<Animated.View
  style={[
    styles.fadingContainer,
    {
      // Bind opacity to animated value
      opacity: fadeAnim.current,
    },
  ]}>{props.children}</Animated.View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});
