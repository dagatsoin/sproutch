import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import markdown from './doc'
import renderFunction from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Button', renderFunction as any, { notes: { markdown }})
