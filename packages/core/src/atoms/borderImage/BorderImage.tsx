import { useMemo } from 'react'
import { BorderImageProps } from './BorderImageProps'
import { StyleSheet } from 'react-native'

/**
 * A low level component which simulates *partially* the behavior of the CSS [border-image](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image) properties.
 *
 * ### Specifications:
 * - The given image is assumed to be a [9 patchs](https://en.wikipedia.org/wiki/9-slice_scaling) image.
 * - The center patch is not used.
 * - The same size is applied to all slices.
 * - The border are displayed outside the container so the width of the container does not include the border width.
 */
export function BorderImage(props: BorderImageProps) {
  const { borderWidth, uri, sliceWidth } = props
  const style = useMemo(function() {
    return StyleSheet.create({
      root: {
        position: 'absolute',
        inset: -borderWidth,
        borderWidth: borderWidth,
        borderStyle: 'solid',
        borderImageSource: `url(${uri})`,
        borderImageSlice: `${sliceWidth}`,
      }
    })
  }, [borderWidth, sliceWidth, uri])
  return (
    <div style={style.root}/>
  )    
}
