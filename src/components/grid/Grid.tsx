import * as React from 'react'

import { GridProps } from '.'
import { Text } from '../text'
import { View } from '../view'
import * as styles from './style'

export default function Grid({
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
    <View style={styles.createGridStyle(padding, style)}>
      {items.map(({ key, image, title }) => (
        <View style={itemContainerStyle} key={key}>
          <View style={styles.imageContainer}>{image}</View>
          {title && <View style={styles.bottomContainer}>{title}</View>}
        </View>
      ))}
    </View>
  )
}
