import { Option } from 'space-lift'
import { override, StyleObject, Styles, TextStyle, Theme, ViewStyle } from 'sproutch'

export type TabStyle = {
  container: StyleObject<ViewStyle>
  icon: StyleObject<TextStyle>
  label: StyleObject<TextStyle>
  cursor: StyleObject<ViewStyle>
}

export type TabStyleOverride = TabStyle & {
  hasIcon: StyleObject<TextStyle>
  hasLabel: StyleObject<TextStyle>
}

export default function({
  theme,
  palette,
  style = {},
  options,
}: {
  theme: Theme<any, any>,
  palette?: 'primary' | 'secondary',
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
  const tabMaxWidth = 45 * theme.spacing

  const iconSize = 3 * theme.spacing

  const tabBackgroundColor = palette === undefined
    ? theme.palette.primary.main
    : theme.palette.background.default

  const tabColor = palette === undefined
    ? theme.palette.text.secondary
    : theme.palette[palette].main

  const tabActiveColor = palette === undefined
    ? theme.palette.text.primary
    : theme.palette[palette].main

  const tabDisabledColor = theme.palette.text.disabled

  const twoLinesPadding = theme.spacing * 1.5

  const cursorColor = palette === undefined
    ? theme.palette.secondary.main
    : theme.palette[palette].main

  return {
    container: Styles.createViewStyle({
      height: tabHeight,
      maxWidth: tabMaxWidth,
      flex: 1,
      position: 'relative',
      paddingVertical: Option(options)
        .map(o => o.hasTwoLines
          ? twoLinesPadding
          : undefined
        ).get(),
      justifyContent: Option(options)
        .map(o => o.hasTwoLines
          ? 'space-between'
          : 'center'
        ).getOrElse('center'),
      alignItems: 'center',
      flexDirection: Option(options)
        .map(o => o.hasTwoLines
          ? 'column'
          : 'row'
        ).getOrElse('row'),

      cursor: 'pointer',

      backgroundColor: tabBackgroundColor,

      ...override(theme.overrides, 'tab', 'container'),
      ...style.container as object,
      ...Option(options)
        .map(o => ({
          ...(o.hasIcon && {
            ...override(theme.overrides, 'tab', 'hasIcon'),
            ...style.hasIcon as object
          }),
          ...(o.hasLabel && {
            ...override(theme.overrides, 'tab', 'hasLabel'),
            ...style.hasLabel as object
          })
        })).get()
    }),
    icon: Styles.createTextStyle({
      
      justifyContent: 'center',
      
      fontSize: iconSize,

      color: tabColor,
      ...Option(options)
        .map(o => ({
          ...(o.hasLabel && {
            margin: 0
          }),
          ...(o.isActive && {
            color: tabActiveColor
          }),
          ...(o.isDisable && {
            color: tabDisabledColor
          })
        })).get()
    }),
    label: Styles.createTextStyle({
      margin: 0,
      paddingLeft: Option(options)
        .map(o => !o.hasTwoLines && o.hasIcon
          ? theme.spacing
          : 0
        ).getOrElse(0),
      height: 14,
        
      textAlign: 'center',
      fontSize: 14,

      color: tabColor,
      ...Option(options)
        .map(o => ({
          ...(o.isActive && {
            color: tabActiveColor
          }),
          ...(o.isDisable && {
            color: tabDisabledColor
          })
        })).get()
    }),
    cursor: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      height: 2,
      
      backgroundColor: cursorColor,
      // borderStyle: 'solid',
      
      ...Option(options)
        .map(o => ({
          ...(o.isActive && {
            right: 0,
            left: 0
          })
        })).get()
    },
  }
}