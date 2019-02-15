import { Spinner } from '@sproutch/ui'
import { storiesOf } from '@storybook/react-native'
import * as React from 'react'

import markdown from './doc'

storiesOf('Sproutch', module).add('Spinner', () => <Spinner/>, { notes: { markdown }})