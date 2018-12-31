import * as React from 'react'
import { Paper, Text } from 'sproutch'

import { storiesOf } from '@storybook/react-native';

storiesOf('Sproutch', module)
  .add('Paper', () => (
    <Paper elevation={10}>
      <Text>Pied Paper</Text>
    </Paper>
  ))