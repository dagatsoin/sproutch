import { StyleObject, Styles, Theme, ViewStyle } from 'sproutch';

export type RippleStyle = {
  container: StyleObject<ViewStyle>
  firstRipple: StyleObject<ViewStyle>
  secondRipple: StyleObject<ViewStyle>
}

export default function({
  theme
}: {
  theme: Theme<any, any>,
}): RippleStyle {
  return {
    container: Styles.createViewStyle({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }),
    firstRipple: Styles.createViewStyle({
      backgroundColor: theme.palette.primary.main
    }),
    secondRipple: Styles.createViewStyle({
      backgroundColor: theme.palette.primary.main
    })
  }
}