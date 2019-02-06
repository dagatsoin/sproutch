import { Types } from 'reactxp'

import { StyleProp, Styles } from '../../styles/createStyle'
import { override, Theme } from '../../styles/theme'

export type ProgressBarStyle = {
  root: StyleProp<Types.ViewStyle>
  top: StyleProp<Types.ViewStyle>
  background: StyleProp<Types.ViewStyle>
  fill: StyleProp<Types.ViewStyle>
}

export type ProgressBarOverride = Partial<ProgressBarStyle>

export default function({
  theme,
  palette = 'primary',
  style = {},
}: {
  theme: Theme<any, any>
  palette?: 'primary' | 'secondary'
  style?: Partial<ProgressBarStyle>
}): Partial<ProgressBarStyle> {
  return {
    root: Styles.createViewStyle(
      {
        overflow: 'hidden',
        flex: 1,
        minHeight: theme.spacing, // initial height
        ...(style.root as object),
        ...override<'progressBar', ProgressBarOverride>(
          theme.overrides,
          'progressBar',
          'root'
        ),
      },
      false
    ),
    top: Styles.createViewStyle(
      {
        position: 'absolute',
        borderRadius: 16,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        ...(style.top as object),
        ...override<'progressBar', ProgressBarOverride>(
          theme.overrides,
          'progressBar',
          'top'
        ),
      },
      false
    ),
    fill: Styles.createViewStyle(
      {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette[palette].main,
        ...(style.fill as object),
        ...override<'progressBar', ProgressBarOverride>(
          theme.overrides,
          'progressBar',
          'fill'
        ),
      },
      false
    ),
    background: Styles.createViewStyle(
      {
        flex: 1,
        backgroundColor: theme.palette.background.appBar,
        ...(style.background as object),
        ...override<'progressBar', ProgressBarOverride>(
          theme.overrides,
          'progressBar',
          'background'
        ),
      },
      false
    ),
  }
}
