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
  render: () => React.ReactNode
  onTransitionEnd?: (finished: boolean) => void
  delayRender?: number
  dummyScene?: React.ReactNode
}

type State = {
  isAnimating: boolean
  oldRenderScene: () => React.ReactNode
  currentRenderScene: () => React.ReactNode
}

const DURATION = 500

export default class SceneTransition extends React.Component<
  SceneTransitionProps,
  State
> {
  public state: State
  private animatedOldCardOpacity = Animated.createValue(1)
  private animatedOldCardTranslateX = Animated.createValue(0.0)
  private animatedCurrentCardTranslateX = Animated.createValue(0.0)
  private animation?: {
    oldCardFading: AnimatedCompositeAnimation
    oldCardTranslateX: AnimatedCompositeAnimation
    currentCardTranslateX: AnimatedCompositeAnimation
  }
  private controlState:
    | 'isReady'
    | 'isStale'
    | 'isAnimating'
    | 'isAnimationFinished' = 'isReady'

  private animatedStyle: {
    oldCard: AnimatedViewStyleRuleSet
    currentCard: AnimatedViewStyleRuleSet
  } = {
    oldCard: Styles.createAnimatedViewStyle({
      opacity: this.animatedOldCardOpacity,
      transform: [{ translateX: this.animatedOldCardTranslateX }],
    }),
    currentCard: Styles.createAnimatedViewStyle({
      transform: [{ translateX: this.animatedCurrentCardTranslateX }],
    }),
  }
  private layout: LayoutInfo
  private displaySceneDelayHandler: any

  constructor(props: SceneTransitionProps) {
    super(props)
    this.state = {
      isAnimating: false,
      oldRenderScene: () => <></>,
      currentRenderScene: this.props.render,
    }
  }

  public render() {
    const { dummyScene } = this.props
    const { isAnimating, oldRenderScene, currentRenderScene } = this.state
    const shouldDisplayDummy = !!dummyScene && isAnimating
    return (
      <ThemeContext.Consumer>
        {(theme: Theme<any, any>) => {
          const cardStyle = createCardStyle(theme)
          return (
            <View style={containerStyle} onLayout={this.onLayout}>
              {/* Fading the old scene*/}
              <Animated.View style={[cardStyle, this.animatedStyle.oldCard]}>
                {isAnimating && oldRenderScene()}
              </Animated.View>
              {/* Display the (new) current scene */
              currentRenderScene && (
                <Animated.View
                  style={[cardStyle, this.animatedStyle.currentCard]}
                >
                  <SceneContainer>
                    {shouldDisplayDummy ? dummyScene : currentRenderScene()}
                  </SceneContainer>
                </Animated.View>
              )}
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
    const { delayRender } = this.props
    const { isAnimating } = this.state

    // Did the state or the props changed?
    // As the child will be always equal, we need to determine if the state has change.
    // If the state did not change, this means that the update has been triggered by a prop change.
    const stateDidUpdate = Object.keys(prevState).some(
      k => prevState[k] !== this.state[k]
    )
    const newSceneHasBeenReceived = !stateDidUpdate

    /**
     * Control State
     * After the component update, this will tell us in which state (as a state machine) is the component.
     */

    if (this.controlState === 'isReady' && newSceneHasBeenReceived) {
      this.controlState = 'isStale'
    } else if (this.controlState === 'isStale' && isAnimating) {
      this.controlState = 'isAnimating'
    } else if (this.controlState === 'isAnimating') {
      if (!isAnimating) {
        this.controlState = 'isReady'
      } else if (newSceneHasBeenReceived) {
        this.controlState = 'isStale'
      }
    }

    /**
     * Next action predicate
     * What to do next?
     */
    if (this.controlState === 'isStale') {
      if (isAnimating) {
        // The user click on another router during the animation.
        // Let's continue the animation but change the next scene.
        this.setState({
          currentRenderScene: this.props.render,
        })
      } else {
        // The component was doing nothing and was ready to start a new transition.
        this.stopAnimation()
        if (this.displaySceneDelayHandler) {
          clearTimeout(this.displaySceneDelayHandler)
        }
        this.animatedOldCardTranslateX.setValue(0)
        this.animatedOldCardOpacity.setValue(1)
        this.animatedCurrentCardTranslateX.setValue(this.layout.width)
        this.animation = this.getAnimation({
          oldCardTranslateX: -30,
          currentCardTranslateX: 0,
        })
        const onTransitionEnd = ({ finished }: { finished: boolean }) => {
          if (finished) {
            this.setState({
              isAnimating: false,
              oldRenderScene: () => <></>,
              currentRenderScene: this.state.currentRenderScene,
            })
            this.animation = undefined
          }
          this.props.onTransitionEnd && this.props.onTransitionEnd(finished)
        }

        // If the user set a delay used it tro display the next scene, otherwize display the scene at the transition end
        if (delayRender) {
          this.startAnimation()
          this.displaySceneDelayHandler = setTimeout(
            () => onTransitionEnd({ finished: true }),
            delayRender
          )
        } else {
          this.startAnimation(onTransitionEnd)
        }
        this.setState({
          oldRenderScene: this.state.currentRenderScene,
          currentRenderScene: this.props.render,
          isAnimating: true,
        })
      }
    }
  }

  private startAnimation(
    callBack?: ({ finished }: { finished: boolean }) => void
  ) {
    if (!this.animation) return
    this.animation.oldCardFading.start()
    this.animation.oldCardTranslateX.start()
    this.animation.currentCardTranslateX.start(callBack)
  }

  private stopAnimation() {
    if (!this.animation) return
    this.animation.oldCardFading.stop()
    this.animation.oldCardTranslateX.stop()
    this.animation.currentCardTranslateX.stop()
  }

  private onLayout = (layout: LayoutInfo) => {
    this.layout = layout
  }

  private getAnimation(to: {
    oldCardTranslateX: number
    currentCardTranslateX: number
  }) {
    return {
      oldCardFading: Animated.timing(this.animatedOldCardOpacity, {
        toValue: 0.5,
        duration: DURATION,
        easing: Animated.Easing.InOut(),
      }),
      oldCardTranslateX: Animated.timing(this.animatedOldCardTranslateX, {
        toValue: to.oldCardTranslateX,
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
    }
  }
}
