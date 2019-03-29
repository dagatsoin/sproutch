import * as React from 'react'
import { Button as RXButton, Styles, Types } from 'reactxp'

import { StyleProp } from '../../styles'
import { Theme, ThemeContext } from '../../styles/theme'
import { Fade } from '../fade'
import { Paper } from '../paper'
import { Ripple } from '../ripple'
import Emitter from '../ripple/Emitter'
import { Text, TextStyle } from '../text'
import { View } from '../view'
import createButtonStyle, { ButtonStyleOverride } from './style'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ButtonProps = {
  isDisabled?: boolean
  elevation?: number
  style?: ButtonStyleOverride
  isDense?: boolean
  palette?: 'primary' | 'secondary'
  variant?: 'contained' | 'outlined' | 'text'
  iconSlot?: (style: StyleProp<TextStyle>) => React.ReactNode
  label?: string
  backgroundSlot?: (theme: Theme<any, any>) => React.ReactNode
  badgeSlot?: (theme: Theme<any, any>) => React.ReactNode
} & Omit<Types.ButtonProps, 'children'>

function noop() {}

type State = {
  isHover: boolean
}

class Button extends React.PureComponent<ButtonProps, State> {
  public state: State = {
    isHover: false,
  }
  private ripple: Emitter

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          const {
            label,
            elevation = 0,
            isDisabled = false,
            palette = 'primary',
            variant,
            isDense = false,
            iconSlot,
            backgroundSlot,
            badgeSlot,
            onPress = noop,
            style,
          } = this.props

          const styles = createButtonStyle({
            theme,
            palette,
            style,
            variant,
            options: {
              isDense,
              isDisabled,
              hasIcon: !!iconSlot,
            },
          })

          const borderRadius =
            (style && style.root && style.root['borderRadius']) || 0

          const rippleColor =
            (style && style.overlay && style.overlay['backgroundColor']) ||
            undefined

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
                  color={rippleColor}
                  palette={palette}
                  isOnPaper={variant !== 'contained'}
                />
              )}
              <View style={styles.fitParent}>
                <RXButton
                  disabled={isDisabled}
                  style={Styles.createViewStyle({
                    flex: 1,
                  })}
                  onPress={onPress}
                  onPressIn={e => this.ripple.onPressIn(e)}
                  onPressOut={() => this.ripple.onPressOut()}
                  onHoverStart={() => {
                    this.setState({ isHover: true })
                  }}
                  onHoverEnd={() => {
                    // prevents a bug on Web where onPressOut
                    // is not called whend the touch is released outside
                    this.ripple.onPressOut()
                    this.setState({ isHover: false })
                  }}
                />
              </View>
            </Paper>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Button
