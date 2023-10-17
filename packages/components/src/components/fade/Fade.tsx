import * as React from 'react'
import { Animated, ViewStyle } from 'react-native'

import { NamedStyles, StyleSheet, StyleProp } from '../../styles'
import easing from '../../styles/easing'

export type FadeProps = {
  isVisible: boolean
  isAnimatedOnMount?: boolean
  duration?: number
  style?: StyleProp<ViewStyle>
  onAnimationEnd?: () => void
  children: React.ReactNode
}

type State = {
  isVisible: boolean
}

export default class Fade extends React.Component<FadeProps, State> {
  public state: State = { isVisible: false }
  private animatedOpacity = new Animated.Value(0)
  private animatedStyle: NamedStyles<'root'>
  private animation: Animated.CompositeAnimation
  private duration: number

  constructor(props: FadeProps) {
    super(props)
    const { isAnimatedOnMount, isVisible } = props
    this.duration = props.duration || 250
    const opacityFrom = isAnimatedOnMount
      ? isVisible
        ? 0
        : 1
      : isVisible
      ? 1
      : 0

    const opacityTo = isAnimatedOnMount
      ? isVisible
        ? 1
        : 0
      : isVisible
      ? 0
      : 1

    this.state.isVisible = isVisible
    this.animatedOpacity.setValue(opacityFrom)
    this.animatedStyle = StyleSheet.create({
      root: {
        opacity: this.animatedOpacity,
      }
    })
    this.animation = this.getAnimation(opacityTo)
  }

  public componentDidMount() {
    if (this.props.isAnimatedOnMount) {
      this.animation.start(this.onAnimationEnd.bind(this))
    }
  }

  public render() {
    const { isVisible } = this.state
    const { children, style } = this.props
    return (
      <Animated.View
        pointerEvents='none'
        style={[
          style,
          this.animatedStyle.root
        ]}
      >
        {isVisible && children}
      </Animated.View>
    )
  }

  public componentDidUpdate(prevProps: FadeProps) {
    if (this.props.isVisible !== prevProps.isVisible) {
      this.animation.stop()
      this.animation = this.getAnimation(this.props.isVisible ? 1 : 0)
      const childrenShouldBeVisible =
        this.props.isVisible || (!this.props.isVisible && this.state.isVisible)
      this.setState(
        {
          isVisible: childrenShouldBeVisible,
        },
        () => {
          this.animation.start(this.onAnimationEnd.bind(this))
        }
      )
    }
  }

  private onAnimationEnd({ finished }: { finished: boolean }) {
    if (finished && this.props.onAnimationEnd) {
      this.props.onAnimationEnd()
    }
  }

  private getAnimation(toValue: number) {
    return Animated.timing(this.animatedOpacity, {
      toValue,
      duration: this.duration,
      easing: easing.linear,
      useNativeDriver: true,
    })
  }
}
