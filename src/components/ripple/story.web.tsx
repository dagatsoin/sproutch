import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Paper } from '../paper'
import RippleCreator from './RippleCreator'

storiesOf('Sproutch', module)
  .add('Ripple', () => (
    <Paper
      elevation={4}
      style={{
        width: 100,
        height: 100,
      }}
    >
      <RippleCreator/>
    </Paper>
  ))