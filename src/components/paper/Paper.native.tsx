import * as React from 'react'
import { Types } from 'reactxp'

import { ThemeContext } from '../../styles'
import { Elevation } from '../elevation/index.native'
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
    const { elevation, style, ...props } = this.props
    const { width, height } = this.state
    const nativeShadows =
      !!elevation && elevation > 0
        ? shadows.native[elevation - 1](width, height)
        : []

    return (
      <ThemeContext.Consumer>
        {theme => {
          const styles = nativePaperStyle(theme)
          return (
            <View onLayout={this.onLayout} style={[styles.root]}>
              {width !== 0 &&
                height !== 0 &&
                nativeShadows.map((shadow, index) => (
                  <Elevation
                    key={index}
                    style={{
                      ...(styles.nativeShadowContainer as object),
                      ...(shadow.style as object),
                    }}
                    {...shadow.setting}
                  />
                ))}
              <View style={[styles.contentContainer, style]} {...props} />
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
