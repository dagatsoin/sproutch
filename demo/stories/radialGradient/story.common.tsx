import { array, boolean, number, select } from '@storybook/addon-knobs'
import * as React from 'react'

import { RadialGradient, RadialGradientProps, Styles, View } from '@sproutch/ui'

export default function({
  isEllipse = true,
  height = 200,
  width = 200,
  radius,
  percentRadius = [50, 50],
  center = [50, 50],
}: {
  isEllipse: boolean
  height: number
  width: number
  radius?: string
  percentRadius?: [number, number]
  center: [number, number]
}) {
  const predefinedRadiusKnob = select(
    'Radius type',
    [
      undefined as RadialGradientProps['radius'],
      'closest-side',
      'closest-corner',
      'farthest-side',
      'farthest-corner',
    ],
    radius
  )

  const percentRadiusKnob = array(
    'Radius in percent (to enable, select NULL in Radius Type)',
    percentRadius,
    ', '
  )

  return (
    <View
      style={Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <RadialGradient
        style={{
          width: number('Container width', width, {
            range: true,
            min: 0,
            max: 500,
            step: 20,
          }),
          height: number('Container height', height, {
            range: true,
            min: 0,
            max: 500,
            step: 20,
          }),
        }}
        radius={predefinedRadiusKnob || percentRadiusKnob}
        isEllipse={boolean('Ellipse shape', isEllipse)}
        colors={['#edd33e', '#B4985F', '#00f', '#000']}
        stops={[0.1, 0.5, 0.99, 1]}
        center={array(
          'Gradient origin position (in percent)',
          [center[0] + '%', center[1] + '%'],
          ', '
        )}
      />
    </View>
  )
}
