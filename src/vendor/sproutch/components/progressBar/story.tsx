import { number, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { ProgressBar } from './'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Progress bar', ({ animationDuration = 300, progress = 50 }) => (
    <ProgressBar
      progress={number('Progress', progress, {
        range: true,
        min: 0,
        max: 100,
        step: 20
      })}
      animationDuration={number('Animation duration', animationDuration, {
        range: true,
        min: 0,
        max: 3000,
        step: 10
      })}
    />
  ))
