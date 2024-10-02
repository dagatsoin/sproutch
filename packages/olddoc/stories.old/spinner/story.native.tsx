import { Spinner, Styles, View } from '@sproutch/ui'
import { storiesOf } from '@storybook/react-native'
import * as React from 'react'

import markdown from './doc'

storiesOf('Sproutch', module).add(
  'Spinner',
  () => (
    <View
      style={Styles.createViewStyle({
        flex: 1,
        overflow: 'visible',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Spinner />
    </View>
  ),
  { notes: { markdown } }
)
