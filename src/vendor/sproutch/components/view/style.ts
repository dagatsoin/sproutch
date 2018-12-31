import { BackgroundImageProperties } from '~/lib/sproutch/components/view/View'

export default {
  imageBackgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  imageBackground: ({
    capInsets,
    borderWidth,
    uri,
  }: BackgroundImageProperties) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
    borderWidth: `${borderWidth}px`,
    borderImageSource: uri,
    borderImageSlice: capInsets
      ? `${capInsets.top} ${capInsets.right} ${capInsets.bottom} ${capInsets.left} fill`
      : undefined
  })
}