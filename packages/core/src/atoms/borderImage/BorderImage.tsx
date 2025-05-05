import { CSSProperties, useMemo } from 'react'
import { BorderImageProps } from './BorderImageProps'
import { toBackgroundURL } from '../../utils'

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
  const { growInside, borderWidth, source, sliceWidth } = props

  const style = useMemo<CSSProperties>(function () {
    return {
      position: 'absolute',
      inset: growInside ? 0 : -borderWidth,
      borderWidth: borderWidth,
      borderStyle: 'solid',
      borderImageSource: `url(${toBackgroundURL(source)})`,
      borderImageSlice: `${sliceWidth}`,
    }
  }, [borderWidth, sliceWidth, source, growInside])
  return (
    <div style={style} />
  )
}
