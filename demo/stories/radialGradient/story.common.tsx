import { boolean, number } from '@storybook/addon-knobs'
import * as React from 'react'

import { RadialGradient } from '@sproutch/ui'

export default function({
  height = 200,
  width = 200,
  isPercent = true,
}: {
  height: number
  width: number
  isPercent: boolean
}) {
  return (
    <RadialGradient
      isPercent={boolean('Center in percentage', isPercent)}
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
      }}
      colors={['#edd33e', '#B4985F', '#0000ff']}
      stops={[0.1, 0.5, 0.6]}
      center={[50, 100]}
      radius={100}
    />
  )
}
