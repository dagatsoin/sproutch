import * as React from 'react'
import { findDOMNode } from 'react-dom'

import { View } from '../view'
import { RadialGradientProps } from './RadialGradientProps'

class RadialGradient extends React.Component<RadialGradientProps, {}> {
  public backgroundImageRef: View

  public render() {
    const { style } = this.props

    return (
      <View style={style}>
        <View ref={(comp: any) => (this.backgroundImageRef = comp)} />
      </View>
    )
  }

  public componentDidMount() {
    this.updateGradientStyle()
  }

  public componentDidUpdate() {
    this.updateGradientStyle()
  }

  private updateGradientStyle() {
    ;[findDOMNode(this.backgroundImageRef) as HTMLElement].map(e =>
      e.setAttribute('style', this.style)
    )
  }

  private get style() {
    // Retrieve the new center coordinates value in pixel
    const {
      center,
      colors,
      isEllipse,
      radius = 'farthest-corner',
      stops,
    } = this.props

    const colorStrings = colors
      .map((color, i) => `${color} ${stops[i] * 100}%`)
      .join(', ')

    const isCenterInPercent = !center || typeof center[0] === 'string'
    const posX = center ? `${center[0]}${isCenterInPercent ? '' : 'px'}` : '50%'

    const posY = center ? `${center[1]}${isCenterInPercent ? '' : 'px'}` : '50%'

    const shape = isEllipse ? 'ellipse' : 'circle'

    const _radius = isEllipse
      ? Array.isArray(radius)
        ? radius.map(r => r + '%').join(' ')
        : radius
      : radius

    return `
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: radial-gradient(${shape} ${_radius} at ${posX} ${posY}, ${colorStrings})
    `
  }
}

export default RadialGradient
