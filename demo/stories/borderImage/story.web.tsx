import {  withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import markdown from './doc'
import { borderImage } from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Nine patches', borderImage as any, {
    notes: { markdown }
  })