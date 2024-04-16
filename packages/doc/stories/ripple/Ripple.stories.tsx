import * as React from 'react'

import { IEmitter, Ripple } from '@sproutch/ui'
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native'
import { Story } from '@storybook/react-native';

function Playground() {
  const [isClicked, setIsClicked] = React.useState(false)

  const ripple = React.useRef<IEmitter>()

  return (
    <View style={style[1]}>
        <View
          style={{
            backgroundColor: 'white',
            width: 232,
            height: 132,
          }}
        >
          <View style={style[3]}>
            <View style={style[4]}>
              <Text style={{ textAlign: 'center' }}>
                {isClicked ? 'Clicked' : 'Click! Click!'}
              </Text>
            </View>
            <Ripple
            color="#ff0000"
              onRef={(e: IEmitter) => (ripple.current = e)}
            />
              <Pressable
                style={style[5]}
                onPress={() => {
                  setIsClicked(true)
                }}
                onPressIn={(e: GestureResponderEvent) => {
                  ripple.current?.onPressIn(e)
                }}
                onPressOut={(e: GestureResponderEvent) => {
                  ripple.current?.onPressOut(e)
                }}
              />
          </View>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
  1: {
    flex: 1,
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
  },
  2: {
    alignSelf: 'stretch',
    overflow: 'visible',
    height: 250,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  3: {
    flex: 1,
    overflow: 'hidden'
  },
  4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  5: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
})

const RippleMeta = {
  title: 'Ripple',
  component: Playground,
  decorators: [
    (Story: Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default RippleMeta;

export const Basic = {};