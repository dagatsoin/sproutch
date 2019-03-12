import { Styles, Types } from 'reactxp'

import {
  colorManipulator,
  darkShadow,
  lightShadow,
  override,
  StyleProp,
  Theme,
} from '../../styles'
import { ViewStyle } from '../view'

export type ButtonStyle = {
  root: StyleProp<ViewStyle>
  content: StyleProp<ViewStyle>
  icon: StyleProp<Types.TextStyle>
  label: StyleProp<Types.TextStyle>
  overlay: StyleProp<ViewStyle>
  touchDetector: StyleProp<ViewStyle>
}

export type ButtonStyleOverride = Partial<
  ButtonStyle & {
    hasIcon: StyleProp<ViewStyle>
    hasLabel: StyleProp<ViewStyle>
  }
>

export default function({
  theme,
  palette = 'primary',
  variant = 'contained',
  style = {},
  options,
}: {
  theme: Theme<any, any>
  palette?: 'primary' | 'secondary'
  variant?: 'contained' | 'outlined' | 'text'
  style?: Partial<ButtonStyleOverride>
  options?: {
    isDense: boolean
    hasIcon: boolean
    isDisabled: boolean
  }
}): ButtonStyle {
  const paddingVertical = options && options.isDense ? 9 : 8.5

  const fontSize = options && options.isDense ? 14 : 16

  const lineHeight = options && options.isDense ? 14 : 19

  const iconSize = options && options.isDense ? 14 : 19

  const tabColor =
    options && options.isDisabled
      ? theme.palette.text.disabled
      : variant === 'contained'
      ? theme.palette[palette].contrastText
      : theme.palette[palette].main

  const backgroundColor =
    variant === 'contained'
      ? options && options.isDisabled
        ? colorManipulator.fade(theme.palette.text.disabled, 0.2)
        : theme.palette[palette].main
      : 'transparent'

  const overlayColor =
    variant === 'contained'
      ? colorManipulator.getLuminance(theme.palette[palette].main) >= 0.5
        ? '#000'
        : '#fff'
      : theme.palette[palette].main

  const borderColor =
    variant === 'outlined' ? theme.palette.grey['500'] : undefined

  const borderWidth = variant === 'outlined' ? 1 : undefined

  const opacity =
    colorManipulator.getLuminance(overlayColor) >= 0.5
      ? darkShadow.hover
      : lightShadow.hover

  return {
    root: Styles.createViewStyle(
      {
        borderRadius: theme.shape.borderRadius,

        ...(style.root as object),

        ...override<'button', ButtonStyleOverride>(
          theme.overrides,
          'button',
          'root'
        ),

        ...(!!options && options.hasIcon
          ? override<'button', ButtonStyleOverride>(
              theme.overrides,
              'button',
              'hasIcon'
            )
          : (style.hasIcon as object)),
      },
      false
    ),
    content: Styles.createTextStyle(
      {
        borderRadius: theme.shape.borderRadius,
        borderWidth,
        backgroundColor,
        borderColor,
        paddingHorizontal: 16,
        paddingVertical,
        flexDirection: 'row',
        justifyContent: 'center',

        ...(style.content as object),
      },
      false
    ),
    icon: Styles.createTextStyle(
      {
        position: 'relative',
        justifyContent: 'center',
        fontSize: iconSize,
        textAlign: 'center',
        paddingRight: 8,
        color: tabColor,
        alignSelf: 'center',

        ...(style.icon as object),

        ...override<'button', ButtonStyleOverride>(
          theme.overrides,
          'button',
          'icon'
        ),
      },
      false
    ),
    label: Styles.createTextStyle(
      {
        color: tabColor,
        fontSize,
        lineHeight,
        alignSelf: 'center',

        ...(style.label as object),

        ...override<'button', ButtonStyleOverride>(
          theme.overrides,
          'button',
          'label'
        ),
      },
      false
    ),
    overlay: Styles.createViewStyle(
      {
        flex: 1,

        backgroundColor: overlayColor,
        opacity,
      },
      false
    ),
    touchDetector: Styles.createViewStyle({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }),
  }
}
