import * as React from 'react'
import { findDOMNode } from 'react-dom'
import {
  Animated,
  Image,
  Platform,
  Styles,
  Types,
  View as RNView,
} from 'reactxp'

import { imageBackgroundStyle } from './style'

export type ViewProps = {
  backgroundImage?: BackgroundImageProperties,
  children?: React.ReactNode
  style?: Types.StyleRuleSetRecursive<Types.StyleRuleSet<Types.ViewStyle>>
  animated?: Types.StyleRuleSetRecursive<Types.AnimatedViewStyleRuleSet | any>
} & Types.ViewProps

export type BackgroundImageProperties = {
  uri: string,
  resizeMode: Types.ImageResizeMode
  capInsets?: {
    borderWidth: number
    top: number
    right: number
    bottom: number
    left: number
  }
}

export default class View extends React.Component<ViewProps, {}> {
  private ninePatchesRef: RNView

  public componentDidMount() {
    const { backgroundImage } = this.props

    if (backgroundImage !== undefined) {
      const { capInsets } = backgroundImage

      if (capInsets !== undefined) {
        if (Platform.getType() === 'web') {
          const element = findDOMNode(this.ninePatchesRef) as HTMLElement
          element.setAttribute('style', imageBackgroundStyle(backgroundImage))
        }
      }
    }
  }

  public render() {
    const { style, animated, ...props } = this.props

    return animated === undefined
      ? (
        <RNView
          style={style}
          {...props as any}
        >
          {this.renderChildren()}
        </RNView>
      )
      : (
        <Animated.View
          style={[
            style,
            animated,
          ]}
          {...props as any}
        >
          {this.renderChildren()}
        </Animated.View>
      )
  }

  private renderChildren() {
    const { children, backgroundImage } = this.props

    return backgroundImage
      ? (
        <RNView style={Styles.createViewStyle({flex: 1})}>
          {
            backgroundImage.capInsets
              ? this.render9PatchesImage(backgroundImage)
              : this.renderBackgroundImage(backgroundImage)
          }
          {children}
        </RNView>
      )
      : children
  }

  private render9PatchesImage(backgroundImage: BackgroundImageProperties) {
    const isWeb = Platform.getType() === 'web'
    const { capInsets } = backgroundImage

    if (isWeb && capInsets) {
      return (
        <RNView
          ref={(comp: RNView) => this.ninePatchesRef = comp}
        />
      )
    } else {
      return <></>
    }
  }

  private renderBackgroundImage(backgroundImage: BackgroundImageProperties) {
    return (
      <RNView
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
        }}
      >
        <Image
          style={{
            flex: 1,
          }}
          resizeMode={backgroundImage.resizeMode}
          source={backgroundImage.uri}
        />
      </RNView>
    )
  }
}