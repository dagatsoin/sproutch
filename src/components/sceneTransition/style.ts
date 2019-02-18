import { Styles, Theme } from '../../styles'

export const containerStyle = Styles.createViewStyle({
  flex: 1,
})

export const createCardStyle = (theme: Theme<any, any>) => {
  const backgroundColor = theme.palette.background.default

  return Styles.createViewStyle({
    overflow: 'visible',
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor,
  })
}

export const sceneContainer = Styles.createViewStyle({
  flex: 1,
  overflow: 'visible',
})

export const sceneContainerShadow = Styles.createViewStyle({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: -100,
  width: 100,
})
