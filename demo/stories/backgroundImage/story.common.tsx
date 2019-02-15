// https://ibb.co/VT4tcMF
import { BackgroundImage, View } from '@sproutch/ui'
import * as React from 'react'
import { Styles } from 'reactxp'

export const backgroundImage = function() {   
  return (
    <View
      style={Styles.createViewStyle({
        borderStyle: 'solid',
        borderColor: '#ddd',
        borderWidth: 10,
        width: 128,
        height: 128
      })}
    >
      <BackgroundImage
        uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
        resizeMode="cover"
      />
    </View>
  )
}