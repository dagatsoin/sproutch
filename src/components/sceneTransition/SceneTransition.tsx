import * as React from 'react'
import { Styles } from 'reactxp'

import { Theme, ThemeContext } from '../../styles'
import {
  Animated,
  AnimatedCompositeAnimation,
  AnimatedViewStyleRuleSet,
} from '../animated'
import { LayoutInfo, View } from '../view'
import SceneContainer from './SceneContainer'
import { containerStyle, createCardStyle } from './style'

export type SceneTransitionProps = {
  nextScene: React.ReactNode
  onTransitionEnd?: (finished: boolean) => void
  delayRender?: number
  dummyScene?: React.ReactNode
}

type State = {
  isTransitionFinished: boolean
  currentScene: React.ReactNode
  nextScene: React.ReactNode
}

export default class SceneTransition extends React.PureComponent<
  SceneTransitionProps,
  State
> {
  public state: State
  private animatedCurrentCardOpacity = Animated.createValue(1)
  private animatedCurrentCardTranslateX = Animated.createValue(0.0)
  private animatedNextCardTranslateX = Animated.createValue(0.0)
  private animation: {
    currentCardFading: AnimatedCompositeAnimation
    currentCardTranslateX: AnimatedCompositeAnimation
    nextCardTranslateX: AnimatedCompositeAnimation
  }

  private animatedStyle: {
    currentCard: AnimatedViewStyleRuleSet
    nextCard: AnimatedViewStyleRuleSet
  } = {
    currentCard: Styles.createAnimatedViewStyle({
      opacity: this.animatedCurrentCardOpacity,
      transform: [{ translateX: this.animatedCurrentCardTranslateX }],
    }),
    nextCard: Styles.createAnimatedViewStyle({
      transform: [{ translateX: this.animatedNextCardTranslateX }],
    }),
  }
  private layout: LayoutInfo
  private displaySceneDelayHandler: any

  public static getDerivedStateFromProps(
    nextProps: SceneTransitionProps,
    currentState: State
  ) {
    // Should component update
    const shouldUpdate = nextProps.nextScene !== currentState.nextScene

    if (shouldUpdate) {
      return {
        currentScene: currentState.nextScene,
        nextScene: nextProps.nextScene,
        isTransitionFinished: false,
      }
    } else {
      return null
    }
  }

  public componentDidMount() {
    this.setState({ isTransitionFinished: true })
  }

  constructor(props: SceneTransitionProps) {
    super(props)
    this.state = {
      isTransitionFinished: true,
      currentScene: props.nextScene,
      nextScene: <></>,
    }
  }

  public render() {
    const { dummyScene } = this.props
    const { nextScene, currentScene, isTransitionFinished } = this.state
    const shouldDisplayDummy = !!dummyScene && !isTransitionFinished
    return (
      <ThemeContext.Consumer>
        {(theme: Theme<any, any>) => {
          const cardStyle = createCardStyle(theme)
          return (
            <View style={containerStyle} onLayout={this.onLayout}>
              {!isTransitionFinished && (
                <Animated.View
                  style={[cardStyle, this.animatedStyle.currentCard]}
                >
                  {currentScene}
                </Animated.View>
              )}
              <Animated.View style={[cardStyle, this.animatedStyle.nextCard]}>
                <SceneContainer>
                  {shouldDisplayDummy ? dummyScene : nextScene}
                </SceneContainer>
              </Animated.View>
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  public componentDidUpdate(
    _prevProps: SceneTransitionProps,
    prevState: State
  ) {
    if (!this.layout) return
    const hasFinishedAnimation =
      !prevState.isTransitionFinished && this.state.isTransitionFinished
    const { delayRender } = this.props
    // Trigger side effects
    if (!hasFinishedAnimation) {
      if (this.animation) {
        this.stopAnimation()
        if (this.displaySceneDelayHandler) {
          clearTimeout(this.displaySceneDelayHandler)
        }
      }
      this.animatedCurrentCardTranslateX.setValue(0)
      this.animatedCurrentCardOpacity.setValue(1)
      this.animatedNextCardTranslateX.setValue(this.layout.width)
      this.animation = this.getAnimation({
        currentCardTranslateX: -30,
        nextCardTranslateX: 0,
      })
      // If the user set a delay used it tro display the next scene, otherwize display the scene at the transition end
      if (delayRender) {
        this.startAnimation()
        this.displaySceneDelayHandler = setTimeout(
          () => this.onTransitionEnd({ finished: true }),
          delayRender
        )
      } else {
        this.startAnimation(this.onTransitionEnd)
      }
    }
  }

  private startAnimation(
    callBack?: ({ finished }: { finished: boolean }) => void
  ) {
    this.animation.currentCardFading.start()
    this.animation.currentCardTranslateX.start()
    this.animation.nextCardTranslateX.start(callBack)
  }

  private stopAnimation() {
    this.animation.currentCardFading.stop()
    this.animation.currentCardTranslateX.stop()
    this.animation.nextCardTranslateX.stop()
  }

  private onLayout = (layout: LayoutInfo) => {
    this.layout = layout
  }

  private onTransitionEnd = ({ finished }: { finished: boolean }) => {
    if (finished) {
      this.setState({ isTransitionFinished: true })
    }
    this.props.onTransitionEnd && this.props.onTransitionEnd(finished)
  }

  private getAnimation(to: {
    currentCardTranslateX: number
    nextCardTranslateX: number
  }) {
    return {
      currentCardFading: Animated.timing(this.animatedCurrentCardOpacity, {
        toValue: 0.5,
        duration: 500,
        easing: Animated.Easing.InOut(),
      }),
      currentCardTranslateX: Animated.timing(
        this.animatedCurrentCardTranslateX,
        {
          toValue: to.currentCardTranslateX,
          duration: 500,
          easing: Animated.Easing.InOut(),
        }
      ),
      nextCardTranslateX: Animated.timing(this.animatedNextCardTranslateX, {
        toValue: to.nextCardTranslateX,
        duration: 500,
        easing: Animated.Easing.InOut(),
      }),
    }
  }
}
