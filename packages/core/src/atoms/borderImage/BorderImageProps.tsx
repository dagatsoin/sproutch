export type BorderImageProps = {
  /**
   * The uri of the image to load.
   * The component assumes that the image is a [9 patchs](https://en.wikipedia.org/wiki/9-slice_scaling) but does not uses the central patch.
   */
  uri: string
  borderWidth: number
  /**
   * There is no support for indivudual slice size, the same width will be applied to all slices.
   */
  sliceWidth: number
}
