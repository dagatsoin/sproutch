import {  withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import markdown from './doc'
import Story from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Radial gradient', Story, { notes: {markdown}})