import * as React from 'react'
import { Button as RXButton, Types } from 'reactxp'
import { StyleProp, toArray } from '../../styles'
import { getMaterialOverlayColor } from '../../styles/helpers'
import { Theme } from '../../styles/theme'
import { ThemeContext } from '../../styles/ThemeContext'
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
  onLayout?(layout: LayoutInfo): void
} & Omit<Types.ButtonProps, 'children' | 'style'>

export const Button = React.forwardRef(function(
  props: ButtonProps,
  ref: ((instance: unknown) => void) | React.MutableRefObject<unknown> | null
) {
  const ripple = React.useRef<Emitter>()
  const [isHover, setIsHover] = React.useState(false)

  // Workaround for https://github.com/microsoft/reactxp/issues/1259
  // The MutableRefObject are not yet handle by ReactXP
  const setRef =
    typeof ref === 'object'
      ? React.useCallback(function(nativeRef: RXButton) {
          if (ref) {
            ref.current = nativeRef
          }
        }, [])
      : ref

  function onHoverStart(e: Types.SyntheticEvent) {
    setIsHover(true)
    props.onHoverStart?.(e)
  }

  function onHoverEnd(e: Types.SyntheticEvent) {
    // When a touch is released outside we need to trigger the onPressOut here.
    ripple.current?.onPressOut()
    setIsHover(false)
    props.onHoverEnd?.(e)
  }

  function onLongPress(e: Types.SyntheticEvent) {
    ripple.current?.onPressOut()
    props.onLongPress?.(e)
  }

  function onPress(e: Types.SyntheticEvent) {
    ripple.current?.onPressOut()
    props.onPress?.(e)
  }

  function onPressIn(e: Types.SyntheticEvent) {
    ripple.current?.onPressIn(e)
    props.onPressIn?.(e)
  }

  function onPressOut(e: Types.SyntheticEvent) {
    ripple.current?.onPressOut()
    props.onPressOut?.(e)
  }

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
          onLayout,
          style,
        } = props

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
              root: [{ borderRadius }, ...toArray(styles.root)],
              content: [{ borderRadius }, ...toArray(styles.content)],
            }}
          >
            {backgroundSlot && backgroundSlot(theme)}
            {iconSlot && iconSlot(styles.icon)}
            {label && <Text style={styles.label}>{label}</Text>}
            {badgeSlot}
            {!isDisabled && (
              <Fade style={styles.fitParent} isVisible={isHover} duration={75}>
                <View style={styles.overlay} />
              </Fade>
            )}
            {!isDisabled && (
              <Ripple
                onRef={(emitter: Emitter) => {
                  ripple.current = emitter
                }}
                color={overlayColor}
              />
            )}
            <View style={styles.fitParent} onLayout={onLayout}>
              <RXButton
                ref={setRef}
                disabled={isDisabled}
                style={styles.button}
                delayLongPress={props.delayLongPress}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                onLongPress={onLongPress}
              />
            </View>
          </Paper>
        )
      }}
    </ThemeContext.Consumer>
  )
})
