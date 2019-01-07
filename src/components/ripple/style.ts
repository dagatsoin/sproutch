import { StyleObject, ViewStyle, Styles } from '../../styles/createStyleSheet'
import { Theme } from '../../styles/theme'

type RippleStyle = {
  root: StyleObject<ViewStyle>
}

export default function({
  theme
}: {
  theme: Theme<any, any>
}): RippleStyle {
  return {
    root: Styles.createViewStyle({
      backgroundColor: theme.palette.type === 'dark'
        ? 'white'
        : 'black'
    })
  }
}