import { Types } from 'reactxp'

import { StyleProp } from '../../styles'
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
  style: StyleProp<Types.ViewStyle>
}
