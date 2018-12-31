import { storiesOf } from '@storybook/react'
import * as React from 'react'

import RPGIcon from './RPGIcon'

import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'

storiesOf('Sproutch', module).add('RPGIcon', () => (
  <div>
    <FontAwesome name="rocket" size={30} color="#900" />
    <RPGIcon name="aura" size={30} color="#900" />
  </div>
))
