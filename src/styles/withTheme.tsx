import * as React from 'react'
import { ThemeContext } from './theme'

/**
 * Remove properties `K` from `T`.
 *
 * @internal
 */
export type Omit<T, K extends keyof any> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never

/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */
export type ConsistentWith<DecorationTargetProps, InjectedProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P]
}

/**
 * a function that takes {component} and returns a component that passes along
 * all the props to {component} except the {InjectedProps} and will accept
 * additional {AdditionalProps}
 */
type PropInjector<InjectedProps, AdditionalProps = {}> = <
  C extends React.ComponentType<
    ConsistentWith<React.ComponentProps<C>, InjectedProps>
  >
>(
  component: C
) => React.ComponentType<
  Omit<
    JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
    keyof InjectedProps
  > &
    AdditionalProps
>

// tslint:disable-next-line: interface-name
export interface ThemedComponentProps extends Partial<InjectedTheme<any>> {
  innerRef?: React.Ref<any> | React.RefObject<any>
}

type WithTheme = PropInjector<InjectedTheme<any>, ThemedComponentProps>

export interface InjectedTheme<T> {
  theme: T
}

export const withTheme: WithTheme = Component => (props: any) => {
  const { innerRef, ...rest } = props

  return (
    <ThemeContext.Consumer>
      {theme => <Component theme={theme} ref={innerRef} {...rest} />}
    </ThemeContext.Consumer>
  )
}
