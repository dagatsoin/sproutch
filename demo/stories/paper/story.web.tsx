import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Story from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Paper', Story)