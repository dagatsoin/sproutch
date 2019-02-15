import { StyleProp } from '../../styles/createStyle'
import { ViewStyle } from '../view'
export type PaperProps = {
  elevation?: number
  style?: StyleProp<ViewStyle>
  square?: boolean
  children?: React.ReactNode
}
