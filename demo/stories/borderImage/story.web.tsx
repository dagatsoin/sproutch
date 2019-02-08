import {  withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { borderImage } from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Border image', borderImage as any)