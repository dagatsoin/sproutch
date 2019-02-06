import * as React from 'react'
import { configure, addDecorator } from '@storybook/react'

import { ThemeContext } from '@sproutch/sproutch'
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf'

import { defaultTheme as theme } from '@sproutch/sproutch'

const fontAwesomeStyle = `@font-face {
  src: url(${fontAwesome});
  font-family: FontAwesome;
}`

// Create stylesheet
const faStyleEl = document.createElement('style');

faStyleEl.type = 'text/css';

if (faStyleEl.styleSheet) {
  faStyleEl.styleSheet.cssText = fontAwesomeStyle;
} else {
  faStyleEl.appendChild(document.createTextNode(fontAwesomeStyle));
}

// Inject stylesheet
document.head.appendChild(faStyleEl);

// Center the story in the screen
const Center = (storyFn) => (
  <div
    style={{
      flexGrow: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-around',
      display: 'flex',
      height: '100vh',
      alignItems: 'center'
    }}>
    {storyFn()}
  </div>
)

// Add the Theme provider

const ThemeInjector = (storyFn) => (
  <ThemeContext.Provider value={theme}>
    { storyFn() }
  </ThemeContext.Provider>
)

addDecorator(Center)
addDecorator(ThemeInjector)

const stories = require.context('../stories', true, /story.web.tsx?$/)

function loadStories() {
  stories.keys().forEach( filename => stories(filename))
}

configure(loadStories, module)
