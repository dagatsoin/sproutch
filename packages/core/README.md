# Sproutch :poop:

React and React Native iOS/Android library to make lovely (or not) UI.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm version](https://badge.fury.io/js/%40sproutch%2Fui.svg)](https://badge.fury.io/js/%40sproutch%2Fui)
[![Gitter chat](https://badges.gitter.im/sproutch/community.png)](https://gitter.im/sproutch/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)


:construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction:

```
Actually in 0.0.4-beta.7 but already usable. Expect breaking changes in the futur. Tested on:
- Chrome 73
- Safari 12.1.2
- Croswwalk 2.3
- Expo 35
```

:construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction:

## Prerequisites

### Dependencies

Sproutch depends on two peer dependencies:
- ReactXP: the cross plateform base elements library which sproutch is built upon
- ExpoKit: bringing some basic components such `Svg` and `LinearGradient`

**Important note**
- Actually developped with RN **0.57**. No guarantee that newer versions will work. But it may...

### Installation

To install Sproutch and its dependencies:
- If you target a web project:

  `$ npm i @sproutch/ui reactxp`

- If you target an expo project:

  ```
  $ npm i @sproutch/ui reactxp
  $ expo install react-native-svg
  $ expo install expo-linear-gradient
  ```

- If you target raw (without expo) React Native **(I did not test yet, please, fill an issue if it crashes)**

  `$ npm i @sproutch/ui reactxp expo`

  Add [react-native-svg](https://github.com/react-native-community/react-native-svg)
  Add [expo-linear-gradient](https://github.com/expo/expo/tree/master/packages/expo-linear-gradient)

### Usage

```tsx
import { defaultTheme, ThemeContext } from '@sproutch/ui'

render(
  <ThemeContext.Provider value={defaultTheme}>
    <App />
  </ThemeContext.Provider>,
  document.getElementById("react-content")
)
```

## Global theming

Sproutch implements Material Design specs by default. But *some*, (bcz still WIP) components are already **deeply** customizable if you want to bring your own design system.

Sproutch is themable by providing a theme.

ThemeProvider accept a theme object which explained below. The theme shape is heavily inspired by Material UI Theme and stick to the material design specification.

ex: `<ThemeProvider theme={myTheme}>`

```tsx
type Theme<B, O> = {
  shape: {
    borderRadius: number
  }
  palette: {
    type: 'light' | 'dark'
    common: {
      // the value of the deepest and clearest point
      black: string
      white: string
    }
    primary: {
      // the variants of your primary color
      light: string
      main: string
      dark: string
      contrastText: string
    }
    secondary:  {
      // the variants of your secondary color
      light: string
      main: string
      dark: string
      contrastText: string
    }
    text: {
      // The colors of the different text style
      primary: string
      secondary: string
      disabled: string
      hint: string
    }
    divider: string // color of the separation line
    background: {
      // The different background color
      statusBar: string
      appBar: string
      default: string
      paper: string
    },
    state: {
      /* takes object of the shape: OverlayOpacity. Exemple: {
          light: 0.04,
          medium: 0.12,
          dark: 0.16,
        }
      */
      hover: hoverOverlayOpacity,
      focus: focusOverlayOpacity,
      selected: selectedOverlayOpacity,
      activated: activatedOverlayOpacity,
      pressed: pressedOverlayOpacity,
      draged: dragedOverlayOpacity,
    },
  }
  // The 'rythme' of your design system
  spacing: number
  business: {
    // A customizable slot where you can put
    // any value regarding your graphic chart
    // eg. third colors, info color scheme...
    // The default theme provide already provides
    // some colors helpers that you can override:
    /*
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
  */
  }
  typography: {
    // The base font
    fontFamily: string
    fontSize: number
    fontWeightLight: string
    fontWeightRegular: string
    fontWeightMedium: string
  }
}
```

## Customize component style

Some components (in the futur, all will have) has a `style` property which accepts all stylesheets keys used by the component.

ex: the ProgressBar component can accept an object with those keys:

```tsx
{
  root: ViewStyle
  top: ViewStyle
  background: ViewStyle
  fill: ViewStyle
}
```

## Live demo and components doc

We use Storybook both for Web and Native.
As a cross plateform UI, the API is the same for both Native and Web version. 
You will find the doc for each component in the Note tab of its story:
- For Native: https://expo.io/@dagatsoin/sproutch (only for Android, because Apple does not allow to load external Expo project)
- For Web: https://dagatsoin.github.io/sproutch

## Contribution

PRs won't be treated until reaching a stable version and write a clear contribution guidance first.

If you find a bug, please fill an issue. I am also on [Gitter to chat](https://gitter.im/sproutch/community).
