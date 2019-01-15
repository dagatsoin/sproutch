import React from 'react'
import { ScrollView, StyleSheet as RNStyles } from 'react-native'
import { Platform } from 'reactxp'
import { Font } from 'expo'
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native'

import { ThemeContext, getTheme } from '../'
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
    alignItems: 'center'
  }
})

// Center the story in the screen
const Center = (storyFn: Function) => (
  <ScrollView
    contentContainerStyle={styles.contentContainer}
    >
    {storyFn()}
  </ScrollView>
)

// Add the Theme provider

const ThemeInjector = (storyFn: Function) => (
  <ThemeContext.Provider value={getTheme({})}>
    { storyFn() }
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
  state: State = {
    areAssetLoaded: false
  }
  
  async componentDidMount() {
    switch(Platform.getType()) {
      case 'ios':
        await Font.loadAsync({
          'Roboto': require('../assets/fonts/roboto/Roboto-Regular.ttf'),
          'FontAwesome': require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
        })
        
        this.setState({
          areAssetLoaded: true
        })
        break
      
      case 'android':
      await Font.loadAsync({
        'FontAwesome': require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
      })
      
      default:
        this.setState({
          areAssetLoaded: true
        })
    }
  }

  get isReady(): boolean {
    const { areAssetLoaded } = this.state
    return areAssetLoaded
  }

  render() {
    return this.isReady
      ? <GetStoryBookUIRoot/>
      : <></>
  }
}