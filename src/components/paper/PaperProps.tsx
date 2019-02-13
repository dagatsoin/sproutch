import { Types } from 'reactxp'
import { StyleProp } from '../../styles/createStyle'
export type PaperProps = {
  elevation?: number
  style?: StyleProp<Types.ViewStyle>
  square?: boolean
  children?: React.ReactNode
}
