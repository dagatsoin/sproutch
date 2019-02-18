import { SceneTransition, Spinner, Styles, Text, View } from '@sproutch/ui'
import * as React from 'react'
import { Button } from 'reactxp'

enum Screen {
  first,
  second,
}

type State = {
  currentScreen: Screen
}

const style = {
  pageLayout: Styles.createViewStyle({
    width: 300,
    height: 500,
  }),
  button: Styles.createButtonStyle({
    flex: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#d89209',
    borderRadius: 4,
  }),
  buttonText: Styles.createTextStyle({
    textAlign: 'center',
    color: 'white',
  }),
  header: Styles.createViewStyle({
    flexDirection: 'row',
  }),
  sceneContainer: Styles.createViewStyle({
    flex: 1,
  }),
  scene: Styles.createViewStyle({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  })
}

const Scene1 = (
  <View style={style.scene}>
    <Text>1</Text>
  </View>
)

const Scene2 = (
  <View style={style.scene}>
    <Text>2</Text>
  </View>
)

const dummyScene = (
  <View style={style.scene}>
    <Spinner size="small" color="#809" />
  </View>
)


export default class Story extends React.Component<{}, State> {
  public state: State = {
    currentScreen: Screen.first,
  }

  public render() {
    const nextScreen =
      this.state.currentScreen === Screen.first ? Scene1 : Scene2

    return (
      <View style={style.pageLayout}>
        <View style={style.header}>
          <Button
            style={style.button}
            disabled={this.state.currentScreen === Screen.first}
            onPress={this.goToFirstScreen}
          >
            <Text style={style.buttonText}>First screen</Text>
          </Button>
          <Button
            style={style.button}
            disabled={this.state.currentScreen === Screen.second}
            onPress={this.goToSecondScreen}
          >
            <Text style={style.buttonText}>Second screen</Text>
          </Button>
        </View>
        <View style={style.sceneContainer}>
          <SceneTransition
            nextScene={nextScreen}
            delayRender={1000}
            dummyScene={dummyScene}
          />
        </View>
      </View>
    )
  }

  private goToFirstScreen = () => {
    this.setState({
      currentScreen: Screen.first,
    })
  }

  private goToSecondScreen = () => {
    this.setState({
      currentScreen: Screen.second,
    })
  }
}