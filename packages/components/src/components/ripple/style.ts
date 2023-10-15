import { ViewStyle } from 'react-native'
import { StyleProp, StyleSheet } from '../../styles/createStyle'

type RootStyle = {
  root: StyleProp<ViewStyle>
  button: StyleProp<ViewStyle>
}

type RippleStyle = {
  ripple: StyleProp<ViewStyle>
}

export const containerStyle: RootStyle = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  button: {
    margin: 0,
    flex: 1,
  },
})

export const rippleStyle = function({
  x,
  y,
  radius,
  color: backgroundColor,
}: {
  x: number
  y: number
  radius: number
  color?: string
}): RippleStyle {
  return StyleSheet.create({
    ripple: {
      position: 'absolute',
      width: radius * 2,
      height: radius * 2,
      left: x,
      top: y,

      backgroundColor,
      borderRadius: radius,
    },
  })
}
