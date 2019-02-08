// https://ibb.co/VT4tcMF
import { BackgroundImage, View } from '@sproutch/sproutch'
import * as React from 'react'
import { Styles } from 'reactxp'


export const backgroundImage = function() {   
  return (
    <View
      style={Styles.createViewStyle({
        width: 64,
        height: 64
      })}
    >
      <BackgroundImage
        uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
        resizeMode="cover"
      />
    </View>
  )
}