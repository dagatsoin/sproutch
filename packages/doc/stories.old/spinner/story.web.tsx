import { Spinner, Styles, View } from '@sproutch/ui'
import { storiesOf } from '@storybook/react'
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
      <Spinner color="#456" size="small" />
    </View>
  ),
  { notes: { markdown } }
)
