import { ViewStyle } from "react-native"

export type GridProps = {
  padding?: number
  itemHeight?: number
  itemWidth?: number
  items: Array<{
    key: string
    image: React.ReactNode
    title?: React.ReactElement
    primaryAction?: () => void
    secondaryAction?: () => void
  }>
  style?: ViewStyle
}
