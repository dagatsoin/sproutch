import * as React from 'react'
import { LayoutChangeEvent, Text, TextStyle, GestureResponderEvent, Pressable, View, PressableProps, MouseEvent } from 'react-native'

import { StyleProp } from '../../styles'
import { getMaterialOverlayColor } from '../../styles/helpers'
import { Theme } from '../../styles/theme'
import { ThemeContext } from '../../styles/ThemeContext'
import { Fade } from '../fade'
import { Paper } from '../paper'
import { Ripple } from '../ripple'
import Emitter from '../ripple/Emitter'
import createButtonStyle, { ButtonStyleOverride } from './style'

export type ButtonProps = {
  isDisabled?: boolean
  elevation?: number
  style?: ButtonStyleOverride
  isDense?: boolean
  palette?: 'primary' | 'secondary'
  variant?: 'contained' | 'outlined' | 'text'
  label?: string
  iconSlot?: (style: StyleProp<TextStyle>) => React.ReactNode
  backgroundSlot?: (theme: Theme<any, any>) => React.ReactNode
  badgeSlot?: (theme: Theme<any, any>) => React.ReactNode
  onLayout?: (layout: LayoutChangeEvent) => void
} & Omit<PressableProps, 'style' | 'disabled'>

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
      ? React.useCallback(function(nativeRef: View) {
          if (ref) {
            ref.current = nativeRef
          }
        }, [])
      : ref

  function onHoverIn(e: MouseEvent) {
    setIsHover(true)
    props.onHoverIn?.(e)
  }

  function onHoverOut(e: MouseEvent) {
    // When a touch is released outside we need to trigger the onPressOut here.
    ripple.current?.onPressOut()
    setIsHover(false)
    props.onHoverOut?.(e)
  }

  function onLongPress(e: GestureResponderEvent) {
    ripple.current?.onPressOut()
    props.onLongPress?.(e)
  }

  function onPress(e: GestureResponderEvent) {
    ripple.current?.onPressOut()
    props.onPress?.(e)
  }

  function onPressIn(e: GestureResponderEvent) {
    ripple.current?.onPressIn(e)
    props.onPressIn?.(e)
  }

  function onPressOut(e: GestureResponderEvent) {
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
              root: { borderRadius, ...styles.root },
              content: { borderRadius, ...styles.content },
            }}
          >
            {backgroundSlot?.(theme)}
            {iconSlot?.(styles.icon)}
            {label
              ? <Text style={styles.label}>{label}</Text>
              : <></>
            }
            {badgeSlot?.(theme)}
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
              <Pressable
                ref={setRef}
                disabled={props.isDisabled}
                style={styles.button}
                delayLongPress={props.delayLongPress}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onLongPress={onLongPress}
              />
            </View>
          </Paper>
        )
      }}
    </ThemeContext.Consumer>
  )
})
