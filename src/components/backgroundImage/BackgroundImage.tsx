import * as React from 'react'
import { findDOMNode } from 'react-dom'

import { View } from '../view'
import { BackgroundImageProps } from './BackgroundImageProps'

export default class BackgroundImage extends React.PureComponent<
  BackgroundImageProps,
  {}
> {
  private viewRef: View
  private element: HTMLElement

  public componentDidMount() {
    this.element = findDOMNode(this.viewRef) as HTMLElement
    this.setStyle()
  }

  public render() {
    return (
      <View
        ref={(view: any) => (this.viewRef = view)}
        onLayout={this.setStyle}
      />
    )
  }

  public componentDidUpdate(prevProps: BackgroundImageProps) {
    if (
      prevProps.uri !== this.props.uri ||
      (prevProps.position === undefined && this.props.position !== undefined) ||
      (prevProps.position !== undefined && this.props.position === undefined) ||
      (prevProps.position !== undefined &&
        this.props.position !== undefined &&
        (prevProps.position[0] !== this.props.position[0] ||
          prevProps.position[1] !== this.props.position[1])) ||
      prevProps.repeat !== this.props.repeat ||
      prevProps.resizeMode !== this.props.resizeMode
    ) {
      this.setStyle()
    }
  }

  private setStyle = () => {
    if (this.element) {
      const {
        borderRadius = 0,
        position: center,
        uri,
        resizeMode = 'auto',
        repeat,
      } = this.props
      const position = center ? center.join(' ') : '50% 50%'
      const size = resizeMode === 'stretch' ? '100% 100%' : resizeMode

      this.element.style.position = 'absolute'
      this.element.style.top = '0'
      this.element.style.right = '0'
      this.element.style.bottom = '0'
      this.element.style.left = '0'
      this.element.style.borderRadius = `${borderRadius}px`
      this.element.style.backgroundImage = `url(${uri})`
      this.element.style.backgroundPosition = `${position}`
      this.element.style.backgroundSize = `${size}`
      this.element.style.backgroundRepeat = repeat ? 'repeat' : 'no-repeat'
    }
  }
}
