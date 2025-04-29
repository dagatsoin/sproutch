import { ThemeContext } from '../../styles'
import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { DimensionValue, Image, ImageResizeMode, View } from 'react-native'
import { BackgroundImageProps } from './BackgroundImageProps'

export function BackgroundImage(props: React.PropsWithChildren<BackgroundImageProps>) {
  const theme = useContext(ThemeContext)
  const imageRef = useRef<Image>(null)
  const containerRef = useRef<View>(null)
  const [imagePosition, setPos] = useState<{left: number, top: number}>()

  const {
    style,
    imageStyle,
    position,
    size,
    source,
    ...restProps
  } = props

  /**
  * Compute image dimension
  */
  useLayoutEffect(() => {
    containerRef.current?.measure((_containerX, _containerY, containerWidth, containerHeight) => {
      imageRef.current?.measure((_imageX, _imageY, imageWidth, imageHeight) => {

        if (size === 'stretch') {
          setPos({left: 0, top: 0})
        }

        const hasPositionInPercent = position?.includes('%')

        const pos = position?.match(/\d+/g) as DimensionValue[]

        if (pos) {
          if (hasPositionInPercent) {
            /**
             * (x offset value) = (container width - image width) * (position x%)
             * (y offset value) = (container height - image height) * (position y%)
             * @spec https://drafts.csswg.org/css-backgrounds/#background-position
             */
            const left = (containerWidth - imageWidth) * Number(pos[0]) / 100
            const top = (containerHeight - imageHeight) * Number(pos[1]) / 100
            setPos({left, top})
          } else {
            setPos({left: Number(pos[0]), top: Number(pos[1])})
          }
        }
      })
    })
  }, [setPos, position, size])

  const hasDimensions = size && /%|px/.test(size)

  const imageSize = size
    ? size.includes('%')
      ? size.split(' ') as DimensionValue[]
      : size.includes('px')
        ? size.match(/\d+/g) as DimensionValue[]
        : null
    : null

  const resizeMode = size
    && /cover|contain|stretch/.test(size)
    ? size as ImageResizeMode
    : hasDimensions
      ? 'stretch'
      : undefined

  return <View
    ref={containerRef}
    style={{
      ...style as object,
      overflow: "hidden"
    }}
    {...restProps}
  >
    <Image
      ref={imageRef}
      style={{
        position: 'absolute',
        inset: 0,
        left: imagePosition?.left,
        top: imagePosition?.top,
        resizeMode,
        width: imageSize?.[0],
        height: imageSize?.[1],
        ...theme.palette.background.default.image as object,
      }}
      source={source}
    />
    <View
      style={{
        position: 'absolute',
        inset: 0
      }}
    >
      {props.children}
    </View>
  </View>
}