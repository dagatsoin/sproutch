import {  withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import Story from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Linear gradient', Story)