import * as React from 'react'
import { Button, UserInterface, Platform } from 'reactxp'

import Ripple, { RippleProps } from './Ripple'
import { containerStyle } from './style'
import { View } from '../view'
import { ThemeContext } from '../../styles/theme'
import { Types } from '../../styles/createStyleSheet'
import { Fade } from '../fade'

type Props = {
  isOnPaper?: boolean
  palette?: 'primary' | 'secondary',
}

type State = {
  nextKey: number
  ripplesProps: RippleInfo[]
  isHover: boolean
  cb?: () => void
}

type RippleInfo = RippleProps & { id: number }

class RippleCreator extends React.PureComponent<Props, State> {
  public  state: State = {
    nextKey: 0,
    ripplesProps: [],
    isHover: false
  }

  static isWeb = Platform.getType() === 'web'

  private containerRef: View
  private processingOnPressInHandler = false
  private removeQueue: Function[] = []

  public render() {
    const { isOnPaper, palette } = this.props
    return (
      <ThemeContext.Consumer>
        { theme => {
          const styleSheet = containerStyle({
            isOnPaper,
            palette,
            theme
          })

          return (
            <View
              ref={(comp: View) => this.containerRef = comp}
              style={styleSheet.root}
            >
              <Fade isVisible={this.state.isHover}>
                <View style={styleSheet.overlay}/>
              </Fade>
              <Button
                disableTouchOpacityAnimation
                onHoverStart={() => {
                  this.setState({isHover: true})
                }}
                onPressIn={this.onPressIn.bind(this)}
                onPressOut={this.onPressOut.bind(this)}
                onHoverEnd={() => {
                  this.setState({isHover: false})
                  this.onPressOut()
                }}
                onContextMenu={this.onPressOut.bind(this)}
                style={styleSheet.button}
              >
                {this.state.ripplesProps.map(props => (
                  <Ripple
                    key={props.id}
                    {...props}
                  />
                ))}
              </Button>
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  private onPressIn(e: Types.SyntheticEvent) {
    this.addRipple(e.nativeEvent)
  }

  private onPressOut() {
    this.fadeNextRipple() 
  }

  private async addRipple (event: Types.MouseEvent, cb = () => null) {
    this.processingOnPressInHandler = true
    const rect = await UserInterface.measureLayoutRelativeToWindow(this.containerRef)

    // Get the ripple layout
    const cursorX = RippleCreator.isWeb
      ? Math.round(event.clientX - rect.x)
      : Math.round(event.pageX! - rect.x)
    const cursorY =  RippleCreator.isWeb
      ? Math.round(event.clientY - rect.y)
      : Math.round(event.pageY! - rect.y)

    const radiusFrom =  Math.min(rect.width, rect.height) / 2
    const posX = cursorX - radiusFrom
    const posY = cursorY - radiusFrom
    const radiusTo = Math.sqrt(rect.width ** 2 + rect.height ** 2)
    const { isOnPaper, palette } = this.props

    this.setState(
      state => {
        return {
          nextKey: state.nextKey + 1,
          ripplesProps: [
            {
              id: state.nextKey,
              x: posX,
              y: posY,
              radiusTo,
              radiusFrom,
              isFading: false,
              isOnPaper,
              palette,
              onRippleEnd: this.onRippleEnd.bind(this)
            },
            ...state.ripplesProps,
          ],
        }
      },
      cb
    )
    // on slow mobile the onPressOut event comes befor the onPressIn because onPressIn is still busy with the layout measurement.
    // so we buffer all the remove actions to execute until the end of the onPressIn handler execution.
    this.removeQueue.forEach(remove => remove())
    this.removeQueue = []
    this.processingOnPressInHandler = false
  }

  private fadeNextRipple(cb?: () => void) {
    const action = () => {
      const ripplesProps = this.state.ripplesProps
        .slice(0)
        .map((r, index, ripples) => {
          // Look if the next ripple in the array is already fading or if it the last ripple of the array
          // If so, the current ripple is the next to fade.
          // If not, don't change.
          return (!ripples[index + 1] || ripples[index + 1].isFading)
            ? {...r, isFading: true}
            : r
        })
      
      this.setState(
        {
          ripplesProps
        },
        cb,
      )
    }
    if (this.processingOnPressInHandler) {
      this.removeQueue.push(action)
    } else action()
  }

  private onRippleEnd() {
    this.setState({
      ripplesProps: this.state.ripplesProps.slice(0, this.state.ripplesProps.length - 1)
    })
  }
}

export default RippleCreator