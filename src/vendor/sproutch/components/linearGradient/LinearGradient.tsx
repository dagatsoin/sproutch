import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Platform, Types } from 'reactxp'
import { Option } from 'space-lift'
import { View } from 'sproutch'

import { StyleObject, ViewStyle } from '../../styles'

type Props = {
  colors: string[]
  start: {x: number, y: number}
  end: {x: number, y: number}
  locations: number[]
  style: StyleObject<ViewStyle>
  children?: React.ReactNode
}

class LinearGradient extends React.PureComponent<Props, {}> {
  public backgroundImageRef: View
  public rootRef: View
  private oldWidth: number
  private oldHeight: number

  public render() {
    const { style, children } = this.props

    return (
      <View
        style={style}
        // tslint:disable-next-line: jsx-no-bind
        onLayout={this.measure.bind(this)}
        ref={comp => this.rootRef = comp as View}
      >
        <View ref={comp => this.backgroundImageRef = comp as View}/> 
        {children}
      </View>
    )
  }

  public componentDidMount() {
    Option(findDOMNode(this.rootRef) as HTMLElement)
    .map(e => {
      this.oldWidth = e.clientWidth
      this.oldHeight = e.clientHeight

      this.updateLayout({
        width: e.clientWidth,
        height: e.clientHeight,
      })
    }) 
  }

  private updateLayout(dimensions: {
    width: number,
    height: number
  }) {
    if (Platform.getType() === 'web') {
      Option(findDOMNode(this.backgroundImageRef) as HTMLElement)
        .map(e => {
          const style = this.getStyle(dimensions)
          e.setAttribute('style', style)
        }) 
    }
  }

  private measure(e: Types.ViewOnLayoutEvent) {
    if (e.width !== this.oldWidth && e.height !== this.oldHeight) {
      this.oldWidth = e.width
      this.oldHeight = e.height

      this.updateLayout({
        width: e.width,
        height: e.height,
      })
    }
  }

  private getAngle({
    width,
    height
  }: {
    width: number
    height: number
  }) {
    // Math.atan2 handles Infinity
    const angle = Math.atan2(
        width * (this.props.end.y - this.props.start.y),
        height * (this.props.end.x - this.props.start.x)
      ) + Math.PI / 2
    return angle + 'rad'
  }

  private get colors() {
    return this.props.colors
      .map((color, index) => {
        const location = this.props.locations[index]
        let locationStyle = ''
        if (location) {
          locationStyle = ' ' + location * 100 + '%'
        }
        return color + locationStyle
      })
      .join(',')
  }

  private getStyle(dimensions: {
    width: number,
    height: number
  }) {
    return `
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(${this.getAngle(dimensions)}, ${this.colors});
    `
  }
}

export default LinearGradient
