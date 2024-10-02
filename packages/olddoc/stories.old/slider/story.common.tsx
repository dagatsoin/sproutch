import * as React from 'react'

import { Slider } from '@sproutch/ui'
import { number } from '@storybook/addon-knobs'

export default function() {
  const value = number('Value', 1)
  return (
    <Slider
      style={{root: {width: 100}}}
      range={[0, 3]}
      isAmount
      steps={3}
      value={value}
      key={value}
      onChange={console.log}
    />
  )
}