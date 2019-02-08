import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'

import markdown from './doc'
import { backgroundImage } from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Background image', backgroundImage as any, {
    notes: { markdown },
  })
