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
