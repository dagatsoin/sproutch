import { BorderImage, Styles, View } from '@sproutch/ui'
import * as React from 'react'

export const borderImage = function() {   
  return (
    <View
      style={Styles.createViewStyle({
        width: 256,
        height: 512
      })}
    >
      <BorderImage
        uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
        borderWidth={32}
        sliceWidth={127}
      />
    </View>
  )
}