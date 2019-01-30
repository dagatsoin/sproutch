import { storiesOf } from '@storybook/react'
import {  withKnobs } from '@storybook/addon-knobs'

import { backgroundImage, ninePatches } from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Background image', backgroundImage as any)
  .add('Nine patches', ninePatches as any)