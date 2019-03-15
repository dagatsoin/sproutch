import * as React from 'react'
import { Button, Types } from 'reactxp'

import { IEmitter, Paper, Ripple, Styles, Text, View } from '@sproutch/ui'

type State = {
  isClicked: boolean
}

export default class extends React.Component<{}, State> {
  public state: State = {
    isClicked: false
  }
  private ripple0: IEmitter
  private ripple1: IEmitter

  public render() {
    return (
      <>
      <Paper
        elevation={4}
        style={{
          root: {
            width: 232,
            height: 132,
          }
        }}
      >
        <View
          style={Styles.createViewStyle({
            flex: 1,
          })}
          
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
          <Ripple
            isOnPaper
            color="#ff0000"
            onRef={(e: IEmitter) => this.ripple0 = e}
          />
          <View
            style={
              Styles.createViewStyle({
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              })
            }
          >
            <Button
              style={Styles.createViewStyle({ flex: 1 })}
              onPress={() => {
                this.setState({ isClicked: true })
              }}
              onPressIn={(e: Types.SyntheticEvent) => {
                this.ripple0 && this.ripple0.onPressIn(e)
              }}
              onPressOut={(e: Types.SyntheticEvent) => {
                this.ripple0 && this.ripple0.onPressOut(e)
              }}
            />
          </View>
        </View>
      </Paper>
      <Paper
        elevation={4}
        style={{
          root: {
            borderRadius: 50,
            width: 100,
            height: 100,
          }
        }}
      >
        <View
          style={Styles.createViewStyle({
            flex: 1,
          })}
          
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
          <Ripple
            isOnPaper
            onRef={(e: IEmitter) => this.ripple1 = e}
          />
          <View
            style={
              Styles.createViewStyle({
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              })
            }
          >
            <Button
              style={Styles.createViewStyle({ flex: 1 })}
              onPress={() => {
                this.setState({ isClicked: true })
              }}
              onPressIn={(e: Types.SyntheticEvent) => {
                this.ripple1 && this.ripple1.onPressIn(e)
              }}
              onPressOut={(e: Types.SyntheticEvent) => {
                this.ripple1 && this.ripple1.onPressOut(e)
              }}
            />
          </View>
        </View>
      </Paper>
      </>
    )
  }
}
