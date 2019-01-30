import * as React from 'react'
import { Styles, View as RXView, Button } from 'reactxp'
import { StyleSheet, View as RNView } from 'react-native'
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
          onPress={() => console.log('parent')}
          onStartShouldSetResponder={() => true}
        >
          <Button
            style={styleSheet.child}
            onPressIn={() => console.log('child')}
          />
        </RXView>
        <Paper
          elevation={4}
          style={{
            width: 232,
            height: 132
          }}
        >
          <View
            style={Styles.createViewStyle({
              flex: 1
            })}
            onStartShouldSetResponder={() => true}
            onPress={console.log}
          >
            <View
              style={Styles.createViewStyle({
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              })}
            >
              <Text
                style={Styles.createTextStyle({
                  textAlign: 'center'
                })}
              >
                Click! Click!
              </Text>
            </View>
            <Ripple isOnPaper />
          </View>
        </Paper>
      </>
    )
  } as any)
