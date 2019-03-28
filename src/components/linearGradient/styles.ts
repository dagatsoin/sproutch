import { ViewStyle } from '..'
import { StyleProp, Styles } from '../../styles'

export function createGradientContainerStyle(style: StyleProp<ViewStyle>) {
  if (!style) {
    return {}
  }
  const borderRadius = style['borderRadius']
  return borderRadius
    ? Styles.createViewStyle({
        borderRadius,
      })
    : {}
}
