import * as React from 'react'

import { LinearGradient } from '../linearGradient'
import { View } from '../view'
import { SceneTransitionStyle } from './style'

type Props = {
  styleSheet: {
    sceneContainer: SceneTransitionStyle['sceneContainer']
    sceneContainerShadow: SceneTransitionStyle['sceneContainerShadow']
  }
  children: React.ReactNode
}

export default ({ children, styleSheet }: Props) => (
  <View style={styleSheet.sceneContainer}>
    <LinearGradient
      colors={['#0005', '#0001', '#0000']}
      locations={[0, 0.3, 1]}
      start={[1, 0]}
      end={[0, 0]}
      style={styleSheet.sceneContainerShadow}
    />
    {children}
  </View>
)
