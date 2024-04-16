import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { colorManipulator } from '../../styles/colorManipulator'
import { getHoverOverlayOpacity } from '../../styles/helpers'
import { override, Theme } from '../../styles/theme'

export type TabStyle = {
  root: ViewStyle
  icon: TextStyle
  label: TextStyle
  overlay: ViewStyle
}

export type TabsBarStyle = {
  root: ViewStyle
  container: ViewStyle
  scrollContent: ViewStyle
  leftIndicator: ViewStyle
  rightIndicator: ViewStyle
  cursorAnimatedContainer: ViewStyle
  cursor: ViewStyle
  scrollView: ViewStyle
}

export type TabStyleOverride = Partial<
  TabStyle & {
    hasIcon: ViewStyle
    hasLabel: ViewStyle
    isActiveLabel: TextStyle
    isActiveIcon: TextStyle
  }
>

export type TabBarStyleOverride = Partial<TabsBarStyle>

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
  const overlayOpacity = getHoverOverlayOpacity(overlayColor, theme)

  return StyleSheet.create({
    root: {
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

      ...Platform.select({
        web: {
          cursor: 'pointer',
        },
      }),

      ...(style.root as object),

      ...override(theme.overrides, 'tab', 'root'),

      ...(!!options && options.hasIcon
        ? override(theme.overrides, 'tab', 'hasIcon')
        : (style.hasIcon as object)),

      ...(!!options && options.hasLabel
        ? override(
            theme.overrides,
            'tab',
            'hasLabel'
          )
        : (style.hasLabel as object)),
    },
    icon: {
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
          ...(style.isActiveIcon as object),
        }),

      ...(!!options &&
        options.isDisabled && {
          color: tabDisabledColor,
        }),

      ...(style.icon as object),

      ...override(theme.overrides, 'tab', 'icon'),
    },
    label: {
      margin: 0,
      paddingLeft:
        !!options && !options.hasIconOnTop && options.hasIcon
          ? theme.spacing
          : 0,
      overflow: 'visible',

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

      ...override(theme.overrides, 'tab', 'label'),
    },
    overlay: {
      flex: 1,

      backgroundColor: overlayColor,
      opacity: overlayOpacity,

      ...(style.overlay as object),

      ...override(theme.overrides, 'tab', 'overlay'),
    },
  })
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
}): { style: TabsBarStyle, paddingHorizontal: number} {
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
    style: StyleSheet.create({
      root: {
        height: tabHeight,
        maxHeight: tabHeight,
        flexGrow: 1,
        flexShrink: 1,
        marginBottom: 4,
        ...(style.root as object),
        ...override(
          theme.overrides,
          'tabs',
          'root'
        ),
      },
      container: {
        backgroundColor: tabBackgroundColor,
        paddingHorizontal,
        ...(style.container as object),
        ...override(
          theme.overrides,
          'tabs',
          'container'
        ),
      },
      scrollContent: {
        flexDirection: 'row',
        overflow: 'visible',

        ...(style.scrollContent as object),
        ...override(
          theme.overrides,
          'tabs',
          'scrollContent'
        ),
      },
      leftIndicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: paddingHorizontal,

        ...Platform.select({
          web: {
            cursor: 'pointer',
          },
        }),

        backgroundColor: tabBackgroundColor,

        ...(style.leftIndicator as object),
        ...override(
          theme.overrides,
          'tabs',
          'leftIndicator'
        ),
      },
      rightIndicator: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: paddingHorizontal,

        ...Platform.select({
          web: {
            cursor: 'pointer',
          },
        }),

        backgroundColor: tabBackgroundColor,

        ...(style.rightIndicator as object),
        ...override(
          theme.overrides,
          'tabs',
          'rightIndicator'
        ),
      },
      cursorAnimatedContainer: {
        position: 'absolute',
        width: 1,
        top: 0,
        bottom: 0,
      },
      cursor: {
        height: 4,
        top: tabHeight - 4,

        backgroundColor: cursorColor,

        ...(style.cursor as object),
        ...override(
          theme.overrides,
          'tabs',
          'cursor'
        ),
      },
      scrollView: {
        marginBottom: -20,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ...Platform.select({
          web: { display: 'inline-flex' }, // To get the tab width fit their content
        } as any),

        ...(style.scrollView as object),
        ...override(
          theme.overrides,
          'tabs',
          'scrollView'
        ),
      }
    }),
    // Custom values
    paddingHorizontal,
  }
}

export function createScrollIndicatorOverlayStyle(
  color: string,
  theme: Theme<any, any>
) {
  return StyleSheet.create({
    root: {
      flex: 1,

      backgroundColor: color,
      opacity: getHoverOverlayOpacity(color, theme),
    }
  })
}

export const fitParent = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden'
  }
})
