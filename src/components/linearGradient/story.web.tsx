import { number, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { LinearGradient } from '.'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Linear gradient', function({ height = 200, width = 200 }) {
    return (
      <LinearGradient
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
        colors={['#eee', '#B4985F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    )
  } as any)
