import * as React from 'react'

import { ThemeContext } from '../../styles/ThemeContext'
import { PaperProps } from './PaperProps'
import { nativePaperStyle, shadows } from './style'
import { View } from 'react-native'

export default function Paper(props: PaperProps) {
  const { elevation, style = {}, ...otherProps } = props
  const borderRadius = style?.root?.['borderRadius'] as number || 0
  const shadow = !!elevation && elevation > 0
      ? shadows.native[elevation - 1]
      : []

  return <ThemeContext.Consumer>
    {theme => {
      const styles = nativePaperStyle(theme, style, borderRadius)
      return (
        <View
          style={[styles.root, {boxShadow: shadow}]}
          {...otherProps}
        >
          <View style={styles.content} {...otherProps} />
        </View>
      )
    }}
  </ThemeContext.Consumer>
}
