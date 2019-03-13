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
      const { position: center, uri, resizeMode, repeat } = this.props
      const position = center ? center.join(' ') : '50% 50%'
      const size = resizeMode === 'stretch' ? '100% 100%' : resizeMode

      this.element.setAttribute(
        'style',
        `
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url(${uri});
        background-position: ${position};
        background-size: ${size};
        background-repeat: ${repeat ? 'repeat' : 'no-repeat'}
      `
      )
    }
  }
}
