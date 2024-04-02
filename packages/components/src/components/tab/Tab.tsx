import { useContext, useState, useRef } from 'react'
import { LayoutRectangle, Pressable, Text, TextStyle, Touchable, View } from 'react-native'

import { componentDidMount, componentWillMount, componentWillUnmount } from '../../helpers'
import { getMaterialOverlayColor } from '../../styles/helpers'
import { StyleSheet } from '../../styles'
import { ThemeContext } from '../../styles/ThemeContext'
import { Fade } from '../fade'
import { Ripple } from '../ripple'
import Emitter from '../ripple/Emitter'
import { fitParent, tabStyle, TabStyleOverride } from './styles'

export type TabProps = {
  id: string
  iconSlot?: (
    style: TextStyle
  ) => React.ReactNode
  label?: string
  isDisabled?: boolean
  style?: TabStyleOverride
  badgeSlot?: React.ReactNode
}

type CompleteProps = {
  mustGrow?: boolean
  palette?: 'primary' | 'secondary'
  hasIconOnTop?: boolean
  isActive: boolean
  isFrozen?: boolean
  onPress: (index: string) => void
  onUnmount: (id: string) => void
  onTabLayout: (tab: { id: string; layout: LayoutRectangle }) => void
  onWillMount: (id: string) => void
} & TabProps

function noop() { }

function Tab(props: CompleteProps & Omit<Touchable, 'onPointerDown'>) {
  const theme = useContext(ThemeContext)
  const [isHover, setIsHover] = useState(false)
  const layout = useRef<LayoutRectangle>()
  const ripple = useRef<Emitter>()
  const isActionAllowed = useRef(false)

  const onLayout = useRef((newLayout: LayoutRectangle) => {
    const { id, onTabLayout } = props
    if (
      layout.current !== undefined &&
      layout.current.height === newLayout.height &&
      layout.current.width === newLayout.width &&
      layout.current.x === newLayout.x &&
      layout.current.y === newLayout.y
    ) {
      return
    }

    // Round the layout value because hi density screen subpixel value could cause different behavior

    layout.current = {
      x: Math.round(newLayout.x),
      y: Math.round(newLayout.y),
      width: Math.round(newLayout.width),
      height: Math.round(newLayout.height),
    }

    onTabLayout?.({
      id,
      layout: layout.current,
    })
  })

  componentWillMount(function () {
    const { onWillMount = () => { } } = props
    onWillMount(props.id)
  })

  componentDidMount(function () {
    layout.current && onLayout.current(layout.current)
  })

  componentWillUnmount(function () {
    const { id, onUnmount = () => { } } = props
    onUnmount(id)
  })

  const blockActionDuringScroll = useRef(function () {
    isActionAllowed.current = false
    ripple.current?.onPressOut()
  })

  const allowActionDuringScroll = useRef(function () {
    isActionAllowed.current = true
  })

  const {
    id,
    iconSlot,
    label,
    isActive = false,
    isDisabled = false,
    isFrozen = false,
    hasIconOnTop = false,
    mustGrow = false,
    palette,
    badgeSlot,
    style,
    onPress = noop,
  } = props
  const isOnPaper = palette !== undefined
  const overlayColor = getMaterialOverlayColor({
    isOnPaper,
    palette,
    theme,
  })

  const styles = {
    tab: tabStyle({
      theme,
      palette,
      style,
      overlayColor,
      options: {
        hasIconOnTop,
        isDisabled,
        isActive,
        mustGrow,
        hasIcon: !!iconSlot,
        hasLabel: !!label,
      },
    }),
    flex: StyleSheet.create({
      root: {
        flex: 1
      }
    })
  }

  return (
    <View
      onResponderMove={blockActionDuringScroll.current}
      onResponderRelease={allowActionDuringScroll.current}
      onLayout={e => onLayout.current(e.nativeEvent.layout)}
      style={styles.tab.root}
    >
      {iconSlot && iconSlot(styles.tab.icon)}
      {label && <Text style={styles.tab.label}>{label}</Text>}
      {badgeSlot}
      <Fade style={fitParent.root} isVisible={isHover} duration={75}>
        <View style={styles.tab.overlay} />
      </Fade>
      {(!isDisabled && !isFrozen) && (
        <View style={fitParent.root}>
          <Ripple
            onRef={(emitter: Emitter) => {
              ripple.current = emitter
            }}
            color={overlayColor}
          />
          <Pressable
            disabled={isDisabled}
            style={styles.flex.root}
            onPress={function() {
              !isFrozen && isActionAllowed && onPress(id)
            }}
            onPressIn={ripple.current?.onPressIn}
            onPressOut={ripple.current?.onPressOut}
            onHoverIn={function() {
              setIsHover(true)
            }}
            onHoverOut={function() {
              // prevents a bug on Web where onPressOut
              // is not called whend the touch is released outside
              ripple.current?.onPressOut()
              setIsHover(false)
            }}
          >

          </Pressable>
        </View>
      )}
    </View>
  )
}

export default Tab
