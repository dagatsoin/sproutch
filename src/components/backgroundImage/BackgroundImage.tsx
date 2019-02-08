import * as React from 'react'
import { findDOMNode } from 'react-dom'

import { View } from '../view'
import { BackgroundImageProps } from './BackgroundImageProps'

export default class BackgroundImage extends React.PureComponent<
  BackgroundImageProps,
  {}
> {
  private viewRef: View

  public render() {
    return <View ref={view => (this.viewRef = view)} onLayout={this.setStyle} />
  }

  public componentDidUpdate(prevProps: BackgroundImageProps) {
    if (prevProps.uri !== this.props.uri) this.setStyle()
  }

  private setStyle = () => {
    const element = findDOMNode(this.viewRef) as HTMLElement
    if (element) {
      const { uri, resizeMode } = this.props
      element.setAttribute(
        'style',
        `
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url(${uri});
        background-size: ${resizeMode}
      `
      )
    }
  }
}
