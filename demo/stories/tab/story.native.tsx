import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import renderFunction from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Tabs', renderFunction as any)