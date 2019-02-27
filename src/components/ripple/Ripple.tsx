import * as React from 'react'

import Emitter from './Emitter'

export type RippleProperties = {
  isOnPaper?: boolean
  palette?: 'primary' | 'secondary'
  onRef?: (emitter: Emitter) => void
}

export default ({ onRef, ...props }: RippleProperties) => (
  <Emitter onRef={onRef} options={props} />
)