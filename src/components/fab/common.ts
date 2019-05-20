import { Animated } from '../animated'
import {
  BuildHideAnimation,
  BuildShowAnimation,
  Position,
} from '../foldableTree'
import { LayoutInfo } from '../view'

type ComputeAnimatedValues<
  A extends { [K in string]: Animated.Value }
> = (params: { isRoot: boolean }) => A

export type Dimensions = {
  width: number
  height: number
}

export type FabAnimatedValues = {
  animatedTranslateX: Animated.Value
  animatedTranslateY: Animated.Value
  animatedOpacity: Animated.Value
  animatedScale: Animated.Value
}

/**
 * Move this child away from its parent
 */
export function getShowAnimationFactory(
  localPosition: Position,
  duration: number
): BuildShowAnimation<FabAnimatedValues> {
  return animatedValues =>
    getAnimation({
      toX: localPosition.x,
      toY: localPosition.y,
      toOpacity: 1,
      duration,
      animatedValues,
    })
}

/**
 * Hide this child behind its parent
 */
export function getHideAnimationFactory(
  duration: number
): BuildHideAnimation<FabAnimatedValues> {
  return animatedValues =>
    getAnimation({
      toX: 0,
      toY: 0,
      toOpacity: 0,
      duration,
      animatedValues,
    })
}

function getAnimation({
  toX,
  toY,
  toOpacity = 1,
  toScale = 1,
  animatedValues,
  duration,
}: {
  toX: number
  toY: number
  toOpacity?: number
  toScale?: number
  animatedValues: FabAnimatedValues
  duration?: number
}) {
  return Animated.parallel([
    Animated.timing(animatedValues.animatedTranslateX, {
      toValue: toX,
      duration,
      easing: Animated.Easing.InOut(),
      useNativeDriver: true,
    }),
    Animated.timing(animatedValues.animatedTranslateY, {
      toValue: toY,
      duration,
      easing: Animated.Easing.InOut(),
      useNativeDriver: true,
    }),
    Animated.timing(animatedValues.animatedOpacity, {
      toValue: toOpacity,
      duration,
      easing: Animated.Easing.InOut(),
      useNativeDriver: true,
    }),
    Animated.timing(animatedValues.animatedScale, {
      toValue: toScale,
      duration,
      easing: Animated.Easing.InOut(),
      useNativeDriver: true,
    }),
  ])
}

export const getInitialAnimatedValues: ComputeAnimatedValues<
  FabAnimatedValues
> = ({ isRoot }) => ({
  animatedTranslateX: new Animated.Value(0),
  animatedTranslateY: new Animated.Value(0),
  animatedOpacity: new Animated.Value(Number(isRoot)),
  animatedScale: new Animated.Value(1),
})

export function getPosition({
  optionSeparationAngle,
  spreadRadius,
  spreadOrientation,
  siblingNumber,
  index,
}: {
  optionSeparationAngle: number
  spreadRadius: number
  spreadOrientation: number
  siblingNumber: number
  index: number
}): Position {
  const spreadAngle = optionSeparationAngle * (siblingNumber - 1) // degree angle on which the options are distributed

  return {
    x:
      Math.cos(
        ((spreadOrientation - spreadAngle / 2 + optionSeparationAngle * index) *
          Math.PI) /
          180
      ) * spreadRadius,
    y:
      Math.sin(
        ((spreadOrientation - spreadAngle / 2 + optionSeparationAngle * index) *
          Math.PI) /
          180
      ) * spreadRadius,
  }
}

/**
 * Return an orientation in degrees so the spread won't overflow the parent container.
 */
export function getSpreadOrientation({
  localPosition,
  radius,
  nodeLayout,
  parentDimension,
}: {
  localPosition: {
    x: number
    y: number
  }
  radius: number
  nodeLayout: LayoutInfo
  parentDimension: Dimensions
}): number {
  const isOverflowLeft = localPosition.x - radius < 0
  const isOverflowRight =
    localPosition.x + radius + nodeLayout.width > parentDimension.width
  const isOverflowTop = localPosition.y - radius < 0
  const isOverflowBottom =
    localPosition.y + radius + nodeLayout.height > parentDimension.height

  if (
    !isOverflowTop &&
    !isOverflowRight &&
    !isOverflowBottom &&
    !isOverflowLeft
  ) {
    return 0
  }

  return isOverflowRight
    ? 180 + (isOverflowTop ? -45 : 45)
    : isOverflowTop
    ? 45
    : -45
}
