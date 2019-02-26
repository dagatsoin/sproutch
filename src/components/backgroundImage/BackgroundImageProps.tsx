import { Types } from 'reactxp'

export type BackgroundImageProps = {
  uri: string
  repeat?: boolean
  resizeMode?: Exclude<Types.ImageResizeMode, 'repeat'>
  position?: [string, string] // ['50px', '50px'] || ['50%', '50%']
}
