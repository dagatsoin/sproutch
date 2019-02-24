import { Theme } from '../../styles'
import { StyleProp, Styles } from '../../styles/createStyle'
import { ViewStyle } from '../view'

// TODO: the keylight should be fixed at top
export type PaperStyle = {
  shadowWeb: StyleProp<ViewStyle>
  shadowMobile: StyleProp<ViewStyle>
  shadow0: StyleProp<ViewStyle>
  shadow1: StyleProp<ViewStyle>
  shadow2: StyleProp<ViewStyle>
}

export function nativePaperStyle(theme: Theme<any, any>) {
  return {
    root: Styles.createViewStyle({
      overflow: 'visible',

      backgroundColor: theme.palette.background.paper,
    }),
    isAndroid: Styles.createViewStyle({
      borderWidth: 0,
    }),
    nativeShadowContainer: Styles.createViewStyle({
      overflow: 'visible',
      position: 'absolute',
      right: 0,
      bottom: 0,
    }),
    contentContainer: Styles.createViewStyle({
      flex: 1,
      borderRadius: 4,
      backgroundColor: 'white',
      overflow: 'visible',
    }),
    roundBorder: Styles.createViewStyle({
      borderRadius: 2,
    }),
  }
}

// credit to Material UI
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/shadows.js

const shadowKeyUmbraOpacity = '0.2'
const shadowKeyPenumbraOpacity = '0.14'
const shadowAmbientShadowOpacity = '0.12'

function createWebShadow(...px: number[]) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${
      px[3]
    }px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${
      px[7]
    }px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${
      px[11]
    }px rgba(0,0,0,${shadowAmbientShadowOpacity})`,
  ].join(',')
}

function createNativeShadows(
  width: number,
  height: number,
  hasRoundBorder: boolean,
  ...px: number[]
) {
  // We remove the offset added by react-native-shadow and
  // add the spread value + 1/2 of the blur radius to mimic DOM Shadows layout
  const offsets = [
    px[0] + px[2] - (px[3] + px[2] / 2),
    px[1] + px[2] - (px[3] + px[2] / 2), // key shadow
    px[4] + px[6] - (px[7] + px[6] / 2),
    px[5] + px[6] - (px[7] + px[6] / 2), // key penombra shadow
    px[8] + px[10] - (px[11] + px[10] / 2),
    px[9] + px[10] - (px[11] + px[10] / 2), // ambiant shadow
  ]

  const dimensions = [
    width + 2 * px[3] - px[2],
    height + 2 * px[3] - px[2],
    width + 2 * px[7] - px[6],
    height + 2 * px[7] - px[6],
    width + 2 * px[11] - px[10],
    height + 2 * px[11] - px[10],
  ]
  // border is the equivalent of the DOM box shadow radius
  const borders = [px[2], px[6], px[10]]
  const color = '#000'
  const borderRadius = hasRoundBorder ? 4 : 0

  return [
    shadowKeyUmbraOpacity,
    shadowKeyPenumbraOpacity,
    shadowAmbientShadowOpacity,
  ].map((opacity, i) => ({
    setting: {
      width: dimensions[i * 2],
      height: dimensions[i * 2 + 1],
      color,
      border: borders[i],
      radius: borderRadius,
      opacity,
    },
    style: Styles.createViewStyle({
      left: offsets[i * 2],
      top: offsets[i * 2 + 1],
    }),
  }))
}

export const shadows = {
  web: [
    'none',
    createWebShadow(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1),
    createWebShadow(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2),
    createWebShadow(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2),
    createWebShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    createWebShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    createWebShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    createWebShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    createWebShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    createWebShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    createWebShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    createWebShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    createWebShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    createWebShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    createWebShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    createWebShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    createWebShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    createWebShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    createWebShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    createWebShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    createWebShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    createWebShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    createWebShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    createWebShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    createWebShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  native: [
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        1,
        3,
        0,
        0,
        1,
        1,
        0,
        0,
        2,
        1,
        -1
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        1,
        5,
        0,
        0,
        2,
        2,
        0,
        0,
        3,
        1,
        -2
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        1,
        8,
        0,
        0,
        3,
        4,
        0,
        0,
        3,
        3,
        -2
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        2,
        4,
        -1,
        0,
        4,
        5,
        0,
        0,
        1,
        10,
        0
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        3,
        5,
        -1,
        0,
        5,
        8,
        0,
        0,
        1,
        14,
        0
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        3,
        5,
        -1,
        0,
        6,
        10,
        0,
        0,
        1,
        18,
        0
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        4,
        5,
        -2,
        0,
        7,
        10,
        1,
        0,
        2,
        16,
        1
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        5,
        5,
        -3,
        0,
        8,
        10,
        1,
        0,
        3,
        14,
        2
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        5,
        6,
        -3,
        0,
        9,
        12,
        1,
        0,
        3,
        16,
        2
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        6,
        6,
        -3,
        0,
        10,
        14,
        1,
        0,
        4,
        18,
        3
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        6,
        7,
        -4,
        0,
        11,
        15,
        1,
        0,
        4,
        20,
        3
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        7,
        8,
        -4,
        0,
        12,
        17,
        2,
        0,
        5,
        22,
        4
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        7,
        8,
        -4,
        0,
        13,
        19,
        2,
        0,
        5,
        24,
        4
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        7,
        9,
        -4,
        0,
        14,
        21,
        2,
        0,
        5,
        26,
        4
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        8,
        9,
        -5,
        0,
        15,
        22,
        2,
        0,
        6,
        28,
        5
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        8,
        10,
        -5,
        0,
        16,
        24,
        2,
        0,
        6,
        30,
        5
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        8,
        11,
        -5,
        0,
        17,
        26,
        2,
        0,
        6,
        32,
        5
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        9,
        11,
        -5,
        0,
        18,
        28,
        2,
        0,
        7,
        34,
        6
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        9,
        12,
        -6,
        0,
        19,
        29,
        2,
        0,
        7,
        36,
        6
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        10,
        13,
        -6,
        0,
        20,
        31,
        3,
        0,
        8,
        38,
        7
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        10,
        13,
        -6,
        0,
        21,
        33,
        3,
        0,
        8,
        40,
        7
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        10,
        14,
        -6,
        0,
        22,
        35,
        3,
        0,
        8,
        42,
        7
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        11,
        14,
        -7,
        0,
        23,
        36,
        3,
        0,
        9,
        44,
        8
      ),
    (elWidth: number, elHeight: number) =>
      createNativeShadows(
        elWidth,
        elHeight,
        true,
        0,
        11,
        15,
        -7,
        0,
        24,
        38,
        3,
        0,
        9,
        46,
        8
      ),
  ],
}
