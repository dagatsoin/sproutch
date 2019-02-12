import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { Spiner } from '@sproutch/ui'
import markdown from './doc'

storiesOf('Sproutch', module).add('Spiner', () => (
  <Spiner/>
), { notes: { markdown }})