import * as React from 'react'
import { Button, Platform, Types, UserInterface } from 'reactxp'
import { LayoutInfo, View } from '../view'
import { IEmitter } from './IEmitter'
import { ParticleProps } from './ParticleProps'
import { containerStyle } from './style'

type Props = {
  particle: React.ComponentType<ParticleProps<any>>
  onRef?: (emitter: Emitter) => void
  options: object
}

type State = {
  nextKey: number
  particlesInfos: ParticleInfos[]
  rect: LayoutInfo
  isUnmounted: boolean
}

type ParticleInfos = ParticleProps<any> & { id: number }

class Emitter extends React.PureComponent<Props, State> implements IEmitter {
  private static isWeb = Platform.getType() === 'web'
  public state: State = {
    isUnmounted: false,
    nextKey: 0,
    rect: { width: 0, height: 0, x: 0, y: 0 },
    particlesInfos: [],
  }

  private containerRef?: View
  private processingOnPressInHandler = false
  private removeQueue: Array<() => void> = []

  public render() {
    const Particle = this.props.particle
    return (
      <View
        ref={this.onRef}
        style={containerStyle.root}
        onLayout={() => {
          /* https://github.com/facebook/react-native/issues/3282 still needed despit RN effort */
        }}
      >
        <Button
          disableTouchOpacityAnimation
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onHoverEnd={this.onPressOut}
          onContextMenu={this.onPressOut}
          style={containerStyle.button}
        >
          {this.state.particlesInfos.map(props => {
            return (
              <Particle
                {...props}
                emitterLayout={this.state.rect}
                key={props.id}
              />
            )
          })}
        </Button>
      </View>
    )
  }

  public onPressIn = (e: Types.SyntheticEvent) => {
    // Persist the event until the particle is created.
    ;(e as any).persist()
    this.addParticle(e)
  }

  public onPressOut = () => {
    this.killNextParticle()
  }

  public componentWillUnmount() {
    this.setState({ isUnmounted: true })
  }

  private onRef = (view: View) => {
    this.containerRef = view
    this.props.onRef && this.props.onRef(this)
  }

  private async addParticle(event: Types.SyntheticEvent) {
    if (!this.containerRef) return
    this.processingOnPressInHandler = true
    try {
      const rect = await UserInterface.measureLayoutRelativeToWindow(
        this.containerRef
      )
      const { width, height, x, y } = rect
      const touch: Types.Touch | undefined = event.nativeEvent.touches?.[0]

      // Get the particle layout
      const clientX = touch
        ? // Webview
          touch.clientX ||
          // RN
          touch.locationX
        : (event as Types.MouseEvent).clientX

      const clientY = touch
        ? // Webview
          touch.clientY ||
          // RN
          touch.locationY
        : (event as Types.MouseEvent).clientY

      const pageX = touch ? touch.pageX : (event as Types.MouseEvent).pageX

      const pageY = touch ? touch.pageY : (event as Types.MouseEvent).pageY

      if (clientX && clientY && pageX && pageY) {
        const cursorX = Emitter.isWeb
          ? Math.round(clientX - x)
          : Math.round(pageX! - x)
        const cursorY = Emitter.isWeb
          ? Math.round(clientY - y)
          : Math.round(pageY! - y)

        const radiusFrom = Math.min(width, height) / 2
        const posX = cursorX - radiusFrom
        const posY = cursorY - radiusFrom
        const { options } = this.props
        this.setState(
          state => {
            return {
              nextKey: state.nextKey + 1,
              particlesInfos: [
                {
                  rect,
                  id: state.nextKey,
                  x: posX,
                  y: posY,
                  isDying: false,
                  emitterLayout: rect,
                  options,
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
    } catch (e) {
      console.warn(e)
    }
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
    if (!this.state.isUnmounted) {
      this.setState({
        particlesInfos: this.state.particlesInfos.slice(
          0,
          this.state.particlesInfos.length - 1
        ),
      })
    }
  }
}

export default Emitter
