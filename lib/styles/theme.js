import deepmerge from 'deepmerge';
import * as React from 'react';
import { colors } from './colors';
export const lightBackground = {
    statusBar: colors.grey[300],
    appBar: colors.grey[100],
    default: colors.grey[50],
    paper: colors.white
};
export const darkBackground = {
    statusBar: colors.black,
    appBar: colors.grey[900],
    default: colors.grey['A400'],
    paper: colors.grey[800] // #424242
};
export const darkShadow = {
    hover: .04,
    focus: .12,
    press: .16,
    selected: .08,
    activated: .12
};
export const lightShadow = {
    hover: .08,
    focus: .24,
    press: .32,
    selected: .16,
    activated: .24
};
const defaultTypography = {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
};
const defaultPalette = {
    common: {
        black: colors.black,
        white: colors.white,
    },
    type: 'light',
    primary: {
        light: colors.indigo['300'],
        main: colors.indigo['500'],
        dark: colors.indigo['700'],
        contrastText: colors.white,
    },
    secondary: {
        light: colors.pink['A200'],
        main: colors.pink['A400'],
        dark: colors.pink['A700'],
        contrastText: colors.white,
    },
    grey: colors.grey,
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)'
    },
    background: lightBackground,
    divider: 'rgba(0, 0, 0, 0.12)',
    modifier: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.08)',
        hoverOpacity: 0.08,
        selected: 'rgba(0, 0, 0, 0.14)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
};
// As the theme is global, we can prevent a computation for each component
export function getTheme(config) {
    return deepmerge(defaultTheme, config); // fixme: why need to force the output type?
}
export const defaultTheme = {
    shape: {
        borderRadius: 4,
    },
    palette: defaultPalette,
    spacing: 8,
    typography: defaultTypography,
    overrides: {},
    business: {
        error: {
            light: colors.red['300'],
            main: colors.red['500'],
            dark: colors.red['700'],
            contrastText: colors.white,
        },
        valid: {
            light: colors.green['300'],
            main: colors.green['500'],
            dark: colors.green['700'],
            contrastText: colors.white,
        },
        warning: {
            light: colors.orange['300'],
            main: colors.orange['500'],
            dark: colors.orange['700'],
            contrastText: colors.white,
        }
    },
};
export function override(overrides, compName, rule) {
    return overrides && overrides[compName] && overrides[compName][rule]
        ? overrides[compName][rule]
        : undefined;
}
export const ThemeContext = React.createContext(defaultTheme);
//# sourceMappingURL=theme.js.map