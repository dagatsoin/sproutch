import { MutableRefObject, useEffect, useRef } from 'react'
import { TransitionStatus } from 'react-transition-group/Transition'
import {
  AnimatedValue,
  AnimatedViewAndImageCommonStyle,
  InterpolatedValue,
  StyleRuleSet,
} from 'reactxp/dist/common/Types'
import { Styles } from '../../styles'
import {
  Animated,
  AnimatedCompositeAnimation,
  AnimatedViewStyle,
} from '../animated'

type AnimatedValues = Partial<
  {
    [key in AnimableTransformKey | AnimableCommonKey]:
      | AnimatedValue
      | InterpolatedValue
  }
>

export type AnimationValues = Partial<
  {
    [key in AnimableCommonKey | AnimableTransformKey]: number
  }
>

export type TransitionValues = Partial<
  {
    [key in TransitionStatus]: AnimationValues
  }
>

enum AnimableCommonKey {
  borderRadius = 'borderRadius',
  backgroundColor = 'backgroundColor',
  opacity = 'opacity',
}

enum AnimableTransformKey {
  perspective = 'perspective',
  rotateX = 'rotateX',
  rotateY = 'rotateY',
  rotateZ = 'rotateZ',
  scaleX = 'scaleX',
  scaleY = 'scaleY',
  translateX = 'translateX',
  translateY = 'translateY',
}

const animableKeys = Object.keys(AnimableCommonKey).concat(
  Object.keys(AnimableTransformKey)
) as Array<AnimableCommonKey | AnimableTransformKey>

type AnimableStyle = AnimatedViewAndImageCommonStyle & {
  transform?: Array<
    Partial<
      {
        [key in AnimableTransformKey]: AnimatedValue | InterpolatedValue
      }
    >
  >
}

type Props = {
  duration: number
  status: TransitionStatus
  transitionValues: TransitionValues
  initialAnimatedValues: AnimationValues
  behaviorKey: string // key bound to the current behavior. Will refresh dependency when changed.
  onFinishAnimation?: (status: TransitionStatus) => void
}

function startAnimation(
  animation: MutableRefObject<AnimatedCompositeAnimation | undefined>,
  animatedValues: AnimatedValues,
  animationValues: AnimationValues,
  duration: number,
  onFinishAnimation: () => void
) {
  const parallelAnimations: AnimatedCompositeAnimation[] = []

  animableKeys.forEach(function(key: string) {
    const prop = animatedValues[key as AnimableCommonKey | AnimableTransformKey]
    const value =
      animationValues[key as AnimableCommonKey | AnimableTransformKey]

    if (prop !== undefined && value !== undefined) {
      parallelAnimations.push(
        Animated.timing(prop, {
          useNativeDriver: true,
          toValue: value,
          duration,
          easing: Animated.Easing.InOut(),
        })
      )
    }
  })
  animation.current?.stop()
  animation.current = Animated.parallel(parallelAnimations)
  animation.current.start(onFinishAnimation)
}

function getTransitionStateStyle(
  animatedKeys: Array<AnimableCommonKey | AnimableTransformKey>,
  transitionValues: AnimatedValues
): StyleRuleSet<AnimatedViewStyle> {
  const animableStyle: AnimableStyle = {
    opacity: transitionValues.opacity,
    backgroundColor: transitionValues.backgroundColor,
    borderRadius: transitionValues.borderRadius,
    transform: animatedKeys.map(key => ({
      [key]: transitionValues[key as AnimableTransformKey],
    })),
  }

  return Styles.createAnimatedViewStyle(animableStyle)
}

