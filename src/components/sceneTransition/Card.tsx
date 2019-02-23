import * as React from 'react'

import { LinearGradient } from '../linearGradient'
import { View } from '../view'
import { sceneContainer, sceneContainerShadow } from './style'

type Props = {
  children: React.ReactNode
}

export default ({ children }: Props) => (
  <View style={sceneContainer}>
    <LinearGradient
      colors={['#0005', '#0001', '#0000']}
      locations={[0, 0.3, 1]}
      start={[1, 0]}
      end={[0, 0]}
      style={sceneContainerShadow}
    />
    {children}
  </View>
)
