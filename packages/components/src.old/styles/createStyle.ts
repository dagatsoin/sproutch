import { Styles as RXStyles, Types } from 'reactxp'

export const Styles = RXStyles

export type StyleProp<T> = Types.StyleRuleSetRecursive<Types.StyleRuleSet<T>>

export function toArray(s: StyleProp<any>) {
  return Array.isArray(s) ? s : [s]
}
