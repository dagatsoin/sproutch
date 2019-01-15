import { StyleObject, TextStyle, ViewStyle, Styles } from '../../styles/createStyleSheet'
import { Theme, override } from '../../styles/theme'
import { fade } from '../../styles/colorManipulator'

export type TabStyle = {
  root: StyleObject<ViewStyle>
  icon: StyleObject<TextStyle>
  label: StyleObject<TextStyle>
  cursor: StyleObject<ViewStyle>
}

export type TabsBarStyle = {
  root: StyleObject<ViewStyle>
  wrapper: StyleObject<ViewStyle>
}

export type TabStyleOverride = TabStyle & {
  container: StyleObject<ViewStyle>
  hasIcon: StyleObject<TextStyle>
  hasLabel: StyleObject<TextStyle>
}

export const tabStyle = function({
  theme,
  palette,
  style = {},
  options,
}: {
  theme: Theme<any, any>,
  palette?: 'primary' | 'secondary' |  '',
  style?: Partial<TabStyleOverride>,
  options?: {
    mustGrow: boolean,
    hasTwoLines: boolean,
    hasIcon: boolean,
    hasLabel: boolean,
    isActive: boolean,
    isDisable: boolean,
  }
}): TabStyle {
  const tabHeight = options && options.hasTwoLines
    ? 72
    : 48
  const tabMinWidth = 90
  const tabMaxWidth = 360

  const iconSize = 3 * theme.spacing

  const tabColor = palette === undefined || palette === ''
    ? fade(theme.palette.primary.contrastText, 0.7)
    : theme.palette[palette].main

  const tabActiveColor = palette === undefined || palette === ''
    ? theme.palette.primary.contrastText
    : theme.palette[palette].main

  const tabDisabledColor = palette === undefined || palette === ''
    ? fade(theme.palette.primary.contrastText, 0.5)
    : theme.palette.text.disabled

  const twoLinesPadding = theme.spacing * 1.5

  const cursorColor = palette === undefined || palette === ''
    ? theme.palette.secondary.main
    : theme.palette[palette].main

  return {
    root: Styles.createViewStyle({
      height: tabHeight,
      minWidth: tabMinWidth,
      maxWidth: !!options && options.mustGrow 
      ? undefined
      : tabMaxWidth,
      flexGrow: 1,
      flexShrink: !!options && options.mustGrow
        ? 0
        : 1,
      position: 'relative',
      paddingHorizontal: 16,
      paddingVertical: !!options && options.hasTwoLines
          ? twoLinesPadding
          : undefined,

      justifyContent: !!options && options.hasTwoLines
          ? 'space-between'
          : 'center',
       
      alignItems: 'center',
      flexDirection: !!options && options.hasTwoLines
          ? 'column'
          : 'row',

      cursor: 'pointer',

      ...override(theme.overrides, 'tab', 'container'),

      ...style.root as object,

      ...!!options && options.hasIcon
        ? override(theme.overrides, 'tab', 'hasIcon')
        : style.hasIcon as object,

      ...!!options && options.hasLabel
        ? override(theme.overrides, 'tab', 'hasLabel')
        : style.hasLabel as object
    }),
    icon: Styles.createTextStyle({
      
      justifyContent: 'center',
      
      fontSize: iconSize,

      ...!!options && options.hasLabel && {
        margin: 0
      },
      
      color: tabColor,

      ...!!options && options.isActive && {
        color: tabActiveColor
      },
      
      ...!!options && options.isDisable && {
        color: tabDisabledColor
      }
    }),
    label: Styles.createTextStyle({
      margin: 0,
      paddingLeft: !!options && options.hasTwoLines && options.hasIcon
        ? theme.spacing
        : 0,

      textAlign: 'center',
      fontSize: 14,

      color: tabColor,

      ...!!options && options.isActive && {
        color: tabActiveColor
      },

      ...!!options && options.isDisable && {
        color: tabDisabledColor
      }
    }),
    cursor: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      height: 2,

      backgroundColor: cursorColor,

      ...!!options && options.isDisable && options.isActive && {
        right: 0,
        left: 0
      }
    },
  }
}

export const tabsBarStyle = function({
  palette,
  theme,
 /*  style = {},*/
  options,
}: {
  theme: Theme<any, any>,
  palette?: 'primary' | 'secondary' |  '',
  style?: Partial<TabStyleOverride>,
  options?: {
    hasTwoLines?: boolean,
    isScrollEnabled?: boolean
  }
}): TabsBarStyle {
  const tabHeight = options && options.hasTwoLines
    ? 72
    : 48
  
  const tabBackgroundColor = palette === undefined || palette === ''
  ? theme.palette.primary.main
  : theme.palette.background.default

  return {
    root: Styles.createViewStyle({
      height: tabHeight,
      flex: 1,
      backgroundColor: tabBackgroundColor,
    }),
    wrapper: Styles.createViewStyle({
      flexDirection: 'row',
      overflow: 'visible',

      paddingHorizontal: !!options && options.isScrollEnabled
        ? 52
        : 0,
    })
  }
}
