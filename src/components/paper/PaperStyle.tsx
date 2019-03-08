import { StyleProp } from '../../styles/createStyle'
import { ViewStyle } from '../view'
export type PaperStyle = {
  root: StyleProp<ViewStyle>
  content: StyleProp<ViewStyle>
}

export type PaperStyleOverride = Partial<PaperStyle>
