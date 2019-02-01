import * as React from 'react'
import { Styles, View as RXView, Button } from 'reactxp'
import RN, { StyleSheet, View as RNView } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { withKnobs } from '@storybook/addon-knobs'

import { View } from '../view'
import { Text } from '../text'
import { Paper } from '../paper'
import { Ripple } from '.'

const styleSheet = StyleSheet.create({
  parent: {
    width: 232,
    height: 132,
    backgroundColor: '#555'
  },
  child: {
    width: 100,
    height: 100,
    backgroundColor: '#eee'
  }
})

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Ripple', function() {
    return (
      <>
        <RXView
          style={styleSheet.parent}
          //onPress={(e) => console.log('parent', e)}
          onStartShouldSetResponder={(e) => {
            console.log('should parent', (e as any).isPropagationStopped())
            return true
          }}
        >
          <RXView
            style={styleSheet.child}
            onPress={(e) => console.log('child', e)}
            onStartShouldSetResponder={(e) => {
              console.log('should parent', (e as any).isPropagationStopped())
              return true
            }}
          />
        </RXView>

        
      </>
    )
  } as any)
