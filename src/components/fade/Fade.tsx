import React from 'react'

import fadeStyle from './style'
import { ViewStyle } from '../../styles/createStyleSheet'
import { View } from '../view'
import { Animated, Types, Styles } from 'reactxp';

type Props = {
  isVisible: boolean
  isAnimatedOnMount?: boolean
  duration?: number
  palette?: 'primary' | 'secondary'
  style?: ViewStyle
  onAnimationEnd?:() => void
  children: React.ReactNode
}

type State = {
  isVisible: boolean
}

export default class Fade extends React.Component<Props, State> {
  private animatedOpacity = Animated.createValue(0)
  private animatedStyle: Types.AnimatedViewStyleRuleSet
  private animation: Types.Animated.CompositeAnimation
  private duration: number

  state: State = { isVisible: false }
  
  constructor(props: Props) {
    super(props)
    const { isAnimatedOnMount, isVisible } = props
    this.duration = props.duration || 15
    const opacityFrom = !!isAnimatedOnMount
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
    this.animatedStyle = Styles.createAnimatedViewStyle({
        opacity: this.animatedOpacity
    })
    this.animation = this.getAnimation(opacityTo)
  }

  componentDidMount() {
    if (this.props.isAnimatedOnMount) {
      this.animation.start(this.onAnimationEnd.bind(this))
    }
  }

  render() {
    const { isVisible } = this.state
    const { children, style } = this.props
    return (
      <View
        style={[fadeStyle, style]}
        animated={this.animatedStyle}
      >{isVisible && children}</View>
    )
  }

  componentDidUpdate(prevProps: Props, _prevState: State) {
    if (this.props.isVisible !== prevProps.isVisible) {
      this.animation.stop()
      this.animation = this.getAnimation(this.props.isVisible
        ? 1
        : 0
      )
      const childrenShouldBeVisible = this.props.isVisible || (!this.props.isVisible && this.state.isVisible)
      this.setState({
        isVisible: childrenShouldBeVisible
      }, () => {
        this.animation.start(this.onAnimationEnd.bind(this))
      })
    }
  }

  private onAnimationEnd({ finished }: { finished: boolean }) {
    if (finished && this.props.onAnimationEnd) {
      this.props.onAnimationEnd()
    }
  }

  private getAnimation(toValue: number) {
    return Animated
    .timing(
      this.animatedOpacity,
      {
        toValue,
        duration: this.duration,
        easing: Animated.Easing.Linear()
      }
    )
  }
}