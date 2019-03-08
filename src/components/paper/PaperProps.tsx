import { ViewProps } from '../view'
import { PaperStyleOverride } from './PaperStyle'

export type PaperProps = {
  elevation?: number
  style?: PaperStyleOverride
  onLayout?: ViewProps['onLayout']
}
