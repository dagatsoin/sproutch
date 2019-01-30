import * as React from 'react'

import { View } from '../view'
import { Text } from '../text'
import { Paper } from '../paper'
import { Ripple } from '.'
import { Styles } from 'reactxp'

export default () => (
  <Paper
    elevation={4}
    style={{
      width: 232,
      height: 132
    }}
  >
    <View
      style={Styles.createViewStyle({
        flex: 1,
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
)
