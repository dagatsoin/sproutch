import * as React from 'react'

import { IEmitter, Ripple, StyleSheet } from '@sproutch/ui'
import { GestureResponderEvent, Pressable, Text, View } from 'react-native'
import { Story } from '@storybook/react-native';

type State = {
  isClicked0: boolean
  isClicked1: boolean
}

class Playground extends React.Component<unknown, State> {
  public state: State = {
    isClicked0: false,
    isClicked1: false,
  }
  private ripple0: IEmitter
  private ripple1: IEmitter
  private style = StyleSheet.create({
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

  public render() {
    return (
      <View style={this.style[1]}>
          <View
            style={{
              backgroundColor: 'white',
              width: 232,
              height: 132,
            }}
          >
            <View style={this.style[3]}>
              <View style={this.style[4]}>
                <Text style={{ textAlign: 'center' }}>
                  {this.state.isClicked0 ? 'Clicked' : 'Click! Click!'}
                </Text>
              </View>
              <Ripple
                color="#ff0000"
                onRef={(e: IEmitter) => (this.ripple0 = e)}
              />
                <Pressable
                 style={this.style[5]}
                  onPress={() => {
                    this.setState({ isClicked0: true })
                  }}
                  onPressIn={(e: GestureResponderEvent) => {
                    this.ripple0 && this.ripple0.onPressIn(e)
                  }}
                  onPressOut={(e: GestureResponderEvent) => {
                    this.ripple0 && this.ripple0.onPressOut(e)
                  }}
                />
            </View>
          </View>
      </View>
    )
  }
}

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