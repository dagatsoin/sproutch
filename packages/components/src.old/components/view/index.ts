export { ViewStyle } from 'react-native'
export { ViewProps } from 'react-native'
export { View } from 'react-native'
import { LayoutChangeEvent } from 'react-native'

export type ViewOnLayoutEvent = LayoutChangeEvent

export type LayoutInfo = {
  x: number
  y: number
  width: number
  height: number
}
