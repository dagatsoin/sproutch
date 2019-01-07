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
    hasTwoLines: boolean,
    hasIcon: boolean,
    hasLabel: boolean,
    isActive: boolean,
    isDisable: boolean,
  }
}): TabStyle {

  // Variables
  // ========================================================================

  const tabHeight = options && options.hasTwoLines
    ? 72
    : 48
  const tabMinWidth = 90
  const tabMaxWidth = 360

  const iconSize = 3 * theme.spacing

  const tabBackgroundColor = palette === undefined || palette === ''
    ? theme.palette.primary.main
    : theme.palette.background.default

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
      maxWidth: tabMaxWidth,
      flex: 1,
      position: 'relative',
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

      backgroundColor: tabBackgroundColor,

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

      height: 14,
        
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
      // borderStyle: 'solid',

      ...!!options && options.isDisable && options.isActive && {
        right: 0,
        left: 0
      }
    },
  }
}

export const tabsBarStyle = function({
 /* theme,
  palette,
  style = {},
  options,*/
}: {
  theme: Theme<any, any>,
  palette?: 'primary' | 'secondary' |  '',
  style?: Partial<TabStyleOverride>,
  options?: {
    hasTwoLines: boolean,
  }
}): TabsBarStyle {
  return {
    root: Styles.createViewStyle({
      flexDirection: 'row',
      overflow: 'visible',
    })
  }
}
