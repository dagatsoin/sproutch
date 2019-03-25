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
import { createSceneTransitionStyle, SceneTransitionOverride } from './style'

export type SceneTransitionProps = {
  render: () => React.ReactNode
  onTransitionEnd?: (finished: boolean) => void
  delayRender?: number
  sceneContainerSlot?: React.ReactNode
  dummyScene?: React.ReactNode
  style?: SceneTransitionOverride
}

type State = {
  isWaitingForNextScene: boolean
  isAnimating: boolean
  isReady: boolean
  layout?: LayoutInfo
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

  public static getDerivedStateFromProps(
    props: SceneTransitionProps,
    state: State
  ) {
    // Initial state, wait for the layout
    // -> set component as ready
    if (
      state.isWaitingForNextScene &&
      !state.isAnimating &&
      !state.isReady &&
      state.layout
    ) {
      return {
        isReady: true,
      }
    }

    // A new scene has been received.
    // -> Render the new scene and start animation.
    if (state.isReady && state.isWaitingForNextScene && !state.isAnimating) {
      return {
        isWaitingForNextScene: false,
        isAnimating: true,
        isStale: true,
        renderNextScene: props.render,
      }
    }
    // The user click on another router during the animation.
    // -> Let's continue the animation but change the next scene.
    else if (
      state.isReady &&
      !state.isWaitingForNextScene &&
      state.isAnimating
    ) {
      return {
        renderNextScene: props.render,
        isStale: false,
      }
    }
    // Transition is complete.
    // -> Wait for new scene
    // (Transfert he next scene to the current scene slot and empty the next scene renderer slot.)
    else if (
      state.isReady &&
      !state.isWaitingForNextScene &&
      !state.isAnimating
    ) {
      return {
        isWaitingForNextScene: true,
        currentScene: state.renderNextScene && state.renderNextScene(),
        renderNextScene: undefined,
      }
    }

    // Still waiting for the component to be ready. Meanwhile, the current scene may be changed.
    // For eg. a React Router redirection, the initial rendered scene has been redirected to another scene.
    // But as we captured the initial scene in the constructor, we need to refresh it now.
    return {
      currentScene: props.render(),
    }
  }

  constructor(props: SceneTransitionProps) {
    super(props)
    // Iniital state: wait for a new scene to render
    this.state = {
      isWaitingForNextScene: true,
      isAnimating: false,
      isReady: false,
      currentScene: props.render(),
      renderNextScene: undefined,
    }
  }

  public render() {
    const { dummyScene, sceneContainerSlot, style } = this.props
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
          const styleSheet = createSceneTransitionStyle(theme, style)
          return (
            <View style={styleSheet.root} onLayout={this.onLayout}>
              {/* Current scene container*/}
              <Animated.View
                style={[
                  styleSheet.currentSceneContainer,
                  this.animatedStyle.currentCard,
                ]}
              >
                <ShouldComponentUpdate shouldUpdate={isWaitingForNextScene}>
                  {sceneContainerSlot}
                  {currentScene}
                </ShouldComponentUpdate>
              </Animated.View>
              {/* Next scene container*/}
              <Animated.View
                style={[
                  styleSheet.currentSceneContainer,
                  this.animatedStyle.nextCard,
                ]}
              >
                <Card
                  sceneContainerSlot={sceneContainerSlot}
                  styleSheet={{
                    sceneContainer: styleSheet.nextSceneContainer,
                    sceneContainerShadow: styleSheet.sceneContainerShadow,
                  }}
                >
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
    const { delayRender } = this.props
    const { isAnimating, layout } = this.state
    if (!layout) return

    // The component was doing nothing and was ready to start a new transition.
    if (isAnimating) {
      this.animatedCurrentCardTranslateX.setValue(0)
      this.animatedCurrentCardOpacity.setValue(1)
      this.animatedNextCardTranslateX.setValue(layout.width + 100)
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
          this.animatedNextCardTranslateX.setValue(layout.width + 100)
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

  /**
   * Store the layout.
   * Push the next scene container on the left
   */
  private onLayout = (layout: LayoutInfo) => {
    this.animatedNextCardTranslateX.setValue(layout.width + 100)
    // @todo this should not be here, coupling too much the general
    // scene transition concept to the card transition effect.
    // This should be the responsability of the choosen transition effect.
    if (!this.state.layout || this.state.layout.width !== layout.width) {
      this.setState({ layout })
    }
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
