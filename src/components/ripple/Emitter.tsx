import * as React from 'react'
import { Button, Platform, Types, UserInterface } from 'reactxp'

import { LayoutInfo, View } from '../view'
import { IEmitter } from './IEmitter'
import Particle from './Particle'
import { ParticleProps } from './ParticleProps'
import { containerStyle } from './style'

type Props = {
  onRef?: (emitter: Emitter) => void
  options: {
    color?: string
  }
}

type State = {
  nextKey: number
  particlesInfos: ParticleInfos[]
  rect: LayoutInfo
}

type ParticleInfos = ParticleProps & { id: number }

class Emitter extends React.PureComponent<Props, State> implements IEmitter {
  private static isWeb = Platform.getType() === 'web'
  public state: State = {
    nextKey: 0,
    rect: { width: 0, height: 0, x: 0, y: 0 },
    particlesInfos: [],
  }

  private containerRef: View
  private processingOnPressInHandler = false
  private removeQueue: Array<() => void> = []

  public render() {
    return (
      <View ref={this.onRef} style={containerStyle.root}>
        <Button
          disableTouchOpacityAnimation
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onHoverEnd={this.onPressOut}
          onContextMenu={this.onPressOut}
          style={containerStyle.button}
        >
          {this.state.particlesInfos.map(props => (
            <Particle
              emitterLayout={this.state.rect}
              key={props.id}
              {...props}
            />
          ))}
        </Button>
      </View>
    )
  }

  public onPressIn = (e: Types.SyntheticEvent) => {
    this.addParticle(e.nativeEvent)
  }

  public onPressOut = () => {
    this.killNextParticle()
  }

  private onRef = (view: View) => {
    this.containerRef = view
    this.props.onRef && this.props.onRef(this)
  }

  private async addParticle(event: Types.MouseEvent) {
    this.processingOnPressInHandler = true
    const rect = await UserInterface.measureLayoutRelativeToWindow(
      this.containerRef
    )
    const { width, height, x, y } = rect

    // Get the particle layout
    const cursorX = Emitter.isWeb
      ? Math.round(event.clientX - x)
      : Math.round(event.pageX! - x)
    const cursorY = Emitter.isWeb
      ? Math.round(event.clientY - y)
      : Math.round(event.pageY! - y)

    const radiusFrom = Math.min(width, height) / 2
    const posX = cursorX - radiusFrom
    const posY = cursorY - radiusFrom
    const { color } = this.props.options

    this.setState(
      state => {
        return {
          nextKey: state.nextKey + 1,
          particlesInfos: [
            {
              id: state.nextKey,
              x: posX,
              y: posY,
              isDying: false,
              emitterLayout: rect,
              options: {
                color,
              },
              onDeath: this.onParticleDeath.bind(this),
            },
            ...state.particlesInfos,
          ],
        }
      },
      () => {
        // On slow mobile the onPressOut event comes before the onPressIn
        // because onPressIn is still busy with the layout measurement.
        // So we buffer all the remove actions to execute until the end of the onPressIn handler execution.
        this.removeQueue.forEach(remove => remove())
        this.removeQueue = []
        this.processingOnPressInHandler = false
      }
    )
  }

  private killNextParticle(cb?: () => void) {
    const action = () => {
      const particlesInfos = this.state.particlesInfos
        .slice(0)
        .map((r, index, particles) => {
          // Look if the next particle in the array is already fading or if it the last particle of the array
          // If so, the current particle is the next to fade.
          // If not, don't change.
          return !particles[index + 1] || particles[index + 1].isDying
            ? { ...r, isDying: true }
            : r
        })
      this.setState(
        {
          particlesInfos,
        },
        cb
      )
    }
    if (this.processingOnPressInHandler) {
      this.removeQueue.push(action)
    } else action()
  }

  private onParticleDeath() {
    this.setState({
      particlesInfos: this.state.particlesInfos.slice(
        0,
        this.state.particlesInfos.length - 1
      ),
    })
  }
}

export default Emitter
