import { BackgroundImage, View } from '@sproutch/ui'
import { array, boolean, number, select } from '@storybook/addon-knobs'
import * as React from 'react'
import { Styles } from 'reactxp'

export const backgroundImage = function({
  containerWidth=220,
  containerHeight=220,
  resizeMode='auto',
  position=[0, 0],
  repeat=false,
}: {
  containerWidth: number,
  containerHeight: number,
  resizeMode: 'cover' | 'contain' | 'auto'
  position: [number, number]
  repeat: boolean
}) {   
  return (
    <View
      style={Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      <View
        style={Styles.createViewStyle({
          borderStyle: 'solid',
          borderColor: '#ddd',
          borderWidth: 10,
          overflow: 'hidden',
          width: number('Container width', containerWidth, {
            range: true,
            min: 0,
            max: 500,
            step: 20,
          }),
          height: number('Container height', containerHeight, {
            range: true,
            min: 0,
            max: 500,
            step: 20,
          }),
        })}
      >
        <BackgroundImage
          uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
          resizeMode={select('Resize mode', ['stretch', 'cover', 'contain', 'auto'], resizeMode)}
          repeat={boolean('Repeat image', repeat)}
          position={array('Position in % or px', [position[0] + '%', position[1] + '%'], ', ') as [string, string]}
        />
      </View>
    </View>
  )
}