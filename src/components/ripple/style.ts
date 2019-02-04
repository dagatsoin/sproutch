import { Types } from 'reactxp'

import { getLuminance } from '../../styles/colorManipulator'
import { StyleObject, Styles } from '../../styles/createStyle'
import { darkShadow, lightShadow, Theme } from '../../styles/theme'

type RootStyle = {
  root: StyleObject<Types.ViewStyle>
  overlay: StyleObject<Types.ViewStyle>
  button: StyleObject<Types.ViewStyle>
}

type RippleStyle = {
  ripple: StyleObject<Types.ViewStyle>
}

export const containerStyle = function({
  isOnPaper,
  palette,
  theme,
}: {
  isOnPaper?: boolean
  palette?: 'primary' | 'secondary'
  theme: Theme<any, any>
}): RootStyle {
  const backgroundColor = palette
    ? theme.palette[palette].main
    : isOnPaper
    ? theme.palette.type === 'light'
      ? '#000'
      : '#fff'
    : getLuminance(theme.palette.primary.main) >= 0.5
    ? '#000'
    : '#fff'
  const opacity =
    getLuminance(backgroundColor) >= 0.5 ? darkShadow.hover : lightShadow.hover

  return {
    root: Styles.createViewStyle({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }),
    overlay: Styles.createViewStyle({
      flex: 1,

      backgroundColor,
      opacity,
    }),
    button: Styles.createViewStyle({
      flex: 1,
    }),
  }
}

export const rippleStyle = function({
  x,
  y,
  isOnPaper,
  radius,
  theme,
  palette,
}: {
  x: number
  y: number
  radius: number
  theme: Theme<any, any>
  isOnPaper?: boolean
  palette?: 'primary' | 'secondary'
}): RippleStyle {
  const backgroundColor = palette
    ? theme.palette[palette].main
    : isOnPaper
    ? theme.palette.type === 'light'
      ? '#000'
      : '#fff'
    : getLuminance(theme.palette.primary.main) >= 0.5
    ? '#000'
    : '#fff'
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
