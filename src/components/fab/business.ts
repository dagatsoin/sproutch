import { Dimensions, Position } from '../../types/shared'
import { Animated } from '../animated'
import { LayoutInfo } from '../view'
import { ComputeAnimatedValues, FabAnimatedValues } from './type'

export const getInitialAnimatedValues: ComputeAnimatedValues<FabAnimatedValues> = ({
  isRoot,
}) => ({
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
