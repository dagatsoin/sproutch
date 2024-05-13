import { StyleSheet, ViewStyle } from "react-native"

export function createGridStyle(padding: number, style?: ViewStyle) {
  return StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      padding: padding / 2,
      ...style,
    }
  })
}

export function createItemContainerStyle(
  height: number,
  width: number,
  padding: number
) {
  return StyleSheet.create({
    root: {
      height,
      width,
      flexShrink: 1,
      padding: padding / 2,
      alignItems: 'stretch',
    }
  })
}

export const imageContainer = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch',
  }
})

export const bottomContainer = StyleSheet.create({
  root: {
    minHeight: 28,
    justifyContent: 'flex-end',
  }
})
