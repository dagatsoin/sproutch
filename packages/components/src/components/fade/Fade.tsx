import { useEffect, useRef, useState, useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { AnimatedView } from '../animated'
import { useSpring } from '@react-spring/core'
import { componentDidMount } from '../../utils'

export type FadeProps = React.PropsWithChildren<{
  isVisible: boolean
  isAnimatedOnMount?: boolean
  duration?: number
  style?: StyleProp<ViewStyle>
  onAnimationEnd?: () => void
}>

export const Fade = function(props: FadeProps) {
  const [ shouldBeVisible, toggle ] = useState(props.isVisible)

  const prevProps = useRef<FadeProps>({...props})

  const [spring, animation] = useSpring(() => {
    // Initial state of the spring
    const { isAnimatedOnMount } = props

    const opacityFrom = isAnimatedOnMount
      ? shouldBeVisible
        ? 0
        : 1
      : shouldBeVisible
      ? 1
      : 0

    const opacityTo = isAnimatedOnMount
    ? shouldBeVisible
      ? 1
      : 0
    : shouldBeVisible
    ? 0
    : 1

    return {
      from: { opacity: opacityFrom },
      to: { opacity: opacityTo },
      duration: props.duration,
      onRest: function() {
        props.onAnimationEnd?.()
      }
    }
  }, [])

  componentDidMount(function() {
    if (props.isAnimatedOnMount) {
      animation.start()
    }
  })

  useEffect(function() {
    animation.stop()
    animation.update({to: {opacity: props.isVisible ? 1 : 0 }})
    
    toggle(props.isVisible || (!props.isVisible && shouldBeVisible))
      
    animation.start()
      
    prevProps.current = { ...props }
  }, [props.isVisible])

  const animatedStyle = useMemo(() => ({
    padding: 10,
    ...spring,
  }), [props.style])

  return <AnimatedView style={animatedStyle}>{shouldBeVisible && props.children}</AnimatedView>
}