import * as React from 'react'
import { Types } from 'reactxp'

import { ThemeContext } from '../../styles'
import { Shadow } from '../shadow/index.native'
import { View } from '../view'
import { PaperProps } from './PaperProps'
import { nativePaperStyle, shadows } from './style'

type State = {
  width: number
  height: number
}

export default class Paper extends React.Component<PaperProps, State> {
  public childRef: View

  public state: State = {
    width: 0,
    height: 0,
  }

  public onLayout = ({ width, height }: Types.ViewOnLayoutEvent) => {
    if (!this.state.width) this.setState({ width, height })
  }

  public render() {
    const { elevation, style = {}, ...props } = this.props
    const { width, height } = this.state
    const borderRadius =
      (style && style.root && style.root['borderRadius']) || 0
    const nativeShadows =
      !!elevation && elevation > 0
        ? shadows.native[elevation - 1](width, height, borderRadius)
        : []
    return (
      <ThemeContext.Consumer>
        {theme => {
          const styles = nativePaperStyle(theme, style, borderRadius)
          return (
            <View onLayout={this.onLayout} style={styles.root}>
              {nativeShadows.map((shadowProps, index) => (
                <Shadow
                  key={index}
                  style={styles.nativeShadowContainer}
                  {...shadowProps}
                />
              ))}
              <View style={styles.content} {...props} />
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
