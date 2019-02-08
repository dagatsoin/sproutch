import * as React from 'react'
import { Animated, Styles, Types } from 'reactxp'

import { ThemeContext } from '../../styles/theme'
import { View } from '../view'
import styles, { ProgressBarStyle } from './style'

export type ProgressBarProps = {
  animationDuration?: number
  progress: number
  palette?: 'primary' | 'secondary'
  style?: Partial<ProgressBarStyle>
}

type State = {
  /**
   * RN does not implement transformOrigin.
   * As the animation is based on scale from the center of the progress bar,
   * we need to manually offset the progress bar from its container.
   */
  containerWidth: number
}

class ProgressBar extends React.PureComponent<ProgressBarProps, State> {
  public state: State = {
    containerWidth: 0,
  }
  private animatedPercent = Animated.createValue(0.0)
  private animatedOffset = Animated.createValue(0.0)
  private animatedStyle: Types.AnimatedViewStyleRuleSet
  private animation: {
    translate: Types.Animated.CompositeAnimation
    scale: Types.Animated.CompositeAnimation
  }

  public componentDidMount() {
    this.animatedStyle = Styles.createAnimatedViewStyle({
      transform: [
        { translateX: this.animatedOffset },
        { scaleX: this.animatedPercent },
      ],
    })
  }

  public render() {
    const { palette, style } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => {
          const stylesSheet = styles({ theme, palette, style })
          return (
            <View style={stylesSheet.root}>
              <View style={stylesSheet.background} />
              <View style={stylesSheet.top} onLayout={this.onLayout}>
                <Animated.View style={[stylesSheet.fill, this.animatedStyle]} />
              </View>
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  public componentDidUpdate(prevProps: ProgressBarProps, prevState: State) {
    if (
      (this.state.containerWidth > 0 && prevState.containerWidth === 0) || // We received the initial layout, let begin the animation
      this.state.containerWidth !== prevState.containerWidth || // Layout has change, we need to refresh the offset value
      this.props.progress !== prevProps.progress // Component has received a new progress value, we need to refresh the animation values
    ) {
      const init = prevState.containerWidth === 0
      // Stop current animation if any
      if (this.animation) {
        this.animation.translate.stop()
        this.animation.scale.stop()
      }
      const scale = Math.min(1, Math.max(0, this.props.progress / 100))
      const offset =
        this.state.containerWidth / -2 + (this.state.containerWidth * scale) / 2
      this.animation = this.getAnimation(
        { scale, offset },
        init // When initialising the layout, minimize the progress bar on the left
          ? 0
          : this.props.animationDuration || 0
      )
      this.animation.translate.start()
      this.animation.scale.start()
    }
  }

  private onLayout = (layout: Types.LayoutInfo) => {
    this.setState({ containerWidth: layout.width })
  }

  private getAnimation(
    {
      offset,
      scale,
    }: {
      offset: number
      scale: number
    },
    duration: number
  ) {
    return {
      translate: Animated.timing(this.animatedOffset, {
        toValue: offset,
        duration,
        easing: Animated.Easing.InOut(),
      }),
      scale: Animated.timing(this.animatedPercent, {
        toValue: scale,
        duration,
        easing: Animated.Easing.InOut(),
      }),
    }
  }
}

export default ProgressBar
