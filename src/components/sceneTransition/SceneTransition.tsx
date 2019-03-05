import * as React from 'react'
import { Styles } from 'reactxp'

import { Theme, ThemeContext } from '../../styles'
import {
  Animated,
  AnimatedCompositeAnimation,
  AnimatedViewStyleRuleSet,
} from '../animated'
import { LayoutInfo, View } from '../view'
import Card from './Card'
import ShouldComponentUpdate from './ShouldComponentUpdate'
import { containerStyle, createCardStyle } from './style'

export type SceneTransitionProps = {
  render: () => React.ReactNode
  onTransitionEnd?: (finished: boolean) => void
  delayRender?: number
  dummyScene?: React.ReactNode
}

type State = {
  isWaitingForNextScene: boolean
  isAnimating: boolean
  currentScene: React.ReactNode
  renderNextScene?: () => React.ReactNode
}

const DURATION = 500

export default class SceneTransition extends React.Component<
  SceneTransitionProps,
  State
> {
  public state: State
  private animatedCurrentCardOpacity = Animated.createValue(1)
  private animatedCurrentCardTranslateX = Animated.createValue(0.0)
  private animatedNextCardTranslateX = Animated.createValue(0.0)
  private animatedNextCardOpacity = Animated.createValue(0.0)
  private animation?: {
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
      opacity: this.animatedNextCardOpacity,
      transform: [{ translateX: this.animatedNextCardTranslateX }],
    }),
  }
  private layout: LayoutInfo

  public static getDerivedStateFromProps(
    props: SceneTransitionProps,
    state: State
  ) {
    // Initial mount state
    if (state.isWaitingForNextScene && state.isAnimating) {
      return {
        isWaitingForNextScene: true,
        isAnimating: false,
      }
    }
    // A new scene has been received.
    if (state.isWaitingForNextScene && !state.isAnimating) {
      return {
        isWaitingForNextScene: false,
        isAnimating: true,
        renderNextScene: props.render,
      }
    }
    // The user click on another router during the animation.
    // Let's continue the animation but change the next scene.
    else if (!state.isWaitingForNextScene && state.isAnimating) {
      return {
        renderNextScene: props.render,
      }
    }
    // Transition is complete.
    // Wait for new scene.
    else if (!state.isWaitingForNextScene && !state.isAnimating) {
      return {
        isWaitingForNextScene: true,
        currentScene: state.renderNextScene && state.renderNextScene(),
        renderNextScene: undefined,
      }
    }
    return null
  }

  constructor(props: SceneTransitionProps) {
    super(props)
    this.state = {
      isWaitingForNextScene: true,
      isAnimating: false,
      currentScene: props.render(),
      renderNextScene: () => <></>,
    }
  }

  public render() {
    const { dummyScene } = this.props
    const {
      isAnimating,
      currentScene,
      isWaitingForNextScene,
      renderNextScene,
    } = this.state
    const shouldDisplayDummy = !!dummyScene && isAnimating
    return (
      <ThemeContext.Consumer>
        {(theme: Theme<any, any>) => {
          const cardStyle = createCardStyle(theme)
          return (
            <View style={containerStyle} onLayout={this.onLayout}>
              {/* Current scene container*/}
              <Animated.View
                style={[cardStyle, this.animatedStyle.currentCard]}
              >
                <ShouldComponentUpdate shouldUpdate={isWaitingForNextScene}>
                  {currentScene}
                </ShouldComponentUpdate>
              </Animated.View>
              {/* Next scene container*/}
              <Animated.View style={[cardStyle, this.animatedStyle.nextCard]}>
                <Card>
                  {shouldDisplayDummy
                    ? dummyScene
                    : renderNextScene && renderNextScene()}
                </Card>
              </Animated.View>
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  public componentDidUpdate() {
    if (!this.layout) return
    const { delayRender } = this.props
    const { isAnimating } = this.state

    // The component was doing nothing and was ready to start a new transition.
    if (isAnimating) {
      this.animatedCurrentCardTranslateX.setValue(0)
      this.animatedCurrentCardOpacity.setValue(1)
      this.animatedNextCardTranslateX.setValue(this.layout.width)
      this.animatedNextCardOpacity.setValue(1)
      this.animation = this.getAnimation({
        currentCardTranslateX: -30,
        nextCardTranslateX: 0,
      })
      const onTransitionEnd = ({ finished }: { finished: boolean }) => {
        if (finished) {
          // The transition has just finished. Replace the current scene container at initial position.
          this.animatedCurrentCardTranslateX.setValue(0)
          this.animatedCurrentCardOpacity.setValue(1)
          this.animatedNextCardTranslateX.setValue(this.layout.width)
          this.animatedNextCardOpacity.setValue(0)
          this.setState({
            isAnimating: false,
          })
          this.animation = undefined
        }
        this.props.onTransitionEnd && this.props.onTransitionEnd(finished)
      }

      // If the user set a delay used it tro display the next scene, otherwize display the scene at the transition end
      if (delayRender) {
        this.startAnimation()
        setTimeout(() => onTransitionEnd({ finished: true }), delayRender)
      } else {
        this.startAnimation(onTransitionEnd)
      }
    }
  }

  private startAnimation(
    callBack?: ({ finished }: { finished: boolean }) => void
  ) {
    if (!this.animation) return
    this.animation.currentCardFading.start()
    this.animation.currentCardTranslateX.start()
    this.animation.nextCardTranslateX.start(callBack)
  }

  private onLayout = (layout: LayoutInfo) => {
    this.layout = layout
  }

  private getAnimation(to: {
    currentCardTranslateX: number
    nextCardTranslateX: number
  }) {
    return {
      currentCardFading: Animated.timing(this.animatedCurrentCardOpacity, {
        toValue: 0.5,
        duration: DURATION,
        easing: Animated.Easing.InOut(),
      }),
      currentCardTranslateX: Animated.timing(
        this.animatedCurrentCardTranslateX,
        {
          toValue: to.currentCardTranslateX,
          duration: DURATION,
          easing: Animated.Easing.InOut(),
        }
      ),
      nextCardTranslateX: Animated.timing(this.animatedNextCardTranslateX, {
        toValue: to.nextCardTranslateX,
        duration: DURATION,
        easing: Animated.Easing.InOut(),
      }),
    }
  }
}
