import * as React from 'react'
import { Color, colors } from './colors'
// tslint:disable-next-line: no-var-requires
const deepmerge = require('lodash.merge')

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

export type ThemeConfig<B, O> = Partial<{
  shape: Shape
  palette: Partial<Palette>
  spacing: number
  business: B
  overrides: O
  typography: Partial<Typography>
}>

export type Theme<B, O> = {
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

export type DefaultTheme = Theme<Status, {}>

export const lightBackground = {
  statusBar: colors.grey[300],
  appBar: colors.grey[100],
  default: colors.grey[50],
  paper: colors.white,
}

export const darkBackground = {
  statusBar: colors.black,
  appBar: colors.grey[900], // #212121
  default: colors.grey['A400'], // #333
  paper: colors.grey[800], // #424242
}

export const darkShadow = {
  hover: 0.04,
  focus: 0.12,
  press: 0.16,
  selected: 0.08,
  activated: 0.12,
}

export const lightShadow = {
  hover: 0.08,
  focus: 0.24,
  press: 0.32,
  selected: 0.16,
  activated: 0.24,
}

const defaultTypography: Typography = {
  fontFamily: 'Roboto',
  fontSize: 14,
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
}

const defaultPalette: Palette = {
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
  contrastThreshold: 3,
  tonalOffset: 0.2,
}

export const defaultTheme: DefaultTheme = {
  shape: {
    borderRadius: 4,
  },
  palette: defaultPalette,
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
export function getTheme<B, O>(
  config: ThemeConfig<B, O>
): Theme<Status & B, O> {
  return deepmerge(defaultTheme, config) as Theme<Status & B, O> // fixme: why need to force the output type?
}

type Overridable = 'progressBar' | 'tab' | 'tabs' | 'sceneTransition' | 'button' // @todo: decouple from component name

export function override<C extends Overridable, T>(
  overrides: any,
  compName: C,
  rule: keyof T
) {
  return overrides && overrides[compName] && overrides[compName][rule]
    ? overrides[compName][rule]
    : undefined
}

export const ThemeContext = React.createContext<Theme<Status & {}, {}>>(
  defaultTheme
)
