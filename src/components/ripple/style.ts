import { colorManipulator } from '../../styles/colorManipulator'
import { StyleProp, Styles } from '../../styles/createStyle'
import { Theme } from '../../styles/theme'
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
  theme,
  palette,
  color,
  isOnPaper = false,
}: {
  x: number
  y: number
  radius: number
  theme: Theme<any, any>
  isOnPaper?: boolean
  color?: string
  palette?: 'primary' | 'secondary'
}): RippleStyle {
  const backgroundColor =
    color ||
    (isOnPaper
      ? // The container used the paper background
        palette
        ? theme.palette[palette].main
        : theme.palette.type === 'light'
        ? '#000'
        : '#fff'
      : // The primary color is used as the container background
      colorManipulator.getLuminance(theme.palette[palette || 'primary'].main) >=
        0.5
      ? '#000'
      : '#fff')

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
