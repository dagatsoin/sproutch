import { GestureResponderEvent } from 'react-native'

export interface IEmitter {
  onPressIn: (e: GestureResponderEvent) => void
  onPressOut: (e: GestureResponderEvent) => void
}
