import { GridProps } from '.'
import * as styles from './style'
import { View } from 'react-native'

export function Grid({
  items,
  style,
  padding = 4,
  itemHeight = 108,
  itemWidth = 80,
}: GridProps) {
  const itemContainerStyle = styles.createItemContainerStyle(
    itemHeight,
    itemWidth,
    padding
  )
  return (
    <View style={styles.createGridStyle(padding, style).root}>
      {items.map(({ key, image, title }) => (
        <View style={itemContainerStyle.root} key={key}>
          <View style={styles.imageContainer.root}>{image}</View>
          {title && <View style={styles.bottomContainer.root}>{title}</View>}
        </View>
      ))}
    </View>
  )
}
