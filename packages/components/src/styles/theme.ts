import * as React from 'react'
import { Color, colors } from './colors'
import deepmerge from 'lodash.merge'
import { Overridables } from '../components/Overridables'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

export type Typography = {
  fontFamily: string
  fontSize: number
  fontWeightLight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightRegular:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightMedium:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
}

export type ThemeConfig<B, O extends Partial<Overridables> = never> = Partial<{
  shape: Shape
  palette: Partial<Palette>
  spacing: number
  business: B
  overrides: O
  typography: Partial<Typography>
}>

export type Theme<B, O extends Partial<Overridables> = Partial<Overridables>> = {
  shape: Shape
  palette: Palette
  spacing: number
  business: Status & B
  overrides: O
  typography: Typography
}

export type Shape = {
  borderRadius: number
}

export type PaletteIntention = Partial<PaletteColor>

export type Palette = {
  common: CommonColors
  type: PaletteType
  contrastThreshold: number
  tonalOffset: number
  primary: PaletteColor
  secondary: PaletteColor
  grey: Color
  text: Text
  divider: Divider
  modifier: Modifier
  background: Background
  state: {
    hover: OverlayOpacity
    focus: OverlayOpacity
    selected: OverlayOpacity
    activated: OverlayOpacity
    pressed: OverlayOpacity
    draged: OverlayOpacity
  }
}

type CommonColors = {
  black: string
  white: string
}

type PaletteType = 'light' | 'dark'

export type PaletteColor = {
  light: string
  main: string
  dark: string
  contrastText: string
}

type Background = {
  statusBar: string
  appBar: string
  default: string
  paper: string
}

type Divider = string

type Text = {
  primary: string
  secondary: string
  disabled: string
  hint: string
}

type Modifier = {
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  disabled: string
  disabledBackground: string
}

type Status = {
  error: PaletteColor
  valid: PaletteColor
  warning: PaletteColor
}

export type DefaultTheme = Theme<Status>

export type OverlayOpacity = {
  light: number
  medium: number
  dark: number
}

const lightBackground = {
  statusBar: colors.grey[300],
  appBar: colors.grey[100],
  default: colors.grey[50],
  paper: colors.white,
}

const darkBackground = {
  statusBar: colors.black,
  appBar: colors.grey[900], // #212121
  default: colors.grey['A400'], // #333
  paper: colors.grey[800], // #424242
}

const hoverOverlayOpacity: OverlayOpacity = {
  light: 0.08,
  medium: 0.06,
  dark: 0.04,
}

const focusOverlayOpacity: OverlayOpacity = {
  light: 0.32,
  medium: 0.24,
  dark: 0.12,
}

const selectedOverlayOpacity: OverlayOpacity = {
  light: 0.16,
  medium: 0.12,
  dark: 0.08,
}

const activatedOverlayOpacity: OverlayOpacity = {
  light: 0.12,
  medium: 0.24,
  dark: 0.36,
}

const pressedOverlayOpacity: OverlayOpacity = {
  light: 0.16,
  medium: 0.32,
  dark: 0.48,
}

const dragedOverlayOpacity: OverlayOpacity = {
  light: 0.8,
  medium: 0.16,
  dark: 0.32,
}

const defaultTypography: Typography = {
  fontFamily: 'Roboto',
  fontSize: 14,
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
}

const defaultDarkPalette: Palette = {
  common: {
    black: '#000',
    white: '#fff'
  },
  type: 'dark',
  primary: {
    light: '#ffc233',
    main: '#ffb300',
    dark: '#b27d00',
    contrastText: '#fff'
  },
  secondary: {
    light: '#CE4DBF',
    main: '#b900a4',
    dark: '#AA0092',
    contrastText: '#fff'
  },
  grey: colors.grey,
  text: {
    primary: 'rgba(159, 155, 143, 1)',
    secondary: 'rgba(159, 155, 143, 0.7)',
    disabled: 'rgba(159, 155, 143, 0.5)',
    hint: 'rgba(159, 155, 143, 0.5)'
  },
  background: darkBackground,
  divider: 'rgba(255, 255, 255, 0.12)',
  modifier: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(0, 0, 0, 0.14)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)'
  },
  state: {
    hover: hoverOverlayOpacity,
    focus: focusOverlayOpacity,
    selected: selectedOverlayOpacity,
    activated: activatedOverlayOpacity,
    pressed: pressedOverlayOpacity,
    draged: dragedOverlayOpacity,
  },
  contrastThreshold: 3,
  tonalOffset: 0.2
}

const defaultLightPalette: Palette = {
  common: {
    black: colors.black,
    white: colors.white,
  },
  type: 'light',
  primary: {
    light: colors.indigo['300'], // #6573c3
    main: colors.indigo['500'], // #3f51b5
    dark: colors.indigo['700'], // #2c387e
    contrastText: colors.white, // #ffffff
  },
  secondary: {
    light: colors.pink['A200'], // #f73378
    main: colors.pink['A400'], // #f50057
    dark: colors.pink['A700'], // #ab003c
    contrastText: colors.white, // #ffffff
  },
  grey: colors.grey,
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  background: lightBackground,
  divider: 'rgba(0, 0, 0, 0.12)',
  modifier: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(0, 0, 0, 0.14)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
  state: {
    hover: hoverOverlayOpacity,
    focus: focusOverlayOpacity,
    selected: selectedOverlayOpacity,
    activated: activatedOverlayOpacity,
    pressed: pressedOverlayOpacity,
    draged: dragedOverlayOpacity,
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
}

export const defaultTheme: DefaultTheme = {
  shape: {
    borderRadius: 4,
  },
  palette: defaultLightPalette,
  spacing: 8,
  typography: defaultTypography,
  overrides: {},
  business: {
    error: {
      light: colors.red['300'], // #e57373,
      main: colors.red['500'], // #f44336,
      dark: colors.red['700'], // #d32f2f,
      contrastText: colors.white, // #fff
    },
    valid: {
      light: colors.green['300'], // #81c784  ,
      main: colors.green['500'], // #4caf50,
      dark: colors.green['700'], // #388e3c,
      contrastText: colors.white, // #fff
    },
    warning: {
      light: colors.orange['300'], // #ffb74d
      main: colors.orange['500'], // #ff9800
      dark: colors.orange['700'], // #f57c00
      contrastText: colors.white, // #fff
    },
  },
}

// As the theme is global, we can prevent a computation for each component
export function getTheme<B, O extends Overridables = never>(
  config: ThemeConfig<B, O>
): Theme<Status & B, O> {
  return deepmerge(defaultTheme, config) as Theme<Status & B, O> // fixme: why need to force the output type?
}

export type NamedStyles<T extends string | number | symbol> = Record<T, ViewStyle | TextStyle | ImageStyle>;

export function override<C extends Partial<Overridables>, K extends keyof Overridables, S extends keyof Overridables[K]>(
  overrides: C,
  compName: K,
  slot: S
): NamedStyles<S> | undefined {
  return (overrides[compName])?.[slot] as NamedStyles<S>
}

export function createThemeContext<T = DefaultTheme>(theme: T) {
  return React.createContext<T>(theme)
}
