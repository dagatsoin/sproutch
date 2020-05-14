import { Styles } from '../../styles'
import { ViewStyle } from '../view'

export function createGridStyle(padding: number, style?: ViewStyle) {
  return Styles.createViewStyle({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: padding / 2,
    ...style,
  })
}

export function createItemContainerStyle(
  height: number,
  width: number,
  padding: number
) {
  return Styles.createViewStyle({
    height,
    width,
    flexShrink: 1,
    padding: padding / 2,
    alignItems: 'stretch',
  })
}

export const imageContainer = Styles.createViewStyle({
  flex: 1,
  alignItems: 'stretch',
})

export const bottomContainer = Styles.createViewStyle({
  minHeight: 28,
  justifyContent: 'flex-end',
})
