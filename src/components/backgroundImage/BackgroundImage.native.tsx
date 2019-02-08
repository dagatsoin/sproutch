import * as React from 'react'
import { Image, Styles, View } from 'reactxp'
import { BackgroundImageProps } from './BackgroundImageProps'

export default function BorderImage({ resizeMode, uri }: BackgroundImageProps) {
  return (
    <View
      style={Styles.createViewStyle({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      })}
    >
      <Image
        style={{
          flexGrow: 1,
        }}
        resizeMode={resizeMode}
        source={uri}
      />
    </View>
  )
}
