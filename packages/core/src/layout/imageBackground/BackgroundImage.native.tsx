import { ThemeContext } from '../../styles'
import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { DimensionValue, Image, View } from 'react-native'
import { BackgroundImageProps } from './BackgroundImageProps'
import { getSize } from './business'

export function BackgroundImage(props: React.PropsWithChildren<BackgroundImageProps>) {
  const theme = useContext(ThemeContext)
  const imageNaturalSize = useRef<{width: number, height: number}>(undefined)
  const imageRef = useRef<Image>(null)
  const containerRef = useRef<View>(null)
  const [computedStyle, setStyle] = useState<Partial<{
    top: number
    right: number
    bottom: number
    left: number
    width: DimensionValue
    height: DimensionValue
  }>>()

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
    containerRef.current?.measure((containerX, containerY, containerWidth, containerHeight) => {
      imageRef.current?.measure((_imageX, _imageY, imageWidth, imageHeight) => {

        if(!imageNaturalSize.current) {
          imageNaturalSize.current = { width: imageWidth, height: imageHeight }
        }

        const imageComputedSize = getSize(
          { x: containerX, y: containerY, width: containerWidth, height: containerHeight },
          imageNaturalSize.current,
          size,
        )
        const hasPositionInPercent = position?.includes('%')

        const pos = position?.match(/\d+/g) as DimensionValue[]

        if (pos) {
          if (hasPositionInPercent) {
            /**
             * (x offset value) = (container width - image width) * (position x%)
             * (y offset value) = (container height - image height) * (position y%)
             * @spec https://drafts.csswg.org/css-backgrounds/#background-position
             */
            const left = (containerWidth - imageComputedSize[0]) * Number(pos[0]) / 100
            const top = (containerHeight - imageComputedSize[1]) * Number(pos[1]) / 100
            const right = left + imageComputedSize[0]
            const bottom = top + imageComputedSize[1]

            setStyle({left, top, right, bottom, width: imageComputedSize?.[0], height: imageComputedSize?.[1] })
          } else {
            setStyle({left: Number(pos[0]), top: Number(pos[1]),/*  right, bottom, */ width: imageComputedSize?.[0], height: imageComputedSize?.[1] })
          }
        }
      })
    })
  }, [props])

  return <View
    ref={containerRef}
    style={{
      ...style as object,
      overflow: "hidden"
    }}
    {...restProps}
  >
    <Image
      // Optimization. Instead of toggle it in the computed style, setting here
      // fix several edge cases.
      resizeMode='stretch'
      ref={imageRef}
      style={{
        position: 'absolute',
        ...computedStyle,
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