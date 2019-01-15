import { storiesOf } from '@storybook/react-native'
import { withKnobs } from '@storybook/addon-knobs'

import renderFunction from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Tabs', renderFunction as any)