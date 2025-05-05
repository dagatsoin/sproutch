import * as React from 'react'

import { IEmitter, Ripple, RippleProperties } from '@sproutch/core'
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native'
import { Meta, StoryObj } from '@storybook/react'

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

const meta: Meta<typeof Ripple> = {
  title: 'Core/Atoms/Ripple',
  tags:['!dev'],
  component: Ripple,
  render() {
    const [isClicked, setIsClicked] = React.useState(false)
  
    const ripple = React.useRef<IEmitter>(null)
  
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
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta;
type Story = StoryObj<RippleProperties>;

export const Default: Story = {}