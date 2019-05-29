import * as React from 'react'

import { TextStyle, View } from '..'
import { InjectedTheme, StyleProp, withTheme } from '../../styles'
import { Button } from '../button'
import { Text } from '../text'
import { createListItemStyle, ListItemStyleOverride } from './styles'

export type ListItemProps = {
  titleSlot?: React.ReactNode
  title?: string
  metaSlot?: React.ReactNode
  meta?: string
  textSlot?: React.ReactNode
  text?: string
  palette?: 'primary' | 'secondary'
  style?: ListItemStyleOverride
  circleImageSlot?: React.ReactNode
  squareImageSlot?: React.ReactNode
  hasTwoLinesText?: boolean
  rightSlot?: React.ReactNode
  centerSlot?: React.ReactNode
  isLast?: boolean
  renderLeftIcon?: (iconStyle: StyleProp<TextStyle>) => React.ReactNode
  renderLeftCircleIcon?: (iconStyle: StyleProp<TextStyle>) => React.ReactNode
  mainAction?: () => void
} & InjectedTheme<any>

const ListItem = ({
  renderLeftIcon,
  renderLeftCircleIcon,
  circleImageSlot,
  squareImageSlot,
  centerSlot,
  rightSlot,
  title,
  titleSlot,
  meta,
  metaSlot,
  text,
  textSlot,
  palette,
  hasTwoLinesText = false,
  theme,
  style,
  isLast,
  mainAction,
}: ListItemProps) => {
  const listItemStyle = createListItemStyle({
    theme,
    hasMeta: !!meta,
    hasIcon: !!renderLeftIcon,
    hasCircleImageOrImage: !!circleImageSlot || !!renderLeftCircleIcon,
    hasSquareImage: !!squareImageSlot,
    hasTextOrContent: !!text || !!centerSlot,
    hasTwoLinesText,
    styleOverride: style,
    isLast,
    palette,
  })
  return (
    <View style={listItemStyle.root}>
      {renderLeftIcon && (
        <View style={listItemStyle.leftIconContainer}>
          {renderLeftIcon(listItemStyle.iconStyle)}
        </View>
      )}
      {renderLeftCircleIcon && (
        <View style={listItemStyle.circleIconContainer}>
          {renderLeftCircleIcon(listItemStyle.iconCircleStyle)}
        </View>
      )}
      {circleImageSlot && (
        <View style={listItemStyle.circleImageContainer}>
          {circleImageSlot}
        </View>
      )}
      {squareImageSlot && (
        <View style={listItemStyle.squareImageContainer}>
          {squareImageSlot}
        </View>
      )}

      <View style={listItemStyle.center}>
        {titleSlot}
        {title && <Text style={listItemStyle.title}>{title}</Text>}
        {metaSlot}
        {meta && <Text style={listItemStyle.meta}>{meta}</Text>}
        {textSlot}
        {text && <Text style={listItemStyle.text}>{text}</Text>}
        {centerSlot}
      </View>

      {mainAction && (
        <Button
          variant="text"
          onPress={mainAction}
          palette={palette}
          style={listItemStyle.mainButton}
        />
      )}

      {rightSlot && <View style={listItemStyle.right}>{rightSlot}</View>}
    </View>
  )
}

export default withTheme(ListItem)
