import { override, StyleProp, Styles, Theme } from '../../styles'
import { ViewStyle } from '../view'

export type SceneTransitionStyle = {
  root: StyleProp<ViewStyle>
  currentSceneContainer: StyleProp<ViewStyle>
  nextSceneContainer: StyleProp<ViewStyle>
  sceneContainerShadow: StyleProp<ViewStyle>
}

export type SceneTransitionOverride = Partial<SceneTransitionStyle>

export function createSceneTransitionStyle(
  theme: Theme<any, any>,
  style: SceneTransitionOverride = {}
): SceneTransitionStyle {
  const backgroundColor = theme.palette.background.default

  return {
    root: Styles.createViewStyle({
      flex: 1,
      ...(style.root as object),
      ...override<'sceneTransition', SceneTransitionOverride>(
        theme.overrides,
        'sceneTransition',
        'root'
      ),
    }),
    currentSceneContainer: Styles.createViewStyle({
      overflow: 'visible',
      flex: 1,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor,
      ...(style.currentSceneContainer as object),
      ...override<'sceneTransition', SceneTransitionOverride>(
        theme.overrides,
        'sceneTransition',
        'currentSceneContainer'
      ),
    }),
    nextSceneContainer: Styles.createViewStyle({
      flex: 1,
      overflow: 'visible',
      backgroundColor,
      ...(style.nextSceneContainer as object),
      ...override<'sceneTransition', SceneTransitionOverride>(
        theme.overrides,
        'sceneTransition',
        'nextSceneContainer'
      ),
    }),
    sceneContainerShadow: Styles.createViewStyle({
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: -100,
      width: 100,
      ...(style.sceneContainerShadow as object),
      ...override<'sceneTransition', SceneTransitionOverride>(
        theme.overrides,
        'sceneTransition',
        'sceneContainerShadow'
      ),
    }),
  }
}
