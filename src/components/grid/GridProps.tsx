import { ViewStyle } from '../view'

export type GridProps = {
  padding?: number
  itemHeight?: number
  itemWidth?: number
  items: Array<{
    key: string
    image: React.ReactNode
    title?: React.ReactNode
    primaryAction?: () => void
    secondaryAction?: () => void
  }>
  style?: ViewStyle
}
