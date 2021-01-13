import * as React from 'react'
import { findDOMNode } from 'react-dom'

import { View } from '../view'
import { BorderImageProps } from './BorderImageProps'

export default class BorderImage extends React.PureComponent<
  BorderImageProps,
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

  public componentDidUpdate(prevProps: BorderImageProps) {
    if (prevProps.uri !== this.props.uri) this.setStyle()
  }

  private setStyle = () => {
    if (this.element) {
      const { borderWidth, uri, sliceWidth } = this.props
      this.element.style.position = 'absolute'
      this.element.style.top = '0'
      this.element.style.right = '0'
      this.element.style.bottom = '0'
      this.element.style.left = '0'
      this.element.style.borderWidth = `${borderWidth}px`
      this.element.style.borderStyle = 'solid'
      this.element.style.borderImageSource = `url(${uri})`
      this.element.style.borderImageSlice = `${sliceWidth}`
    }
  }
}
