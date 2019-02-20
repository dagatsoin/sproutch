// @credit https://github.com/chodorowicz/ts-debounce/blob/master/src/index.ts
/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: any[]) => void

export type Options = {
  isImmediate: boolean
}

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds: number = 50,
  isImmediate?: boolean
): F {
  let timeoutId: any

  return function(this: any, ...args: any[]) {
    // tslint:disable-next-line: no-this-assignment
    const context = this

    const doLater = function() {
      timeoutId = undefined
      if (!isImmediate) {
        func.apply(context, args)
      }
    }

    const shouldCallNow = isImmediate && timeoutId === undefined

    if (timeoutId !== undefined) {
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
    const context = this

    // The function has already been launched, it is a recall
    if (timeoutId) {
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
  nextProps: any,
  nextState: any,
  currentProps: any,
  currentState: any
): boolean {
  // Extract the style for a deeper comparaison.
  const { style: nextStyle, ...otherProps } = nextProps
  return (
    // Did props change
    Object.keys(otherProps).some(
      key => otherProps[key] !== currentProps[key]
    ) ||
    // if the style is removed
    (nextStyle === undefined && currentProps.style !== undefined) ||
    // or the style is added
    (nextStyle !== undefined && currentProps.style === undefined) ||
    // or the style is changed
    (nextStyle !== undefined &&
      currentProps.style !== undefined &&
      Object.keys(nextStyle).some(
        key => nextStyle![key] !== currentProps.style![key]
      )) ||
    // Did the state change
    Object.keys(nextState).some(key => nextState[key] !== currentState[key])
  )
}
