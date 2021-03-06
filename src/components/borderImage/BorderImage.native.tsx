import * as React from 'react'
import { Image, Styles, View } from 'reactxp'

import { LayoutInfo } from '../view'
import { BorderImageProps } from './BorderImageProps'

type State = {
  layout?: LayoutInfo
}

export default class BorderImage extends React.Component<
  BorderImageProps,
  State
> {
  public state: State = {}

  public render() {
    return (
      <View
        style={Styles.createViewStyle({ flex: 1 })}
        onLayout={this.onLayout}
      >
        {renderBorders(this.props, this.state)}
      </View>
    )
  }

  private onLayout = (layout: LayoutInfo) => {
    this.setState({ layout })
  }
}

function renderBorders(props: BorderImageProps, state: State) {
  const { borderWidth, uri } = props
  const layout = state.layout

  if (!layout) return <></> // wait to kwnow the View size

  const borderTop = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        alignItems: 'center',
        top: 0,
        right: 0,
        left: 0,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          height: borderWidth * 2,
          width: 1,
          transform: [{ scaleX: layout.width - borderWidth * 2 }],
        }}
        resizeMode="cover"
        source={uri}
      />
    </View>
  )

  const cornerTopRight = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        right: 0,
        width: borderWidth,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          right: 0,
          height: borderWidth * 2,
          width: borderWidth * 2,
        }}
        resizeMode="cover"
        source={uri}
      />
    </View>
  )

  const borderRight = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        justifyContent: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        width: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          right: 0,
          width: borderWidth * 2,
          height: 1,
          transform: [{ scaleY: layout.height - borderWidth * 2 }],
        }}
        resizeMode="cover"
        source={uri}
      />
    </View>
  )

  const cornerBottomRight = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        right: 0,
        width: borderWidth,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          right: 0,
          bottom: 0,
          height: borderWidth * 2,
          width: borderWidth * 2,
        }}
        resizeMode="cover"
        source={uri}
      />
    </View>
  )

  const borderBottom = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        alignItems: 'center',
        right: 0,
        bottom: 0,
        left: 0,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          bottom: 0,
          height: borderWidth * 2,
          width: 1,
          transform: [{ scaleX: layout.width - borderWidth * 2 }],
        }}
        resizeMode="cover"
        source={uri}
      />
    </View>
  )

  const cornerBottomLeft = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        left: 0,
        width: borderWidth,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          bottom: 0,
          height: borderWidth * 2,
          width: borderWidth * 2,
        }}
        resizeMode="cover"
        source={uri}
      />
    </View>
  )

  const borderLeft = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        width: borderWidth,
      }}
    >
      <Image
        style={{
          width: borderWidth * 2,
          height: 1,
          transform: [{ scaleY: layout.height - borderWidth * 2 }],
        }}
        resizeMode="cover"
        source={uri}
      />
    </View>
  )

  const cornerTopLeft = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        width: borderWidth,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          height: borderWidth * 2,
          width: borderWidth * 2,
        }}
        resizeMode="cover"
        source={uri}
      />
    </View>
  )

  return (
    <>
      {borderTop}
      {cornerTopRight}
      {borderRight}
      {cornerBottomRight}
      {borderBottom}
      {cornerBottomLeft}
      {borderLeft}
      {cornerTopLeft}
    </>
  )
}
