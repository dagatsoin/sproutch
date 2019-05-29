import { ButtonStyleOverride } from '..'
import { colorManipulator, StyleProp } from '../..'
import { Styles } from '../../styles'
import { Theme } from '../../styles/theme'
import { TextStyle } from '../text'
import { ViewStyle } from '../view'

export type ListItemStyle = {
  root: StyleProp<ViewStyle>
  leftIconContainer: StyleProp<ViewStyle>
  circleIconContainer: StyleProp<ViewStyle>
  circleImageContainer: StyleProp<ViewStyle>
  squareImageContainer: StyleProp<ViewStyle>
  iconStyle: StyleProp<TextStyle>
  iconCircleStyle: StyleProp<TextStyle>
  center: StyleProp<TextStyle>
  title: StyleProp<TextStyle>
  meta: StyleProp<TextStyle>
  text: StyleProp<TextStyle>
  right: StyleProp<ViewStyle>
  mainButton: ButtonStyleOverride
}

export type ListItemStyleOverride = Partial<ListItemStyle>

export function createListItemStyle({
  theme,
  hasMeta,
  hasIcon,
  hasCircleImageOrImage,
  hasSquareImage,
  hasTextOrContent,
  hasTwoLinesText,
  styleOverride = {},
  isLast,
  palette,
}: {
  hasIcon: boolean
  hasCircleImageOrImage: boolean
  hasSquareImage: boolean
  hasTwoLinesText: boolean
  palette?: 'primary' | 'secondary'
  theme: Theme<any, any>
  hasMeta: boolean
  hasTextOrContent: boolean
  isLast?: boolean
  styleOverride?: ListItemStyleOverride
}): ListItemStyle {
  const colorFromPalette =
    palette !== undefined
      ? theme.palette[palette].main
      : theme.palette.text.primary

  const hasOneLine = !hasMeta && !hasTextOrContent
  const hasTwoLines =
    (hasMeta && !hasTextOrContent) ||
    (!hasMeta && hasTextOrContent && !hasTwoLinesText)
  const hasThreeLines =
    (hasMeta && hasTextOrContent && !hasTwoLinesText) ||
    (!hasMeta && hasTextOrContent && hasTwoLinesText)

  let height: number
  let centerMarginTop: number
  const centerMarginLeft =
    hasIcon || hasCircleImageOrImage || hasSquareImage ? 0 : 16

  if (hasOneLine) {
    height = 48
    centerMarginTop = 16
    if (hasIcon) {
      height = 56
      centerMarginTop = 18
    } else if (hasCircleImageOrImage) {
      height = 56
      centerMarginTop = 18
    } else if (hasSquareImage) {
      height = 72
      centerMarginTop = 18
    }
  } else if (hasTwoLines) {
    height = 64
    centerMarginTop = 12
    if (hasIcon) {
      height = 72
      centerMarginTop = 18
    } else if (hasCircleImageOrImage) {
      height = 72
      centerMarginTop = 18
    } else if (hasSquareImage) {
      height = 72
      centerMarginTop = 18
    }
  } else {
    height = 88
    centerMarginTop = 16
  }

  let circleImageMarginTop = 8

  if (hasTwoLines || hasThreeLines) {
    circleImageMarginTop = 16
  }

  let squareImageMarginTop = 8

  if (hasThreeLines) {
    squareImageMarginTop = 16
  }

  // Remove the border color from the overriden props
  const borderColor = styleOverride.root && styleOverride.root['borderColor']
  if (borderColor) {
    delete styleOverride.root!['borderColor']
  }

  return {
    root: Styles.createViewStyle({
      height,
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.palette.background.default,
      borderBottomWidth: !isLast ? 1 : 0,
      paddingRight: 16,

      borderColor: !isLast ? theme.palette.divider : undefined,
      ...(((styleOverride && styleOverride.root) || {}) as object),
    }),
    iconStyle: {
      color: colorFromPalette,
      fontSize: 24,
      ...((styleOverride.iconStyle || {}) as object),
    },
    iconCircleStyle: {
      color: theme.palette.background.default,
      fontSize: 24,
      ...((styleOverride.iconCircleStyle || {}) as object),
    },
    leftIconContainer: Styles.createViewStyle({
      marginLeft: 16,
      marginTop: 16,
      marginRight: 32,
      justifyContent: 'center',
      alignItems: 'center',
      ...((styleOverride.leftIconContainer || {}) as object),
    }),
    circleIconContainer: Styles.createViewStyle({
      marginLeft: 16,
      marginRight: 16,
      height: 40,
      width: 40,
      marginTop: circleImageMarginTop,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: theme.palette.text.secondary,
      overflow: 'visible',
      ...((styleOverride.circleIconContainer || {}) as object),
    }),
    circleImageContainer: Styles.createViewStyle({
      marginLeft: 16,
      marginRight: 16,
      marginTop: circleImageMarginTop,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      overflow: 'hidden',
      backgroundColor: theme.palette.text.secondary,
      ...((styleOverride.circleImageContainer || {}) as object),
    }),
    squareImageContainer: Styles.createViewStyle({
      marginLeft: 16,
      marginTop: squareImageMarginTop,
      marginRight: 16,
      height: 56,
      width: 56,
      borderRadius: 4,
      ...((styleOverride.squareImageContainer || {}) as object),
    }),
    center: Styles.createViewStyle({
      justifyContent: 'center',
      marginLeft: centerMarginLeft,
      alignSelf: 'stretch',
      flex: 1,
      ...((styleOverride.center || {}) as object),
    }),
    title: Styles.createTextStyle({
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: hasOneLine ? undefined : 20,
      height: hasOneLine ? undefined : 20,

      color: colorFromPalette,

      ...((styleOverride.title || {}) as object),
    }),
    meta: Styles.createTextStyle({
      height: 20,

      fontSize: 14,
      fontStyle: 'italic',

      color: theme.palette.text.primary,

      ...((styleOverride.meta || {}) as object),
    }),
    text: Styles.createTextStyle({
      maxHeight: hasMeta ? 18 : hasTwoLinesText ? 38 : 18,
      lineHeight: hasMeta ? 18 : hasTwoLinesText ? 38 : 18,

      fontSize: 14,

      color: theme.palette.text.secondary,

      ...((styleOverride.text || {}) as object),
    }),
    right: Styles.createViewStyle({
      height,
      minWidth: 24,
      marginLeft: 16,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      ...((styleOverride.right || {}) as object),
    }),

    mainButton: {
      root: Styles.createViewStyle({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: undefined, // !important: cancel height value. Equivalent to height: 100% in this context.
      }),
      overlay: {
        backgroundColor: colorFromPalette,
      },
    },
  }
}

export const listStyle = Styles.createViewStyle({
  flex: 1,
})

export const buttonStyle = Styles.createViewStyle({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})
