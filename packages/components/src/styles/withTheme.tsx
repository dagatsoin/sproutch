/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { ThemeContext } from './ThemeContext'

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
type PropInjector<InjectedProps, AdditionalProps = Record<string, unknown>> = <
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
export interface ThemedComponentProps extends Partial<InjectedTheme<unknown>> {
  innerRef?: React.Ref<unknown> | React.RefObject<unknown>
}

type WithTheme = PropInjector<InjectedTheme<unknown>, ThemedComponentProps>

export interface InjectedTheme<T> {
  theme: T
}

export const withTheme: WithTheme = Component => (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { innerRef, ...rest } = props

  return (
    <ThemeContext.Consumer>
      {theme => <Component
        theme={theme}
        ref={
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-unsafe-assignment
          innerRef as any
        }
        {...rest}
      />}
    </ThemeContext.Consumer>
  )
}
