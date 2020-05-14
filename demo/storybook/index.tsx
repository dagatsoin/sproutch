import { getTheme, Styles, ThemeContext } from '@sproutch/ui'
import {
  addDecorator,
  configure,
  getStorybookUI,
} from '@storybook/react-native'
import * as Font from 'expo-font'
import * as React from 'react'
import { Platform, ScrollView, View } from 'reactxp'

import './rn-addons'
import { loadStories } from './storyLoader'

const styles = {
  scrollView: Styles.createViewStyle({
    flex: 1
  }),
  contentContainer: Styles.createViewStyle({
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  }),
}

type ScrollViewAutoMinHeightProps = {
  children: React.ReactNode
}

type ScrollViewAutoMinHeightState = {
  minHeight: number
}

class ScrollViewAutoMinHeight extends React.Component<ScrollViewAutoMinHeightProps, ScrollViewAutoMinHeightState> {
  public state: ScrollViewAutoMinHeightState = {
    minHeight: 0
  }

  public render() {
    const { minHeight } = this.state
    return (
      <ScrollView style={styles.scrollView} onLayout={({height}) => this.setState({ minHeight: height})}>
        <View style={[styles.contentContainer, Styles.createViewStyle({minHeight})]}>
          {this.props.children}      
        </View>
      </ScrollView>
    )
  }
}

// Center the story in the screen
const Center = (storyFn) => (
  <ScrollViewAutoMinHeight>
    {storyFn()}      
  </ScrollViewAutoMinHeight>
)

// Add the Theme provider

const ThemeInjector = (storyFn) => (
  <ThemeContext.Provider value={getTheme({})}>
    {storyFn()}
  </ThemeContext.Provider>
)

// addDecorator(Center)
addDecorator(ThemeInjector)

// import stories
configure(() => {
  loadStories()
}, module)

const GetStoryBookUIRoot = getStorybookUI({})

type State = {
  areAssetLoaded: boolean
}

// tslint:disable-next-line: max-classes-per-file
export default class App extends React.Component<{}, {}> {
  public state: State = {
    areAssetLoaded: false,
  }

  public async componentDidMount() {
    switch (Platform.getType()) {
      case 'ios':
        await Font.loadAsync({
          Roboto: require('../assets/fonts/roboto/Roboto-Regular.ttf'),
          FontAwesome: require('../node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
        })

        this.setState({
          areAssetLoaded: true,
        })
        break

      case 'android':
        await Font.loadAsync({
          FontAwesome: require('../node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
        })
        this.setState({
          areAssetLoaded: true,
        })
        break

      default:
        this.setState({
          areAssetLoaded: true,
        })
    }
  }

  get isReady(): boolean {
    const { areAssetLoaded } = this.state
    return areAssetLoaded
  }

  public render() {
    return this.isReady ? <GetStoryBookUIRoot /> : <></>
  }
}