function createAnimatedValues(
  initialAnimatedValues: Partial<{
    perspective: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    translateX: number
    translateY: number
    borderRadius: number
    backgroundColor: number
    opacity: number
  }>
): Partial<{
  perspective: AnimatedValue | InterpolatedValue
  rotateX: AnimatedValue | InterpolatedValue
  rotateY: AnimatedValue | InterpolatedValue
  rotateZ: AnimatedValue | InterpolatedValue
  scaleX: AnimatedValue | InterpolatedValue
  scaleY: AnimatedValue | InterpolatedValue
  translateX: AnimatedValue | InterpolatedValue
  translateY: AnimatedValue | InterpolatedValue
  borderRadius: AnimatedValue | InterpolatedValue
  backgroundColor: AnimatedValue | InterpolatedValue
  opacity: AnimatedValue | InterpolatedValue
}> {
  return {
    opacity:
      initialAnimatedValues.opacity !== undefined
        ? new Animated.Value(initialAnimatedValues.opacity)
        : undefined,
    backgroundColor:
      initialAnimatedValues.backgroundColor !== undefined
        ? new Animated.Value(initialAnimatedValues.backgroundColor)
        : undefined,
    borderRadius:
      initialAnimatedValues.borderRadius !== undefined
        ? new Animated.Value(initialAnimatedValues.borderRadius)
        : undefined,
    perspective:
      initialAnimatedValues.perspective !== undefined
        ? new Animated.Value(initialAnimatedValues.perspective)
        : undefined,
    translateX:
      initialAnimatedValues.translateX !== undefined
        ? new Animated.Value(initialAnimatedValues.translateX)
        : undefined,
    translateY:
      initialAnimatedValues.translateY !== undefined
        ? new Animated.Value(initialAnimatedValues.translateY)
        : undefined,
    rotateX:
      initialAnimatedValues.rotateX !== undefined
        ? new Animated.Value(initialAnimatedValues.rotateX)
        : undefined,
    rotateY:
      initialAnimatedValues.rotateY !== undefined
        ? new Animated.Value(initialAnimatedValues.rotateY)
        : undefined,
    rotateZ:
      initialAnimatedValues.rotateZ !== undefined
        ? new Animated.Value(initialAnimatedValues.rotateZ)
        : undefined,
    scaleX:
      initialAnimatedValues.scaleX !== undefined
        ? new Animated.Value(initialAnimatedValues.scaleX)
        : undefined,
    scaleY:
      initialAnimatedValues.scaleY !== undefined
        ? new Animated.Value(initialAnimatedValues.scaleY)
        : undefined,
  }
}

function createAnimatedKeys(
  initialAnimatedValues: Partial<{
    borderRadius: number
    backgroundColor: number
    opacity: number
    perspective: number
    rotateX: number
    rotateY: number
    rotateZ: number
    scaleX: number
    scaleY: number
    translateX: number
    translateY: number
  }>
): Array<AnimableCommonKey | AnimableTransformKey> {
  return Object.keys(initialAnimatedValues) as Array<
    AnimableCommonKey | AnimableTransformKey
  >
}

export function useCustomAnim({
  duration,
  status,
  transitionValues,
  initialAnimatedValues,
  onFinishAnimation,
  behaviorKey,
}: Props) {
  const animatedValues = useRef<AnimatedValues>(
    createAnimatedValues(initialAnimatedValues)
  )

  // Cache the set of animated keys for each status
  const animatedKeys = useRef(createAnimatedKeys(initialAnimatedValues))

  const animatedStyle = useRef<StyleRuleSet<AnimatedViewStyle>>(
    getTransitionStateStyle(animatedKeys.current, animatedValues.current)
  )

  const animation = useRef<AnimatedCompositeAnimation>()

  // update the behavior
  useEffect(() => {
    // Prevent new slide to refresh
    if (status !== 'entering') {
      animatedValues.current = createAnimatedValues(initialAnimatedValues)
      animatedKeys.current = createAnimatedKeys(initialAnimatedValues)
      animatedStyle.current = getTransitionStateStyle(
        animatedKeys.current,
        animatedValues.current
      )
    }
  }, [behaviorKey])

  useEffect(() => {
    // Build and start animation for the current status
    if (transitionValues[status] !== undefined) {
      startAnimation(
        animation,
        animatedValues.current,
        transitionValues[status]!,
        duration,
        () => onFinishAnimation?.(status)
      )
    } else {
      onFinishAnimation?.(status)
    }
  }, [status])

  return [animatedStyle]
}
