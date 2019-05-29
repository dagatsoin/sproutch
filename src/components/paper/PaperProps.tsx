import { View, ViewProps } from '../view'
import { PaperStyleOverride } from './style'

export type PaperProps = {
  elevation?: number
  style?: PaperStyleOverride
  onLayout?: ViewProps['onLayout']
  ref?: (instance: View | null) => void
}
