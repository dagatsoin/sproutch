import { ViewProps } from '../view'
import { PaperStyleOverride } from './style'

export type PaperProps = {
  elevation?: number
  style?: PaperStyleOverride
  onLayout?: ViewProps['onLayout']
}
