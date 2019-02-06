import * as React from 'react'
import { findDOMNode } from 'react-dom'

import { View } from '../view'
import { BorderImageProps } from './BorderImageProps'

export default class BorderImage extends React.PureComponent<
  BorderImageProps,
  {}
> {
  private viewRef: View

  public render() {
    return <View ref={view => (this.viewRef = view)} onLayout={this.setStyle} />
  }

  public componentDidUpdate(prevProps: BorderImageProps) {
    if (prevProps.uri !== this.props.uri) this.setStyle()
  }

  private setStyle = () => {
    const element = findDOMNode(this.viewRef) as HTMLElement
    if (element) {
      const { borderWidth, uri, sliceWidth } = this.props
      element.setAttribute(
        'style',
        `
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-width: ${borderWidth}px;
        border-style: solid;
        border-image-source: url(${uri});
        border-image-slice: ${sliceWidth}
      `
      )
    }
  }
}
