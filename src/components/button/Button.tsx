import * as React from 'react'
import { Button as RXButton, Styles, Types } from 'reactxp'

import { StyleProp } from '../../styles'
import { getMaterialOverlayColor } from '../../styles/helpers'
import { Theme, ThemeContext } from '../../styles/theme'
import { Fade } from '../fade'
import { Paper } from '../paper'
import { Ripple } from '../ripple'
import Emitter from '../ripple/Emitter'
import { Text, TextStyle } from '../text'
import { LayoutInfo, View } from '../view'
import createButtonStyle, { ButtonStyleOverride } from './style'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ButtonProps = {
  isDisabled?: boolean
  elevation?: number
  style?: ButtonStyleOverride
  isDense?: boolean
  palette?: 'primary' | 'secondary'
  variant?: 'contained' | 'outlined' | 'text'
  label?: string
  iconSlot?(style: StyleProp<TextStyle>): React.ReactNode
  backgroundSlot?(theme: Theme<any, any>): React.ReactNode
  badgeSlot?(theme: Theme<any, any>): React.ReactNode
  onRef?(instance: Button): void
  nativeRef?(instance: RXButton): void
  onLayout?(layout: LayoutInfo): void
} & Omit<Types.ButtonProps, 'children'>

type State = {
  isHover: boolean
}

class Button extends React.PureComponent<ButtonProps, State> {
  public state: State = {
    isHover: false,
  }
  private ripple?: Emitter

  public componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          const {
            label,
            elevation = 0,
            isDisabled = false,
            palette,
            variant = 'contained',
            isDense = false,
            iconSlot,
            backgroundSlot,
            badgeSlot,
            nativeRef,
            onLayout,
            style,
          } = this.props

          const borderRadius =
            (style && style.root && style.root['borderRadius']) || 0
          const isOnPaper = variant !== 'contained'
          const overlayColor = getMaterialOverlayColor({
            isOnPaper,
            palette,
            theme,
          })

          const styles = createButtonStyle({
            theme,
            palette,
            style,
            variant,
            overlayColor,
            options: {
              isDense,
              isDisabled,
              hasIcon: !!iconSlot,
            },
          })

          return (
            <Paper
              elevation={elevation}
              style={{
                root: {
                  ...(styles.root as object),
                  borderRadius,
                },
                content: {
                  ...(styles.content as object),
                  borderRadius,
                },
              }}
            >
              {backgroundSlot && backgroundSlot(theme)}
              {iconSlot && iconSlot(styles.icon)}
              {label && <Text style={styles.label}>{label}</Text>}
              {badgeSlot}
              {!isDisabled && (
                <Fade
                  style={styles.fitParent}
                  isVisible={this.state.isHover}
                  duration={75}
                >
                  <View style={styles.overlay} />
                </Fade>
              )}
              {!isDisabled && (
                <Ripple
                  onRef={(emitter: Emitter) => {
                    this.ripple = emitter
                  }}
                  color={overlayColor}
                />
              )}
              <View style={styles.fitParent} onLayout={onLayout}>
                <RXButton
                  ref={nativeRef}
                  disabled={isDisabled}
                  style={styles.button}
                  delayLongPress={this.props.delayLongPress}
                  onPress={this.onPress}
                  onPressIn={this.onPressIn}
                  onPressOut={this.onPressOut}
                  onHoverStart={this.onHoverStart}
                  onHoverEnd={this.onHoverEnd}
                  onLongPress={this.onLongPress}
                />
              </View>
            </Paper>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
  private onHoverStart = (e: Types.SyntheticEvent) => {
    const { onHoverStart } = this.props
    this.setState({ isHover: true })
    onHoverStart && onHoverStart(e)
  }
  private onHoverEnd = (e: Types.SyntheticEvent) => {
    const { onHoverEnd } = this.props
    // When a touch is released outside we need to trigger the onPressOut here.
    this.ripple && this.ripple.onPressOut()
    this.setState({ isHover: false })
    onHoverEnd && onHoverEnd(e)
  }

  private onLongPress = (e: Types.SyntheticEvent) => {
    const { onLongPress } = this.props
    this.ripple && this.ripple.onPressOut()
    onLongPress && onLongPress(e)
  }

  private onPress = (e: Types.SyntheticEvent) => {
    const { onPress } = this.props
    this.ripple && this.ripple.onPressOut()
    onPress && onPress(e)
  }

  private onPressIn = (e: Types.SyntheticEvent) => {
    const { onPressIn } = this.props
    this.ripple && this.ripple.onPressIn(e)
    onPressIn && onPressIn(e)
  }

  private onPressOut = (e: Types.SyntheticEvent) => {
    const { onPressOut } = this.props
    this.ripple && this.ripple.onPressOut()
    onPressOut && onPressOut(e)
  }
}
export default Button
