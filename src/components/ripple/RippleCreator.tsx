import * as React from 'react'
import { GestureView, UserInterface } from 'reactxp'

import Ripple from './Ripple'
import style from './style'
import { View } from '../view'
import { ThemeContext } from '../../styles/theme'
import { Types } from '../../styles/createStyleSheet'

const DURATION = 550
export const DELAY_RIPPLE = 80

type State = {
  nextKey: number
  ripples: JSX.Element[]
}

class RippleCreator extends React.PureComponent<{}, State> {
  public  state: State = {
    nextKey: 0,
    ripples: [],
  }

  private containerRef: View
  private startTimer: number
  private startTimerCommit: (() => void) | null

  public componentWillUnmount() {
    clearTimeout(this.startTimer)
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        { theme => {
          const styleSheet = style({
            theme
          })
          return (
            <GestureView
              onTap={this.onTap}
              ref={(comp: View) => this.containerRef = comp}
              style={styleSheet.root}
            >
              <View/>
              {
                this.state.ripples.forEach(console.log)
              }
            </GestureView>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  private onTap = (gestureState: Types.TapGestureState) => {
    this.start(gestureState, true)
  }

  private start = async ({ clientX, clientY }: Types.TapGestureState, pulsate: boolean, cb?: () => void) => {
    const rect = await UserInterface.measureLayoutRelativeToWindow(this.containerRef)
    
    // Get the size of the ripple
    const rippleX = Math.round(clientX - rect.x)
    const rippleY = Math.round(clientY - rect.y)

    const sizeX = Math.max(Math.abs(rect.width - rippleX), rippleX) * 2 + 2
    const sizeY = Math.max(Math.abs(rect.height - rippleY), rippleY) * 2 + 2
    const rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2)

    // Prepare the ripple effect.
    this.startTimerCommit = () => {
      this.startCommit({ pulsate, rippleX, rippleY, rippleSize, cb })
    }

    // Delay the execution of the ripple effect.
    this.startTimer = window.setTimeout(
      () => {
        if (this.startTimerCommit) {
          this.startTimerCommit()
          this.startTimerCommit = null
        }
      },
      DELAY_RIPPLE
    )
  }

  private stop(event: any, cb: () => void) {
    clearTimeout(this.startTimer)
    const { ripples } = this.state

    // The toAnalyserOptionsuch interaction occurs too quickly.
    // We still want to show ripple effect.
    if (event.type === 'touchend' && this.startTimerCommit) {
      event.persist()
      this.startTimerCommit()
      this.startTimerCommit = null
      this.startTimer = window.setTimeout(
        () => {
          this.stop(event, cb)
        },
        0
      )
      return
    }

    this.startTimerCommit = null

    if (ripples && ripples.length) {
      this.setState(
        {
          ripples: ripples.slice(1),
        },
        cb,
      )
    }
  }

  private startCommit({
    pulsate,
    rippleX,
    rippleY,
    rippleSize,
    cb
  }: {
    pulsate: boolean
    rippleX: number
    rippleY: number
    rippleSize: number
    cb?: () => void
  }) {
    this.setState(
      state => {
        return {
          nextKey: state.nextKey + 1,
          ripples: [
            ...state.ripples,
            (
              <Ripple
                key={state.nextKey}
                timeout={{
                  exit: DURATION,
                  enter: DURATION,
                }}
                pulsate={pulsate}
                rippleX={rippleX}
                rippleY={rippleY}
                rippleSize={rippleSize}
              />
            ),
          ],
        }
      },
      cb
    )
  }
}

export default RippleCreator