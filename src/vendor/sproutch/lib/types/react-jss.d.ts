declare module 'react-jss' {
  import { Theme } from 'sproutch'
  import * as React from 'react'

  type AnyComponent<P = any> =
    | (new (props: P) => React.Component)
    | ((props: P & { children?: React.ReactNode }) => React.ReactElement<P> | null);

  /**
   * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
   * `U`, their value types do not conflict.
   *
   * @internal
   */
  type ConsistentWith<T, U> = Pick<U, keyof T & keyof U>;

  /**
  * Like `T & U`, but using the value types from `U` where their properties overlap.
  *
  * @internal
  */
  type Overwrite<T, U> = Omit<T, keyof U> & U;

  /**
   * Remove properties `K` from `T`.
   *
   * @internal
   */
  type Omit<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

  export interface InjectedSheetProps {
    classes: { [ k in string ]: string };
  }

  export const injectSheet: (style: {}) => <P extends ConsistentWith<P, InjectedSheetProps>>(
    component: AnyComponent<P & InjectedSheetProps>,
  ) => React.ComponentType<Overwrite<P, Partial<InjectedSheetProps>>>;

  export interface InjectedTheme<T> {
    theme: T
  }  

  export const withTheme: <T>() => <P extends ConsistentWith<P, InjectedTheme<T>>>(
    component: AnyComponent<P & InjectedTheme<T>>,
  ) => React.ComponentType<Overwrite<P, InjectedTheme<T>>>

  export interface MuiThemeProviderProps {
    theme: {} | ((outer: {} | null) => {})
    children: React.ReactNode
  }

  export const ThemeProvider: React.ComponentType<MuiThemeProviderProps>

  export default injectSheet;
}