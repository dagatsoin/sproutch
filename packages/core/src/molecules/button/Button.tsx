import * as React from 'react'
import {
  LayoutChangeEvent,
  Text,
  TextStyle,
  GestureResponderEvent,
  Pressable,
  View,
  PressableProps,
  MouseEvent,
  StyleProp,
  Animated,
} from 'react-native'

import { fitParent, getMaterialOverlayColor } from '../../styles'
import { Theme } from '../../styles/theme'
import { ThemeContext } from '../../styles/ThemeContext'
import { Paper } from '../../atoms/paper'
import { Ripple } from '../../atoms/ripple'
import Emitter from '../../atoms/ripple/Emitter'
import createButtonStyle, { ButtonStyleOverride } from './style'
import { useRef } from 'react'

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

  const ripple = React.useRef<Emitter>(undefined)
  const opacityRef = useRef(new Animated.Value(0))
  
  const overlayFadeStyle = React.useMemo(() => ({...fitParent.root, ...{opacity: opacityRef.current}}), [])

  function onHoverIn(e: MouseEvent) {
    Animated.timing(opacityRef.current, {
      toValue: 1,
      duration: 75,
      useNativeDriver: true,
    }).start()
    props.onHoverIn?.(e)
  }

  function onHoverOut(e: MouseEvent) {
    // When a touch is released outside we need to trigger the onPressOut here.
    ripple.current?.onPressOut()
    Animated.timing(opacityRef.current, {
      toValue: 0,
      duration: 75,
      useNativeDriver: true,
    }).start()
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
        ? <Text selectable={false} style={styles.label.root}>{label}</Text>
        : <></>
      }
      {badgeSlot?.(theme)}
      {!isDisabled && (
        <Animated.View style={overlayFadeStyle}>
          <View style={styles.overlay.root} />
        </Animated.View>
      )}
      {!isDisabled && (
        <Ripple
          onRef={(emitter: Emitter) => {
            ripple.current = emitter
          }}
          color={overlayColor}
        />
      )}
      <View style={fitParent.root} onLayout={onLayout}>
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
