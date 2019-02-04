import { Platform, Types } from 'reactxp'

import { fade } from '../../styles/colorManipulator'
import { StyleObject, Styles } from '../../styles/createStyle'
import { override, Theme } from '../../styles/theme'

export type TabStyle = {
  root: StyleObject<Types.ViewStyle>
  icon: StyleObject<Types.TextStyle>
  label: StyleObject<Types.TextStyle>
}

export type TabsBarStyle = {
  root: StyleObject<Types.ViewStyle>
  wrapper: StyleObject<Types.ViewStyle>
  leftIndicator: StyleObject<Types.ViewStyle>
  rightIndicator: StyleObject<Types.ViewStyle>
  cursor: StyleObject<Types.ViewStyle>
  scrollView: StyleObject<Types.ScrollViewStyle>
  paddingHorizontal: number
}

export type TabStyleOverride = TabStyle & {
  root: StyleObject<Types.ViewStyle>
  icon: StyleObject<Types.TextStyle>
  label: StyleObject<Types.TextStyle>
  hasIcon: StyleObject<Types.ViewStyle>
  hasLabel: StyleObject<Types.ViewStyle>
}

export type TabBarStyleOverride = TabStyle & {
  root: StyleObject<Types.ViewStyle>
  wrapper: StyleObject<Types.ViewStyle>
  leftIndicator: StyleObject<Types.ViewStyle>
  rightIndicator: StyleObject<Types.ViewStyle>
  cursor: StyleObject<Types.ViewStyle>
  scrollView: StyleObject<Types.ScrollViewStyle>
}

export const tabStyle = function({
  theme,
  palette,
  style = {},
  options,
}: {
  theme: Theme<any, any>
  palette?: 'primary' | 'secondary' | ''
  style?: Partial<TabStyleOverride>
  options?: {
    mustGrow: boolean
    hasTwoLines: boolean
    hasIcon: boolean
    hasLabel: boolean
    isActive: boolean
    isDisable: boolean
  }
}): TabStyle {
  const tabHeight = options && options.hasTwoLines ? 72 : 48
  const tabMinWidth = 90
  const tabMaxWidth = 360

  const iconSize = 3 * theme.spacing

  const tabColor =
    palette === undefined || palette === ''
      ? fade(theme.palette.primary.contrastText, 0.7)
      : theme.palette.text.secondary

  const tabActiveColor =
    palette === undefined || palette === ''
      ? theme.palette.primary.contrastText
      : theme.palette[palette].main

  const tabDisabledColor =
    palette === undefined || palette === ''
      ? fade(theme.palette.primary.contrastText, 0.5)
      : theme.palette.text.disabled

  const twoLinesPadding = theme.spacing * 1.5

  return {
    root: Styles.createViewStyle({
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
        !!options && options.hasTwoLines ? twoLinesPadding : undefined,

      justifyContent:
        !!options && options.hasTwoLines ? 'space-between' : 'center',

      alignItems: 'center',
      flexDirection: !!options && options.hasTwoLines ? 'column' : 'row',

      cursor: 'pointer',

      ...(style.root as object),

      ...override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'root'),

      ...(!!options && options.hasIcon
        ? override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'hasIcon')
        : (style.hasIcon as object)),

      ...(!!options && options.hasLabel
        ? override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'hasLabel')
        : (style.hasLabel as object)),
    }),
    icon: Styles.createTextStyle({
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
        options.isDisable && {
          color: tabDisabledColor,
        }),

      ...(style.icon as object),

      ...override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'icon'),
    }),
    label: Styles.createTextStyle({
      margin: 0,
      paddingLeft:
        !!options && !options.hasTwoLines && options.hasIcon
          ? theme.spacing
          : 0,

      textAlign: 'center',
      fontSize: 14,

      color: tabColor,

      ...(!!options &&
        options.isActive && {
          color: tabActiveColor,
        }),

      ...(!!options &&
        options.isDisable && {
          color: tabDisabledColor,
        }),

      ...(style.icon as object),

      ...override<'tab', TabStyleOverride>(theme.overrides, 'tab', 'label'),
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
    hasTwoLines?: boolean
    isScrollEnabled?: boolean
  }
}): TabsBarStyle {
  const tabHeight = options && options.hasTwoLines ? 72 : 48

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
      flex: 1,
      backgroundColor: tabBackgroundColor,
      paddingHorizontal,
      ...(style.root as object),
      ...override<'tabs', TabBarStyleOverride>(theme.overrides, 'tabs', 'root'),
    }),
    wrapper: Styles.createViewStyle({
      flexDirection: 'row',
      overflow: 'visible',

      ...(style.wrapper as object),
      ...override<'tabs', TabBarStyleOverride>(
        theme.overrides,
        'tabs',
        'wrapper'
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
    cursor: Styles.createViewStyle({
      position: 'absolute',
      width: 1,
      top: tabHeight - 2,
      right: 0,
      left: 0,
      height: 2,

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
    // Custom values
    paddingHorizontal,
  }
}
