import { useEffect, useMemo } from 'react'
import { GestureResponderEvent, StyleProp } from 'react-native'

// @credit https://github.com/chodorowicz/ts-debounce/blob/master/src/index.ts
/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: any[]) => void

export type Options = {
  isImmediate: boolean
}

export const noop = () => null

export function isTouch(e: GestureResponderEvent): boolean {
  return 'touches' in e.nativeEvent
}

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds: number = 50,
  isImmediate?: boolean
): F {
  let timeoutId: any

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return function(this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-this-alias
    const context = this

    const doLater = function() {
      timeoutId = undefined
      if (!isImmediate) {
        func.apply(context, args)
      }
    }

    const shouldCallNow = isImmediate && timeoutId === undefined

    if (timeoutId !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(doLater, waitMilliseconds)

    if (shouldCallNow) {
      func.apply(context, args)
    }
  } as any
}

export function recall<F extends Procedure>(
  func: F,
  computeArg: (iteration: number, ...args: any[]) => any[],
  timeout: number = 16
): F {
  let timeoutId: any
  let iteration = 0

  return function(this: any, ...args: any[]) {
    // tslint:disable-next-line: no-this-assignment
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-this-alias
    const context = this

    // The function has already been launched, it is a recall
    if (timeoutId) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      clearTimeout(timeoutId)
      iteration++
    }

    // (Re)launch the timeout
    timeoutId = setTimeout(() => {
      timeoutId = undefined
      iteration = 0
    }, timeout)

    // Compute the new arg with the current iteration
    const newArg = computeArg(iteration, args)

    // Execute the function
    func.apply(context, newArg)
  } as F
}

/**
 * This makes a shallow comparaison of the state and other props than style and a deep comparaison of the style prop.
 */
export function shouldComponentUpdate(
  nextProps: object & { style?: StyleProp<any> },
  nextState: any,
  currentProps: any,
  currentState: any
): boolean {
  // Extract the style for a deeper comparaison.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { style: nextStyle, ...otherProps } = nextProps
  return (
    // Did props change
    Object.keys(otherProps).some(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      key => otherProps[key as keyof typeof otherProps] !== currentProps[key as keyof typeof currentProps]
    ) ||
    // if the style is removed
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (nextStyle === undefined && currentProps.style !== undefined) ||
    // or the style is added
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (nextStyle !== undefined && currentProps.style === undefined) ||
    // or the style is changed
    (nextStyle !== undefined &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      currentProps.style !== undefined &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.keys(nextStyle).some(key =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof nextStyle[key] === 'object'
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          ? Object.keys(nextStyle[key]).some(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              k => nextStyle[k] !== currentProps.style![k]
            )
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          : nextStyle[key] !== currentProps.style![key]
      )) ||
    // Did the state change
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    Object.keys(nextState).some(key => nextState[key] !== currentState[key])
  )
}

export function componentWillMount(cb: () => void) {
  return useMemo(cb, [])
}

export function componentDidMount(cb: () => void) {
  return useEffect(cb, [])
}

export function componentWillUnmount(cb: () => void) {
  return useEffect(() => cb, [])
}