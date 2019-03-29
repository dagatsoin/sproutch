import { Platform, Types } from 'reactxp'

import { colorManipulator } from '../../styles/colorManipulator'
import { StyleProp, Styles } from '../../styles/createStyle'
import { darkShadow, lightShadow, override, Theme } from '../../styles/theme'
import { TextStyle } from '../text'
import { ViewStyle } from '../view'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type TabStyle = {
  root: StyleProp<ViewStyle>
  icon: StyleProp<Types.TextStyle>
  label: StyleProp<Types.TextStyle>
  overlay: StyleProp<ViewStyle>
  fitParent: StyleProp<ViewStyle>
}

export type TabsBarStyle = {
  root: StyleProp<ViewStyle>
  container: StyleProp<ViewStyle>
  scrollContent: StyleProp<ViewStyle>
  leftIndicator: StyleProp<ViewStyle>
  rightIndicator: StyleProp<ViewStyle>
  cursorAnimatedContainer: StyleProp<ViewStyle>
  cursor: StyleProp<ViewStyle>
  scrollView: StyleProp<Types.ScrollViewStyle>
  paddingHorizontal: number
  fitParent: StyleProp<ViewStyle>
}

export type TabStyleOverride = Partial<
  Omit<TabStyle, 'fitParent'> & {
    hasIcon: StyleProp<ViewStyle>
    hasLabel: StyleProp<ViewStyle>
    isActiveLabel: StyleProp<TextStyle>
  }
>

export type TabBarStyleOverride = Omit<
  TabsBarStyle,
  'paddingHorizontal' | 'fitParent'
>

export const tabStyle = function({
  theme,
  palette,
  style = {},
  overlayColor,
  options,
}: {
  theme: Theme<any, any>
  palette?: 'primary' | 'secondary' | ''
  style?: Partial<TabStyleOverride>
  overlayColor: string
  options?: {
    mustGrow: boolean
    hasIconOnTop: boolean
    hasIcon: boolean
    hasLabel: boolean
    isActive: boolean
    isDisabled: boolean
  }
}): TabStyle {
  const tabHeight = options && options.hasIconOnTop ? 72 : 48
  const tabMinWidth = 90
  const tabMaxWidth = 360

  const iconSize = 3 * theme.spacing

  const tabColor =
    palette === undefined || palette === ''
      ? colorManipulator.fade(theme.palette.primary.contrastText, 0.7)
      : theme.palette.text.secondary

  const tabActiveColor =
    palette === undefined || palette === ''
      ? theme.palette.primary.contrastText
      : theme.palette[palette].main

  const tabDisabledColor =
    palette === undefined || palette === ''
      ? colorManipulator.fade(theme.palette.primary.contrastText, 0.5)
      : theme.palette.text.disabled

  const twoLinesPadding = theme.spacing * 1.5

  const overlayOpacity = !!overlayColor
    ? colorManipulator.getLuminance(overlayColor) >= 0.5
      ? darkShadow.hover
      : lightShadow.hover
    : 0

  return {
    root: Styles.createViewStyle(
      {
        height: tabHeight,
        minWidth: tabMinWidth,
        maxWidth: tabMaxWidth,

        ...(!!options &&
          !options.mustGrow && {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: '100%',
          }),

        paddingHorizontal: 16,
        paddingVertical:
          !!options && options.hasIconOnTop ? twoLinesPadding : undefined,

        justifyContent:
          !!options && options.hasIconOnTop ? 'space-between' : 'center',

        alignItems: 'center',
        flexDirection: !!options && options.hasIconOnTop ? 'column' : 'row',

        cursor: 'pointer',

        ...(style.root as object),

        ...override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'root'),

        ...(!!options && options.hasIcon
          ? override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'hasIcon')
          : (style.hasIcon as object)),

        ...(!!options && options.hasLabel
          ? override<'tab', TabStyleOverride>(
              theme.overrides,
              'tab',
              'hasLabel'
            )
          : (style.hasLabel as object)),
      },
      false
    ),
    icon: Styles.createTextStyle(
      {
        justifyContent: 'center',

        ...(!!options &&
          options.hasLabel && {
            margin: 0,
          }),

        fontSize: iconSize,
        textAlign: 'center',
        color: tabColor,

        ...(!!options &&
          options.isActive && {
            color: tabActiveColor,
          }),

        ...(!!options &&
          options.isDisabled && {
            color: tabDisabledColor,
          }),

        ...(style.icon as object),

        ...override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'icon'),
      },
      false
    ),
    label: Styles.createTextStyle(
      {
        margin: 0,
        paddingLeft:
          !!options && !options.hasIconOnTop && options.hasIcon
            ? theme.spacing
            : 0,

        textAlign: 'center',
        fontSize: 14,

        color: tabColor,

        ...(!!options &&
          options.isActive && {
            color: tabActiveColor,
            ...(style.isActiveLabel as object),
          }),

        ...(!!options &&
          options.isDisabled && {
            color: tabDisabledColor,
          }),

        ...(style.label as object),

        ...override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'label'),
      },
      false
    ),
    overlay: Styles.createViewStyle(
      {
        flex: 1,

        backgroundColor: overlayColor,
        opacity: overlayOpacity,

        ...(style.overlay as object),

        ...override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'overlay'),
      },
      false
    ),
    fitParent: Styles.createViewStyle({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }),
  }
}

