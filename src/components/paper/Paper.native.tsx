import * as React from 'react'
import { Types } from 'reactxp'

import { StyleObject } from '../../styles'
import { BoxShadow } from '../shadow'
import { View } from '../view'
import { shadows, styles } from './style'

type Props = {
  elevation?: number
  style?: StyleObject<Types.ViewStyle>
  square?: boolean
  children?: React.ReactNode
}

type State = {
  width: number
  height: number
}

export default class Paper extends React.Component<Props, State> {
  public childRef: View

  public state: State = {
    width: 0,
    height: 0,
  }

  public onLayout = ({ width, height }: Types.ViewOnLayoutEvent) => {
    if (!this.state.width) this.setState({ width, height })
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      nextProps.elevation !== this.props.elevation ||
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height
    )
  }

  public render() {
    const { elevation, children, square, style } = this.props
    const { width, height } = this.state
    const nativeShadows =
      !!elevation && elevation > 0
        ? shadows.native[elevation - 1](width, height)
        : []

    return (
      <View onLayout={this.onLayout} style={[style, styles.root]}>
        {width !== 0 &&
          height !== 0 &&
          nativeShadows.map((shadow, index) => (
            <BoxShadow
              key={index}
              style={{
                ...(styles.nativeShadowContainer as object),
                ...(!square && (styles.roundBorder as object)),
                ...(shadow.style as object),
              }}
              {...shadow.setting}
            />
          ))}
        <View style={[styles.contentContainer]}>{children}</View>
      </View>
    )
  }
}
