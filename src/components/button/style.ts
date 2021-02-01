import { Styles, Types } from 'reactxp'
import {
  colorManipulator,
  override,
  StyleProp,
  Theme,
  toArray,
} from '../../styles'
import { getHoverOverlayOpacity } from '../../styles/helpers'
import { ViewStyle } from '../view'

export type ButtonStyle = {
  root: StyleProp<ViewStyle>
  content: StyleProp<ViewStyle>
  icon: StyleProp<Types.TextStyle>
  label: StyleProp<Types.TextStyle>
  overlay: StyleProp<ViewStyle>
  fitParent: StyleProp<ViewStyle>
  button: StyleProp<ViewStyle>
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ButtonStyleOverride = Partial<
  Omit<ButtonStyle, 'fitParent' | 'button'> & {
    hasIcon: StyleProp<ViewStyle>
    hasLabel: StyleProp<ViewStyle>
  }
>

export default function({
  theme,
  palette = 'primary',
  variant = 'contained',
  style = {},
  overlayColor,
  options,
}: {
  theme: Theme<any, any>
  palette?: 'primary' | 'secondary'
  variant?: 'contained' | 'outlined' | 'text'
  overlayColor: string
  style?: Partial<ButtonStyleOverride>
  options?: {
    isDense: boolean
    hasIcon: boolean
    isDisabled: boolean
  }
}): ButtonStyle {
  const height = options && options.isDense ? 32 : 36

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

  const borderColor =
    variant === 'outlined' ? theme.palette.grey['500'] : undefined

  const borderWidth = variant === 'outlined' ? 1 : undefined

  const overlayOpacity = getHoverOverlayOpacity(overlayColor, theme)

  return {
    root: [
      {
        height,
        borderRadius: theme.shape.borderRadius,
      },

      override<'button', ButtonStyleOverride>(
        theme.overrides,
        'button',
        'root'
      ),
      options?.hasIcon &&
        override<'button', ButtonStyleOverride>(
          theme.overrides,
          'button',
          'hasIcon'
        ),
      ...toArray(style.hasIcon),
      ...toArray(style.root),
    ],
    content: [
      Styles.createTextStyle({
        borderRadius: theme.shape.borderRadius,
        borderWidth,
        backgroundColor,
        borderColor,
        paddingHorizontal: 16,
        paddingVertical,
        flexDirection: 'row',
        justifyContent: 'center',
      }),
      ...toArray(style.content),
    ],
    icon: [
      Styles.createTextStyle({
        position: 'relative',
        justifyContent: 'center',
        fontSize: iconSize,
        textAlign: 'center',
        paddingRight: 8,
        color: tabColor,
        alignSelf: 'center',
      }),
      override<'button', ButtonStyleOverride>(
        theme.overrides,
        'button',
        'icon'
      ),
      ...toArray(style.icon),
    ],
    label: [
      Styles.createTextStyle({
        color: tabColor,
        fontSize,
        lineHeight,
        alignSelf: 'center',
      }),
      override<'button', ButtonStyleOverride>(
        theme.overrides,
        'button',
        'label'
      ),
      ...toArray(style.label),
    ],
    overlay: [
      Styles.createViewStyle({
        flex: 1,

        backgroundColor: overlayColor,
        opacity: overlayOpacity,
      }),
      ...toArray(style.overlay),
      override<'button', ButtonStyleOverride>(
        theme.overrides,
        'button',
        'overlay'
      ),
    ],
    fitParent: Styles.createViewStyle({
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
}

export function createCircleButtonStyle({
  style,
  radius,
}: {
  style: ButtonStyleOverride
  radius: number
}) {
  return {
    root: [
      Styles.createViewStyle({
        height: radius * 2,
        width: radius * 2,
        borderRadius: radius * 2,
      }),
      ...toArray(style.root),
    ],
    content: style.content,
    icon: [Styles.createTextStyle({ paddingRight: 0 }), ...toArray(style.icon)],
    overlay: [
      Styles.createViewStyle({ borderRadius: radius * 2 }),
      ...toArray(style.overlay),
    ],
  }
}
