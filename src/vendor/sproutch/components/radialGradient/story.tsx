import { boolean, number, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { RadialGradient } from '.'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Radial gradient', ({ height = 200, width = 200, isPercent = true }) => (
    <RadialGradient
      isPercent={boolean('Center in percentage', isPercent)}
      style={{
        width: number('Width', width, {
          range: true,
          min: 0,
          max: 500,
          step: 20
        }),
        height: number('Height', height, {
          range: true,
          min: 0,
          max: 500,
          step: 20
        })
      }}
      colors={['#eee', '#B4985F', '#eee']}
      stops={[0.1, 0.75, 1]}
      center={[50, 100]}
      radius={100}
    />
  ))
