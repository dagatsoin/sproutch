import { Types } from 'reactxp'

export interface IEmitter {
  onPressIn: (e: Types.SyntheticEvent) => void
  onPressOut: (e: Types.SyntheticEvent) => void
}
