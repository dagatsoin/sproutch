import * as React from 'react'

import { Paper, Ripple, Styles, Text, View } from '@sproutch/ui'

type State = {
  isClicked: boolean
}

export default class extends React.Component<{}, State> {
  public state: State = {
    isClicked: false
  }

  public render() {
    return (
      <Paper
        elevation={4}
        style={{
          width: 232,
          height: 132,
        }}
      >
        <View
          style={Styles.createViewStyle({
            flex: 1,
          })}
          onStartShouldSetResponder={() => true}
          onPress={() => this.setState({ isClicked: true })}
        >
          <View
            style={Styles.createViewStyle({
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <Text
              style={Styles.createTextStyle({
                textAlign: 'center',
              })}
            >
              {this.state.isClicked ? "Clicked" : "Click! Click!"}
            </Text>
          </View>
          <Ripple isOnPaper />
        </View>
      </Paper>
    )
  }
}
