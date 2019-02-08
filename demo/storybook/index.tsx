import { getTheme, ThemeContext } from '@sproutch/ui'
import {
  addDecorator,
  configure,
  getStorybookUI,
  RenderFunction,
} from '@storybook/react-native'
import { Font } from 'expo'
import * as React from 'react'
import { ScrollView, StyleSheet as RNStyles } from 'react-native'
import { Platform } from 'reactxp'

import './rn-addons'
import { loadStories } from './storyLoader'

const styles = RNStyles.create({
  contentContainer: {
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
})

// Center the story in the screen
const Center = (storyFn: RenderFunction) => (
  <ScrollView contentContainerStyle={styles.contentContainer}>
    {storyFn()}
  </ScrollView>
)

// Add the Theme provider

const ThemeInjector = (storyFn: RenderFunction) => (
  <ThemeContext.Provider value={getTheme({})}>
    {storyFn()}
  </ThemeContext.Provider>
)

addDecorator(Center)
addDecorator(ThemeInjector)

// import stories
configure(() => {
  loadStories()
}, module)

const GetStoryBookUIRoot = getStorybookUI({})

type State = {
  areAssetLoaded: boolean
}

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
