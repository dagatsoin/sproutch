import { Theme } from '../../styles'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

export type PaperStyle = {
  root: ViewStyle
  content: ViewStyle
}

type ShadowProps = {
  shadowColor: string
  shadowOffset: {
    width: number
    height: number
  }
  shadowOpacity: number
  shadowRadius: number
}

export type PaperStyleOverride = Partial<PaperStyle>

// TODO: the keylight should be fixed at top
type NativePaperStyle = {
  nativeShadowContainer: StyleProp<ViewStyle>
  isAndroid: StyleProp<ViewStyle>
} & PaperStyle

export function nativePaperStyle(
  theme: Theme<any, any>,
  style: PaperStyleOverride,
  borderRadius: number
): NativePaperStyle {
  return StyleSheet.create({
    root: {
      overflow: 'visible',
      ...((style && style.root) as object),
    },
    isAndroid: {
      borderWidth: 0,
    },
    nativeShadowContainer: {
      overflow: 'visible',
      position: 'absolute',
      right: 0,
      bottom: 0,
      borderRadius,
    },
    content: {
      flex: 1,
      backgroundColor: theme.palette.background.paper,
      overflow: 'hidden',
      borderRadius,
      ...((style && style.content) as object),
    },
  })
}

export function createWebPaperStyle(theme: Theme<unknown>) {
  return StyleSheet.create({
    root: {
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    }
  })
}

// Higly inspired from Material UI
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/shadows.js

const shadowKeyUmbraOpacity = '0.2'
const shadowKeyPenumbraOpacity = '0.14'
const shadowAmbientShadowOpacity = '0.12'

function createWebElevationShadows(...px: number[]) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`,
  ].join(',')
}

function createIOSElevationShadows(...px: number[]): ShadowProps {
  const shadowColor = '#000'
  return {
    shadowColor,
    shadowOffset: {
      width: px[0],
      height: px[1],
    },
    shadowOpacity: Number(shadowKeyUmbraOpacity),
    shadowRadius: px[2],
  }
}

export const shadows = {
  web: [
    'none',
    createWebElevationShadows(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1),
    createWebElevationShadows(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2),
    createWebElevationShadows(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2),
    createWebElevationShadows(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    createWebElevationShadows(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    createWebElevationShadows(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    createWebElevationShadows(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    createWebElevationShadows(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    createWebElevationShadows(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    createWebElevationShadows(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    createWebElevationShadows(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    createWebElevationShadows(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    createWebElevationShadows(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    createWebElevationShadows(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    createWebElevationShadows(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    createWebElevationShadows(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    createWebElevationShadows(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    createWebElevationShadows(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    createWebElevationShadows(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    createWebElevationShadows(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    createWebElevationShadows(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    createWebElevationShadows(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    createWebElevationShadows(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    createWebElevationShadows(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  native: [
    createIOSElevationShadows(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1),
    createIOSElevationShadows(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2),
    createIOSElevationShadows(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2),
    createIOSElevationShadows(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    createIOSElevationShadows(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    createIOSElevationShadows(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    createIOSElevationShadows(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    createIOSElevationShadows(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    createIOSElevationShadows(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    createIOSElevationShadows(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    createIOSElevationShadows(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    createIOSElevationShadows(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    createIOSElevationShadows(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    createIOSElevationShadows(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    createIOSElevationShadows(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    createIOSElevationShadows(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    createIOSElevationShadows(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    createIOSElevationShadows(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    createIOSElevationShadows(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    createIOSElevationShadows(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    createIOSElevationShadows(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    createIOSElevationShadows(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    createIOSElevationShadows(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    createIOSElevationShadows(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
}
