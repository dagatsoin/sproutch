import { LinearGradient, Styles, View } from '@sproutch/ui'
import { number } from '@storybook/addon-knobs'
import * as React from 'react'

export default function({
  height = 200,
  width = 200
}: {
  height: number
  width: number
}) {
  return (
    <View
      style={Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <LinearGradient
        style={{
          width: number('Width', width, {
            range: true,
            min: 0,
            max: 500,
            step: 20,
          }),
          height: number('Height', height, {
            range: true,
            min: 0,
            max: 500,
            step: 20,
          }),
          padding: 15,
          alignItems: 'center',
          borderRadius: 5,
        }}
        colors={['#eee', '#B4985F']}
      />
    </View>
  )
}
