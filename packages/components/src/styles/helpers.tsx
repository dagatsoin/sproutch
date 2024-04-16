import { colorManipulator } from './colorManipulator'
import { Theme } from './theme'

import { StyleSheet } from 'react-native'

export function getMaterialOverlayColor({
  isOnPaper,
  palette,
  theme,
}: {
  isOnPaper: boolean
  palette?: 'primary' | 'secondary'
  theme: Theme<any, any>
}) {
  return isOnPaper
    ? // The container used the paper background
      palette
      ? theme.palette[palette].main
      : theme.palette.type === 'light'
      ? '#000'
      : '#fff'
    : // The primary color is used as the container background
    colorManipulator.getLuminance(theme.palette[palette || 'primary'].main) >=
      0.5
    ? '#000'
    : '#fff'
}

export function getHoverOverlayOpacity(color: string, theme: Theme<any, any>) {
  const hoverOverlayOpacity = theme.palette.state.hover
  const overlayLuminance = colorManipulator.getLuminance(color)
  return overlayLuminance < 0.3
    ? hoverOverlayOpacity.dark
    : overlayLuminance < 0.7
    ? hoverOverlayOpacity.medium
    : hoverOverlayOpacity.light
}

export const fitParent = StyleSheet.create({
  root: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
})