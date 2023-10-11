import { BorderImage, Styles, View } from '@sproutch/ui'
import * as React from 'react'

export const borderImage = function() {
  return (
    <View
      style={Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <View
        style={Styles.createViewStyle({
          width: 128,
          height: 256,
        })}
      >
        <BorderImage
          uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
          borderWidth={16}
          sliceWidth={127}
        />
      </View>
    </View>
  )
}
