import { StyleObject, Styles, ViewStyle } from 'sproutch'

export type PaperStyle = {
  shadowWeb: StyleObject<ViewStyle>
  shadowMobile: StyleObject<ViewStyle>
  shadow0: StyleObject<ViewStyle>
  shadow1: StyleObject<ViewStyle>
  shadow2: StyleObject<ViewStyle>
}

export const styles = {
  shadowContainer: Styles.createViewStyle({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }),
  roundBorder: Styles.createViewStyle({
    borderRadius: 2
  })
}

// credit to Material UI
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/shadows.js

const shadowKeyUmbraOpacity = 0.2
const shadowKeyPenumbraOpacity = 0.14
const shadowAmbientShadowOpacity = 0.12

function createWebShadow(...px: number[]) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`,
  ].join(',')
}

function createNativeShadows(...px: number[]) {
  return [{
    shadowColor: `rgba(0,0,0,${shadowKeyUmbraOpacity})`,
    shadowOffset: { height: px[0], width: px[1] },
    shadowRadius: px[2],
  }, {
    shadowColor: `rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    shadowOffset: { height: px[4], width: px[5] },
    shadowRadius: px[6],
  }, {
    shadowColor: `rgba(0,0,0,${shadowAmbientShadowOpacity})`,
    shadowOffset: { height: px[8], width: px[9] },
    shadowRadius: px[10],
  }]
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
    createNativeShadows(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1),
    createNativeShadows(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2),
    createNativeShadows(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2),
    createNativeShadows(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    createNativeShadows(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    createNativeShadows(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    createNativeShadows(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    createNativeShadows(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    createNativeShadows(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    createNativeShadows(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    createNativeShadows(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    createNativeShadows(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    createNativeShadows(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    createNativeShadows(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    createNativeShadows(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    createNativeShadows(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    createNativeShadows(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    createNativeShadows(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    createNativeShadows(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    createNativeShadows(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    createNativeShadows(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    createNativeShadows(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    createNativeShadows(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    createNativeShadows(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ]
}