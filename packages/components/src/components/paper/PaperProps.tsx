import { View, ViewProps } from 'react-native'
import { PaperStyleOverride } from './style'

export type PaperProps = {
  elevation?: number
  style?: PaperStyleOverride
  onLayout?: ViewProps['onLayout']
  ref?: (instance: View | null) => void
}
