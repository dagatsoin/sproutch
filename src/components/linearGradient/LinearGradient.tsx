import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Types, UserInterface } from 'reactxp'

import { StyleProp } from '../../styles/createStyle'
import { View } from '../view'

type Props = {
  colors: string[]
  start?: [number, number]
  end?: [number, number]
  locations?: number[]
  style?: StyleProp<Types.ViewStyle>
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
        onLayout={this.measure}
        ref={(comp: View) => (this.rootRef = comp)}
      >
        <View ref={(comp: View) => (this.backgroundImageRef = comp)} />
        {children}
      </View>
    )
  }

  public async componentDidMount() {
    const rect = await UserInterface.measureLayoutRelativeToWindow(this.rootRef)

    this.oldWidth = rect.width
    this.oldHeight = rect.height

    this.updateLayout({
      width: rect.width,
      height: rect.height,
    })
  }

  private updateLayout(dimensions: { width: number; height: number }) {
    ;[findDOMNode(this.backgroundImageRef) as HTMLDivElement].map(e => {
      const style = this.getStyle(dimensions)
      e.setAttribute('style', style)
    })
  }

  private measure = (e: Types.ViewOnLayoutEvent) => {
    if (e.width !== this.oldWidth && e.height !== this.oldHeight) {
      this.oldWidth = e.width
      this.oldHeight = e.height

      this.updateLayout({
        width: e.width,
        height: e.height,
      })
    }
  }

  private getAngle({ width, height }: { width: number; height: number }) {
    // Math.atan2 handles Infinity
    const { start = [0, 0], end = [0, 1] } = this.props
    const angle =
      Math.atan2(
        width * (end[1] * 100 - start[1] * 100),
        height * (end[0] * 100 - start[0] * 100)
      ) +
      Math.PI / 2
    return angle + 'rad'
  }

  private get locations() {
    return this.props.locations &&
      this.props.locations.length === this.props.colors.length
      ? this.props.locations
      : this.props.colors.map((_c, i, colors) => i / (colors.length - 1))
  }

  private get colors() {
    const locations = this.locations
    return this.props.colors
      .map((color, index) => {
        const location = locations[index]
        let locationStyle = ''
        if (location) {
          locationStyle = ' ' + location * 100 + '%'
        }
        return color + locationStyle
      })
      .join(',')
  }

  private getStyle(dimensions: { width: number; height: number }) {
    return `
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(${this.getAngle(dimensions)}, ${
      this.colors
    });
    `
  }
}

export default LinearGradient
