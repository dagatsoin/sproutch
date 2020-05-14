import { StyleProp, Styles } from '../../styles'
import { Position } from '../../types/shared'
import { ViewStyle } from '../view'

export type FabStyle = {
  root: StyleProp<ViewStyle>
  animatedViewToggle: StyleProp<ViewStyle>
  animatedViewHover: StyleProp<ViewStyle>
  buttonContainer: StyleProp<ViewStyle>
}

export type FabStyleOverride = Partial<FabStyle>

export function createFabStyle({
  isRoot,
  localPosition,
  style = {},
}: {
  isRoot: boolean
  localPosition: Position
  style: FabStyleOverride
  width: number
  height: number
}): FabStyle {
  const rootPosition = isRoot
    ? {
        left: localPosition.x,
        top: localPosition.y,
      }
    : undefined

  return {
    root: Styles.createViewStyle(
      {
        position: 'absolute',
        overflow: 'visible',
        ...(style.root as object),
        ...rootPosition,
      },
      false
    ),
    animatedViewToggle: Styles.createViewStyle({
      position: 'absolute',
      overflow: 'visible',
      // height,
      // width
    }),
    animatedViewHover: Styles.createViewStyle({
      position: 'absolute',
      overflow: 'visible',
    }),
    buttonContainer: Styles.createViewStyle({
      position: 'absolute',
      alignSelf: 'auto',
    }),
  }
}
