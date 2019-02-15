import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { Spinner } from '@sproutch/ui'
import markdown from './doc'

storiesOf('Sproutch', module).add('Spinner', () => (
  <Spinner color="#456" size="small"/>
), { notes: { markdown }})