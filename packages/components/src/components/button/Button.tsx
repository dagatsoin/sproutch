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
  ref: React.ForwardedRef<View>
) {
  const theme = React.useContext(ThemeContext)

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

  const isOnPaper = variant !== 'contained'
  const overlayColor = getMaterialOverlayColor({
    isOnPaper,
    palette,
    theme,
  })

  // TODO memoize
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

  const ripple = React.useRef<Emitter>()
  const [isHover, setIsHover] = React.useState(false)

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
    <Paper
      elevation={elevation}
      style={styles.paper}
    >
      {backgroundSlot?.(theme)}
      {iconSlot?.(styles.icon.root)}
      {label
        ? <Text style={styles.label.root}>{label}</Text>
        : <></>
      }
      {badgeSlot?.(theme)}
      {!isDisabled && (
        <Fade style={styles.fitParent.root} isVisible={isHover} duration={75}>
          <View style={styles.overlay.root} />
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
      <View style={styles.fitParent.root} onLayout={onLayout}>
        <Pressable
          ref={ref}
          disabled={props.isDisabled}
          style={styles.button.root}
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
})
