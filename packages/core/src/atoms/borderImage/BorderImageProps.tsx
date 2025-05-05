import { ImageSourcePropType } from "react-native"

export type BorderImageProps = {
  /**
   * The component assumes that the image is a [9 patchs](https://en.wikipedia.org/wiki/9-slice_scaling) but does not uses the central patch.
   */
  source: ImageSourcePropType
  borderWidth: number
  /**
   * There is no support for indivudual slice size, the same width will be applied to all slices.
   */
  sliceWidth: number
  /**
   * If true, the border image take place inside the container.
   */
  growInside?: boolean
}
