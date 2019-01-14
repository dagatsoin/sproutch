import * as React from 'react'

import { BoxShadow } from '../shadow'
import { shadows, styles } from './style'
import { ViewStyle, StyleObject } from '../../styles/createStyleSheet'
import { View } from '../view'
import { ViewOnLayoutEvent } from 'reactxp/dist/common/Types'

type Props = {
  elevation?: number
  style?: StyleObject<ViewStyle>
  square?: boolean
  children?: React.ReactNode
}

type State = {
  width: number
  height: number
}

export default class Paper extends React.Component<Props, State> {
  childRef: View

  state: State = {
    width: 0,
    height: 0,
  }

  onLayout({ width, height }: ViewOnLayoutEvent) {
    if (!this.state.width) this.setState({ width, height })
  }

  shouldComponentUpdate(nextProps: Props, nextState: State){
    return (
      nextProps.elevation !== this.props.elevation ||
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height
    )
  }

  render () {
    const { elevation, children, square, style } = this.props
    const { width, height } = this.state
    const nativeShadows = !!elevation && elevation > 0
      ? shadows.native[elevation - 1](width, height)
      : []

    return (
      <View
        onLayout={this.onLayout.bind(this)}
        style={[
          style,
          styles.root,
        ]}
      >
        {
          width !== 0 &&
          height !== 0 &&
          nativeShadows.map((shadow, index) => (
            <BoxShadow
              key={index}
              style={{
                ...styles.nativeShadowContainer as object,
                ...!square && styles.roundBorder as object,
                ...shadow.style as object
              }}
              {...shadow.setting}
            />
          ))
        }
        <View
          style={[
            styles.contentContainer,
          ]}
        >
          {children}
        </View>
      </View>
    )
  }
}