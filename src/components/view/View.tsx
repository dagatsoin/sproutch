import jss, { Rule } from 'jss'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import {
  Animated,
  Image,
  Platform,
  Types,
  View as RNView,
} from 'reactxp'

import styles from './style'

export type ViewProps = {
  backgroundImage?: BackgroundImageProperties,
  children?: React.ReactNode
  style?: Types.StyleRuleSetRecursive<Types.StyleRuleSet<Types.ViewStyle>>
  animated?: Types.StyleRuleSetRecursive<Types.AnimatedViewStyleRuleSet | any>
} & Types.ViewProps

export type BackgroundImageProperties = {
  uri: string,
  resizeMode: Types.ImageResizeMode
  borderWidth: number
  capInsets?: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

export default class View extends React.Component<ViewProps, {}> {
  private static imageBackgroundContainerStyle: Rule = jss.createRule(styles.imageBackgroundContainer)

  private backgroundImageRef: RNView
  private ninePatchesRef: RNView
  private imageBackgroundStyle: Rule

  public componentDidMount() {
    const { backgroundImage } = this.props

    if (backgroundImage !== undefined) {
      const { capInsets } = backgroundImage

      if (Platform.getType() === 'web') {
        const element = findDOMNode(this.backgroundImageRef) as HTMLElement
        View.imageBackgroundContainerStyle.applyTo(element)
      }

      if (capInsets !== undefined) {
        if (Platform.getType() === 'web') {
          const element = findDOMNode(this.ninePatchesRef) as HTMLElement
          this.imageBackgroundStyle = jss.createRule(styles.imageBackground(backgroundImage))
          this.imageBackgroundStyle.applyTo(element)
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
        <RNView>
          {this.render9PatchesImage(backgroundImage)}
          <RNView
            ref={(comp: RNView) => this.backgroundImageRef = comp}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              flex: 1,
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
}