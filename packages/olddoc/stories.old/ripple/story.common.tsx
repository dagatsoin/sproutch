import * as React from 'react'
import { Button, Types } from 'reactxp'

import { IEmitter, Paper, Ripple, Styles, Text, View } from '@sproutch/ui'

type State = {
  isClicked0: boolean
  isClicked1: boolean
}

export default class extends React.Component<{}, State> {
  public state: State = {
    isClicked0: false,
    isClicked1: false,
  }
  private ripple0: IEmitter
  private ripple1: IEmitter

  public render() {
    return (
      <View
        style={Styles.createViewStyle({
          flex: 1,
          overflow: 'visible',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <View
          style={Styles.createViewStyle({
            alignSelf: 'stretch',
            overflow: 'visible',
            height: 250,
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <Paper
            elevation={4}
            style={{
              root: {
                width: 232,
                height: 132,
              },
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
                  {this.state.isClicked0 ? 'Clicked' : 'Click! Click!'}
                </Text>
              </View>
              <Ripple
                color="#ff0000"
                onRef={(e: IEmitter) => (this.ripple0 = e)}
              />
              <View
                style={Styles.createViewStyle({
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                })}
              >
                <Button
                  style={Styles.createViewStyle({ flex: 1 })}
                  onPress={() => {
                    this.setState({ isClicked0: true })
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
         </View>
      </View>
    )
  }
}
