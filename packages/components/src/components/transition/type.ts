import { FilterKeysByProp, KeysOfUnion, UnionToIntersection, ArrayElementType, Is, IntersectionToUnion } from "@/utils/type"
import { Animated, ViewStyle, TransformsStyle, AnimatableNumericValue } from "react-native"

/**
 * All keys of a style object which are animatable. Does not include the `tranform` property.
 */
export type ViewStyleAnimatableKeys = FilterKeysByProp<ViewStyle, Animated.Value>

/**
 * All keys of the transform property of the style object which can be animated.
 */
export type TransformKeys = KeysOfUnion<TransformTypes>

export type AnimatedValueKeys = ViewStyleAnimatableKeys | TransformKeys

/**
 * An key/value object with all animatable properties as key and their Animated.Value as value
 */
export type AnimatedValues = Partial<Record<AnimatedValueKeys, Animated.Value>>

// Gather all tranformation types in an intersection type for easier manipulation
type TransformTypes = UnionToIntersection<
  Exclude<
    ArrayElementType<TransformsStyle["transform"]>,
    | string
    | undefined
  >
>


export type TranformAnimatedStyle = {
  // Some keys like matrix can be an array
  [K in keyof TransformTypes]: TransformTypes[K] extends (infer U)[]
    ? Is<U, string> extends true ? string[] : number[]
    : Is<TransformTypes[K], string> extends true ? string : number}

export type TranformAnimatableProps = {
  [K in TransformKeys]:
    // Mtrix can be an array
    TransformTypes[K] extends []
        ? number[]
        : number
}

export type AnimatableProps = Partial<Record<ViewStyleAnimatableKeys, AnimatableNumericValue> & {
    transform: Array<IntersectionToUnion<TranformAnimatableProps>>
}>

/**
 * Given the TransformKeys, return if it needs a string or a number
 */
export type RefineData<T extends ViewStyleAnimatableKeys | TransformKeys> = T extends TransformKeys
  ? Pick<UnionToIntersection<TransformTypes>, T>[T]
  : T extends ViewStyleAnimatableKeys
    ? ViewStyle[T]
    : never