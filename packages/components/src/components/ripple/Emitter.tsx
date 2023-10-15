import * as React from 'react'
import { IEmitter } from './IEmitter'
import { ParticleProps } from './ParticleProps'
import { containerStyle } from './style'
import { GestureResponderEvent, Pressable, View } from 'react-native'
import { measureLayoutRelativeToWindow } from '../../utils'
import { MDRippleParticleOptions } from './MDRippleParticle'

type Props = {
  particle: React.ComponentType<ParticleProps<MDRippleParticleOptions>>
  onRef?: (emitter: Emitter) => void
  options: object
}

type State = {
  nextKey: number
  particlesInfos: ParticleInfos[]
  isUnmounted: boolean
}

type ParticleInfos = ParticleProps<MDRippleParticleOptions> & { id: number }

class Emitter extends React.PureComponent<Props, State> implements IEmitter {
  public state: State = {
    isUnmounted: false,
    nextKey: 0,
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
        <Pressable
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onHoverOut={this.onPressOut}
          style={containerStyle.button}
        >
          {this.state.particlesInfos.map(props => {
            return <Particle {...props} key={props.id} />
          })}
        </Pressable>
      </View>
    )
  }

  public onPressIn = (e: GestureResponderEvent) => {
    // Persist the event until the particle is created.
    e.persist()
    void this.addParticle(e)
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

  private  addParticle = async(event: GestureResponderEvent) => {
    if (!this.containerRef) return
    this.processingOnPressInHandler = true
    try {
      const rect = await measureLayoutRelativeToWindow(
        this.containerRef
      )
      const { width, height } = rect

      // Get the particle layout
      const { locationX, locationY  } = event.nativeEvent

      const cursorX = locationX
      const cursorY = locationY

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
              } as never,
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
