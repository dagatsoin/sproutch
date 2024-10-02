import * as React from 'react'

import { ThemeContext } from '../../styles/ThemeContext'
import { PaperProps } from './PaperProps'
import { nativePaperStyle, shadows } from './style'
import { DimensionValue, LayoutChangeEvent, View } from 'react-native'

type State = {
  width?: DimensionValue
  height?: DimensionValue
}

export default class Paper extends React.Component<PaperProps, State> {
  public childRef?: View

  public state: State = {}

  public onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    if (!this.state.width) this.setState({ width, height })
  }

  constructor(props: PaperProps) {
    super(props)
    const { style = {} } = props
    const width = style?.root?.["width"]
    const height = style?.root?.["height"]
    this.state = {
      width,
      height,
    }
  }

  public render() {
    const { elevation, style = {}, ...props } = this.props
    const { width, height } = this.state
    const borderRadius = style?.root?.['borderRadius'] as number || 0
    const shadow =
      !!elevation &&
      elevation > 0 &&
      width !== undefined &&
      height !== undefined
        ? shadows.native[elevation - 1]
        : []

    return (
      <ThemeContext.Consumer>
        {theme => {
          const styles = nativePaperStyle(theme, style, borderRadius)
          return (
            <View
              onLayout={this.onLayout}
              style={[styles.root, shadow]}
              {...props}
            >
              <View style={styles.content} {...props} />
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
