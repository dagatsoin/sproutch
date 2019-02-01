import * as React from 'react'
import { ThemeContext } from './theme'

type AnyComponent<P = any> =
  | (new (props: P) => React.Component)
  | ((
      props: P & { children?: React.ReactNode }
    ) => React.ReactElement<P> | null)
/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */
type ConsistentWith<T, U> = Pick<U, keyof T & keyof U>

/**
 * Like `T & U`, but using the value types from `U` where their properties overlap.
 *
 * @internal
 */
type Overwrite<T, U> = Omit<T, keyof U> & U

/**
 * Remove properties `K` from `T`.
 *
 * @internal
 */
type Omit<T, K extends keyof any> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never

type WithTheme = <T>() => <P extends ConsistentWith<P, InjectedTheme<T>>>(
  component: AnyComponent<P & InjectedTheme<T>>,
) => React.ComponentType<Overwrite<P, InjectedTheme<T>>>

export interface InjectedTheme<T> {
  theme?: T // todo make this injected props non optional
}

export const withTheme: WithTheme = () => (Component: React.ComponentClass<any, any>) => (
  props: any
) => {
  const { innerRef, ...rest } = props

  return (
    <ThemeContext.Consumer>
      {theme => <Component theme={theme} ref={innerRef} {...rest} />}
    </ThemeContext.Consumer>
  )
}
