import { StyleProp, Styles } from '../../styles/createStyle'
import { ViewStyle } from '../view'

type RootStyle = {
  root: StyleProp<ViewStyle>
  button: StyleProp<ViewStyle>
}

type RippleStyle = {
  ripple: StyleProp<ViewStyle>
}

export const containerStyle: RootStyle = {
  root: Styles.createViewStyle({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
  button: Styles.createViewStyle({
    flex: 1,
  }),
}

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
  return {
    ripple: Styles.createViewStyle({
      position: 'absolute',
      width: radius * 2,
      height: radius * 2,
      left: x,
      top: y,

      backgroundColor,
      borderRadius: radius,
    }),
  }
}
