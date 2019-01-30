import { StyleObject, ViewStyle, Styles } from '../../styles/createStyleSheet'
import { Theme, darkShadow, lightShadow } from '../../styles/theme'
import { getLuminance } from '../../styles/colorManipulator';

type RootStyle = {
  root: StyleObject<ViewStyle>
  overlay: StyleObject<ViewStyle>
  button: StyleObject<ViewStyle>
}

type RippleStyle = {
  ripple: StyleObject<ViewStyle>
}

export const containerStyle = function({
  palette,
  theme
}: {
  palette?: 'primary' | 'secondary',
  theme: Theme<any, any>
}): RootStyle {
  const backgroundColor = palette
    ? theme.palette[palette].main
    : getLuminance(theme.palette.primary.main) >= .5
      ? '#000'
      : '#fff'
  const opacity = getLuminance(backgroundColor) >= .5
  ? darkShadow.hover
  : lightShadow.hover

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
    })
  }
}

export const rippleStyle = function({
  x,
  y,
  radius,
  theme,
  palette
}: {
  x: number
  y: number
  radius: number
  theme: Theme<any, any>
  palette?: 'primary' | 'secondary'
}): RippleStyle {
  const backgroundColor = palette
    ? theme.palette[palette].main
    : getLuminance(theme.palette.primary.main) >= .5
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
    })
  }
}