import * as React from 'react'

import { View, ViewStyle } from '../view'
import { listStyle } from './styles'

type Props = {
  children: React.ReactNode
  style?: {
    root: ViewStyle
  }
}

export default function({ style, children }: Props) {
  const rootStyle = (style && style.root) || {}
  return <View style={[listStyle, rootStyle]}>{children}</View>
}