export const tabsBarStyle = function({
  palette,
  theme,
  style = {},
  options,
}: {
  theme: Theme<any, any>
  palette?: 'primary' | 'secondary' | ''
  style?: Partial<TabBarStyleOverride>
  options?: {
    hasIconOnTop?: boolean
    isScrollEnabled?: boolean
  }
}): TabsBarStyle {
  const tabHeight = options && options.hasIconOnTop ? 72 : 48

  const tabBackgroundColor =
    palette === undefined || palette === ''
      ? theme.palette.primary.main
      : theme.palette.background.default

  const paddingHorizontal = !!options && options.isScrollEnabled ? 52 : 0

  const cursorColor =
    palette === undefined || palette === ''
      ? theme.palette.secondary.main
      : theme.palette[palette].main

  return {
    root: Styles.createViewStyle({
      height: tabHeight,
      maxHeight: tabHeight,
      flexGrow: 1,
      flexShrink: 1,
      marginBottom: 4,
      ...(style.root as object),
      ...override<'tabs', TabBarStyleOverride>(theme.overrides, 'tabs', 'root'),
    }),
    container: Styles.createViewStyle({
      backgroundColor: tabBackgroundColor,
      paddingHorizontal,
      ...(style.container as object),
      ...override<'tabs', TabBarStyleOverride>(
        theme.overrides,
        'tabs',
        'container'
      ),
    }),
    scrollContent: Styles.createViewStyle({
      flexDirection: 'row',
      overflow: 'visible',

      ...(style.scrollContent as object),
      ...override<'tabs', TabBarStyleOverride>(
        theme.overrides,
        'tabs',
        'scrollContent'
      ),
    }),
    leftIndicator: Styles.createViewStyle({
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: paddingHorizontal,

      cursor: 'pointer',

      ...(style.leftIndicator as object),
      ...override<'tabs', TabBarStyleOverride>(
        theme.overrides,
        'tabs',
        'leftIndicator'
      ),
    }),
    rightIndicator: Styles.createViewStyle({
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: paddingHorizontal,

      cursor: 'pointer',

      ...(style.rightIndicator as object),
      ...override<'tabs', TabBarStyleOverride>(
        theme.overrides,
        'tabs',
        'rightIndicator'
      ),
    }),
    cursorAnimatedContainer: Styles.createViewStyle({
      position: 'absolute',
      width: 1,
      top: 0,
      bottom: 0,
    }),
    cursor: Styles.createViewStyle({
      height: 4,
      top: tabHeight - 4,

      backgroundColor: cursorColor,

      ...(style.cursor as object),
      ...override<'tabs', TabBarStyleOverride>(
        theme.overrides,
        'tabs',
        'cursor'
      ),
    }),
    scrollView: Styles.createScrollViewStyle({
      marginBottom: -20,
      ...(Platform.getType() === 'web' && { display: 'inline-flex' }), // To get the tab width fit their content

      ...(style.scrollView as object),
      ...override<'tabs', TabBarStyleOverride>(
        theme.overrides,
        'tabs',
        'scrollView'
      ),
    }),
    fitParent: Styles.createViewStyle({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }),
    // Custom values
    paddingHorizontal,
  }
}
