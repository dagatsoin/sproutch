import { StyleRuleSet, ViewStyle } from 'reactxp/dist/common/Types'
import { Styles, Theme } from '../../styles'

export type SliderStyleOverride = Partial<{
  root: StyleRuleSet<ViewStyle>
  baseSegment: StyleRuleSet<ViewStyle>
  activeSegment: StyleRuleSet<ViewStyle>
  cursor: StyleRuleSet<ViewStyle>
}>

export function createStyle({
  theme,
  palette = 'primary',
  styleOverride,
}: {
  theme: Theme<any, any>
  palette?: 'primary' | 'secondary'
  styleOverride?: SliderStyleOverride
}) {
  return {
    root: [
      Styles.createViewStyle({
        flex: 1,
        overflow: 'visible',
        justifyContent: 'center',
      }),
      styleOverride?.root,
    ],
    unusedSegment: [
      Styles.createViewStyle({
        height: theme.spacing,
        position: 'absolute',
        borderRadius: 4,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.modifier.disabled,
      }),
      styleOverride?.baseSegment,
    ],
    usedSegment: [
      Styles.createViewStyle({
        position: 'absolute',
        height: theme.spacing,
        borderRadius: 4,
        left: 0,
        right: 0,
        backgroundColor: theme.palette[palette].main,
      }),
      styleOverride?.activeSegment,
    ],
    cursor: [
      Styles.createViewStyle({
        position: 'absolute',
        backgroundColor: theme.palette[palette].main,
        width: 20,
        height: 20,
        borderRadius: 20,
      }),
      styleOverride?.cursor,
    ],
  }
}
