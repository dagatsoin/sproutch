import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import markdown from './doc'
import Story from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('List', Story, { notes: { markdown }})