import { StyleObject, ViewStyle, Styles } from '../../styles/createStyleSheet'
import { Theme, override } from '../../styles/theme'


export type ProgressBarStyle = {
  root: StyleObject<ViewStyle>
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
    root: Styles.createViewStyle({
      overflow: 'hidden',
      flex: 1,
      minHeight: theme.spacing, // initial height
      ...override<'progressBar', ProgressBarOverride>(theme.overrides, 'progressBar', 'root'),
      ...style.root as object
    }),
    top: Styles.createViewStyle({
      position: 'absolute',
      borderRadius: 16,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      ...override<'progressBar', ProgressBarOverride>(theme.overrides, 'progressBar', 'top'),
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
      ...override<'progressBar', ProgressBarOverride>(theme.overrides, 'progressBar', 'fill'),
      ...style.fill as object
    }),
    background: Styles.createViewStyle({
      flex: 1,
      backgroundColor: theme.palette.background.appBar,
      ...override<'progressBar', ProgressBarOverride>(theme.overrides, 'progressBar', 'background'),
      ...style.background as object
    }),
  }
}