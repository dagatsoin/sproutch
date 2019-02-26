import * as React from 'react'
import { Image } from 'react-native'
import { Styles, View } from 'reactxp'

import { LayoutInfo } from '../View'
import { BackgroundImageProps } from './BackgroundImageProps'

type State = {
  containerLayout: LayoutInfo
  imageSize: {
    width: number
    height: number
  }
}

export default class BackgroundImage extends React.Component<
  BackgroundImageProps,
  State
> {
  public state: State = {
    containerLayout: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    imageSize: {
      width: 0,
      height: 0,
    },
  }

  /**
   * Retrieve image size
   */
  public componentWillMount() {
    // This is a network image
    const { uri } = this.props

    Image.getSize(
      uri,
      (width, height) => this.setState({ imageSize: { width, height } }),
      // tslint:disable-next-line: no-console
      console.warn
    )
  }

  public render() {
    const { width: imageWidth, height: imageHeight } = this.state.imageSize
    const { position, resizeMode, repeat, uri } = this.props

    const {
      width: containerWidth,
      height: containerHeight,
    } = this.state.containerLayout
    const size = repeat
      ? 'repeat'
      : resizeMode === 'auto'
      ? undefined
      : resizeMode

    const left =
      position && resizeMode === 'auto'
        ? position[0].indexOf('%') > -1
          ? ((containerWidth - (imageWidth || 0)) *
              Number((position[0] as string).slice(0, -1))) /
            100
          : Number((position[0] as string).slice(0, -2))
        : 0

    const top =
      position && resizeMode === 'auto'
        ? position[1].indexOf('%') > -1
          ? ((containerHeight - (imageHeight || 0)) *
              Number((position[1] as string).slice(0, -1))) /
            100
          : Number((position[1] as string).slice(0, -2))
        : 0

    const width = resizeMode === 'auto' ? imageWidth : containerWidth

    const height = resizeMode === 'auto' ? imageHeight : containerHeight

    return (
      <View
        onLayout={this.onLayout}
        style={Styles.createViewStyle({
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        })}
      >
        <Image
          style={{
            position: 'absolute',
            top,
            left,
            width,
            height,
          }}
          resizeMode={size}
          source={{ uri }}
        />
      </View>
    )
  }

  private onLayout = (containerLayout: LayoutInfo) => {
    this.setState({ containerLayout })
  }
}
