import { ImageBackgroundProps, ImageSourcePropType } from 'react-native'

export type Dimension = `${number}px ${number}px` | `${number}% ${number}%`
export type BackgroundSizeEnum = 'cover' | 'contain'  | 'stretch' | 'none'
export type BackgroundSize = BackgroundSizeEnum | Dimension
export type BackgroundPosition = Dimension

export type BackgroundImageProps = Omit<ImageBackgroundProps, 'source'> & {
  /**
   * ex: "50px 50px" "50% 50%"
   */
  position?: BackgroundPosition
  repeat?: boolean
  size?: BackgroundSize
  source: ImageSourcePropType
}
