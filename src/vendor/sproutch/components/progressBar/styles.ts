import { override, StyleObject, Styles, Theme, ViewStyle } from 'sproutch'

export type ProgressBarStyle = {
  container: StyleObject<ViewStyle>
  top: StyleObject<ViewStyle>
  background: StyleObject<ViewStyle>
  fill: StyleObject<ViewStyle>
}

export type ProgressBarOverride = Partial<ProgressBarStyle>

export default function({
  theme,
  palette = 'primary',
  style = {},
}: {
  theme: Theme<any, any>,
  palette?: 'primary' | 'secondary',
  style?: Partial<ProgressBarStyle>
}): Partial<ProgressBarStyle> {
  return {
    container: Styles.createViewStyle({
      overflow: 'hidden',
      flex: 1,
      minHeight: theme.spacing, // initial height
      ...override(theme.overrides, 'progressBar', 'container'),
      ...style.container as object
    }),
    top: Styles.createViewStyle({
      position: 'absolute',
      borderRadius: 16,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      ...override(theme.overrides, 'progressBar', 'top'),
      ...style.top as object
    }),
    fill: Styles.createViewStyle({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transformOrigin: 'left',
      backgroundColor: theme.palette[palette].main,
      ...override(theme.overrides, 'progressBar', 'fill'),
      ...style.fill as object
    }),
    background: Styles.createViewStyle({
      flex: 1,
      backgroundColor: theme.palette.background.appBar,
      ...override(theme.overrides, 'progressBar', 'background'),
      ...style.background as object
    }),
  }
}