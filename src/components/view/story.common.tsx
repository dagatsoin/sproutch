//https://ibb.co/VT4tcMF
import * as React from 'react'

import { View } from '../view'
import { Styles } from 'reactxp';

export const backgroundImage = function() {   
    return (
      <View
        style={Styles.createViewStyle({
          width: 64,
          height: 64
        })}
        backgroundImage={{
          uri: 'https://i.ibb.co/Yhs3Ff5/btn-bg.png',
          resizeMode: 'cover',
        }}
      ></View>
    )
}

export const ninePatches = function() {   
    return (
      <View
        style={Styles.createViewStyle({
          width: 128,
          height: 64
        })}
        backgroundImage={{
          uri: 'https://i.ibb.co/Yhs3Ff5/btn-bg.png',
          resizeMode: 'cover',
          capInsets: {
            borderWidth: 32,
            top: 127,
            right: 127,
            bottom: 127,
            left: 127
          }
        }}
      ></View>
    )
}