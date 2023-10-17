import { TextStyle, ViewStyle } from 'react-native'
import {
  colorManipulator,
  override,
  StyleSheet,
  Theme,
} from '../../styles'
import { getHoverOverlayOpacity } from '../../styles/helpers'

export type ButtonStyleOverride = Partial<{
  root: ViewStyle
  content: ViewStyle
  icon: TextStyle
  label: TextStyle
  overlay: ViewStyle
  hasIcon: ViewStyle
  hasLabel: ViewStyle
}>

export default function({
  theme,
  palette = 'primary',
  variant = 'contained',
  style = {},
  overlayColor,
  options,
}: {
  theme: Theme<any>
  palette?: 'primary' | 'secondary'
  variant?: 'contained' | 'outlined' | 'text'
  overlayColor: string
  style?: Partial<ButtonStyleOverride>
  options?: {
    isDense: boolean
    hasIcon: boolean
    isDisabled: boolean
  }
}) {
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
    paper: StyleSheet.create({
      root: {
        height,
        borderRadius: style?.root?.['borderRadius'] ?? theme.shape.borderRadius,
        ...override(
          theme.overrides,
          'button',
          'root'
        ),
        ...override(
          theme.overrides,
          'button',
          'hasIcon'
        ),
        ...style.root,
        ...style.hasIcon,
      },
      content: {
        borderRadius: style?.root?.['borderRadius'] ?? theme.shape.borderRadius,
        borderWidth,
        backgroundColor,
        borderColor,
        paddingHorizontal: 16,
        paddingVertical,
        flexDirection: 'row',
        justifyContent: 'center',
        ...style.content,
      },
    }),
    icon: StyleSheet.create({
      root: {
        position: 'relative',
        justifyContent: 'center',
        fontSize: iconSize,
        textAlign: 'center',
        paddingRight: 8,
        color: tabColor,
        alignSelf: 'center',
        ...override(
          theme.overrides,
          'button',
          'icon'
        ),
        ...style.icon,
      }
    }),
    label: StyleSheet.create({
      root: {
        color: tabColor,
        fontSize,
        lineHeight,
        alignSelf: 'center',
        ...override(
          theme.overrides,
          'button',
          'label'
        ),
        ...style.label,
      }
    }),
    overlay: StyleSheet.create({
      root: {
        flex: 1,
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
        ...style.overlay,
        ...override(
          theme.overrides,
          'button',
          'overlay'
        ),
      }
    }),
    fitParent: StyleSheet.create({
      root: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }
    }),
    button: StyleSheet.create({
      root: {
        flex: 1,
      }
    })
  }
}

export function createCircleButtonStyle({
  style,
  radius,
}: {
  style: ButtonStyleOverride
  radius: number
}) {
  return StyleSheet.create({
    root: {
      height: radius * 2,
      width: radius * 2,
      borderRadius: radius * 2,
      ...style.root,
    },
    content: {
      borderRadius: radius * 2,
      ...style.content,
    },
    icon: {
      paddingRight: 0,
      ...style.icon,
    },
    overlay: {
      borderRadius: radius * 2,
      ...style.overlay,
    },
  })
}
