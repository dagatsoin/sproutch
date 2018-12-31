import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Platform, Types } from 'reactxp'
import { Option } from 'space-lift'
import { View } from 'sproutch'

import { StyleObject, ViewStyle } from '../../styles'

type Props = {
  colors: string[]
  stops: number[]
  center: [number, number]
  radius: number
  isPercent?: boolean
  style: StyleObject<ViewStyle>
  children?: React.ReactNode
}

class LinearGradient extends React.PureComponent<Props, {}> {
  public backgroundImageRef: View

  public render() {
    const { style, children } = this.props

    return (
      <View style={style}>
        <View ref={comp => this.backgroundImageRef = comp as View}/> 
        {children}
      </View>
    )
  }
  public componentDidMount() {
    this.updateLayout()
  }

  public componentDidUpdate() {
    this.updateLayout()
  }

  private updateLayout() {
    if (Platform.getType() === 'web') {
      Option(findDOMNode(this.backgroundImageRef) as HTMLElement)
        .map(e => e.setAttribute('style', this.style))
      }
  }
 
  private get style() {
    // Retrieve the new center coordinates value in pixel
    const { center, colors, isPercent } = this.props
    
    const realLocations = colors.map((_, i) => (1 / (colors.length - 1)) * i
    )
    const colorStrings = colors
      .map((color, i) => `${color} ${Math.round(realLocations[i] * 100)}%`)
      .join(', ')

    return `
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: radial-gradient(circle at ${center[0]}${isPercent ? '%':'px'} ${center[1]}${isPercent ? '%':'px'}, ${colorStrings})
    `
  }
}

export default LinearGradient
