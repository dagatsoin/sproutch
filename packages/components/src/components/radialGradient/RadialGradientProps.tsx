import { StyleProp, ViewStyle } from "react-native"

export type RadialGradientProps = {
  isEllipse?: boolean
  colors: string[]
  stops: number[]
  radius?:
    | [number, number]
    | 'closest-side'
    | 'closest-corner'
    | 'farthest-side'
    | 'farthest-corner'
  center?: [number, number] | [string, string]
  style: StyleProp<ViewStyle>
}
