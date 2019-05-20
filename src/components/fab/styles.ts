import { StyleProp, Styles } from '../../styles'
import { Position } from '../foldableTree'
import { LayoutInfo, ViewStyle } from '../view'

export type FabStyle = {
  root: StyleProp<ViewStyle>
  animatedViewToggle: StyleProp<ViewStyle>
  animatedViewHover: StyleProp<ViewStyle>
  touchDetector: StyleProp<ViewStyle>
  buttonContainer: StyleProp<ViewStyle>
}

export type FabStyleOverride = Partial<FabStyle>

export function createFabStyle({
  isRoot,
  isOpen,
  localPosition,
  touchDetectorLayout: detectorLayout,
  style = {},
}: {
  isRoot: boolean
  isOpen: boolean
  localPosition: Position
  touchDetectorLayout?: LayoutInfo
  style: FabStyleOverride
}): FabStyle {
  const touchDetectorLayout = detectorLayout
    ? {
        top: detectorLayout.y,
        left: detectorLayout.x,
        width: detectorLayout.width,
        height: detectorLayout.height,
      }
    : undefined
  const offsetButton =
    isOpen && detectorLayout
      ? {
          left: -detectorLayout.x,
          top: -detectorLayout.y,
        }
      : undefined

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
    }),
    animatedViewHover: Styles.createViewStyle({
      position: 'absolute',
      overflow: 'visible',
    }),
    touchDetector: Styles.createViewStyle(
      {
        overflow: 'visible',
        position: 'absolute',
        ...touchDetectorLayout,
      },
      false
    ),
    buttonContainer: Styles.createViewStyle({
      position: 'absolute',
      alignSelf: 'auto',
      ...offsetButton,
    }),
  }
}
