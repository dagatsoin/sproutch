import * as React from 'react'
import { Types, UserInterface } from 'reactxp'
import { ThemeContext } from '../../styles'
import { Paper } from '../paper'
import { LayoutInfo, View } from '../view'
import { createStyle, SliderStyleOverride } from './style'
import { useWindowDimensions } from './useWindowDimensions'

type Props = {
  range: [number, number]
  steps?: number
  isAmount?: boolean
  value?: number
  palette?: 'primary' | 'secondary'
  style?: SliderStyleOverride
  onChange?(value: number): void
}

export function Slider({
  isAmount,
  value,
  range,
  palette,
  steps,
  style: styleOverride,
  onChange,
}: Props) {
  const theme = React.useContext(ThemeContext)
  const { root, unusedSegment, usedSegment, cursor } = createStyle({
    theme,
    palette,
    styleOverride,
  })
  const [posX, setPos] = React.useState(0)
  const [width, setWidth] = React.useState<number>(0)
  const layoutRef = React.useRef<LayoutInfo>()
  const rootViewRef = React.useRef<View | null>()
  // Once the component is mounted, we retrieve its width to
  // position the cursor.
  // At this point, the x property is not reliable because the parent
  // can still move. (eg. a first render off screen for a slide transition)
  const setRootRef = React.useCallback(function(rootView: View) {
    rootViewRef.current = rootView
    if (rootView) {
      UserInterface.measureLayoutRelativeToWindow(rootViewRef.current).then(
        layout => {
          setPos(getInitialPos({ value, range, width: layout.width }))
          setWidth(layout.width)
        }
      )
    }
  }, [])

  // Create an event listener which will update the X position
  const dragX = rootViewRef.current
    ? createHandler({
        setPos,
        layoutRef,
        view: rootViewRef.current,
      })
    : undefined

  const pressX = rootViewRef.current
    ? createHandler({
        setPos,
        layoutRef,
        view: rootViewRef.current,
        isMouseClick: true,
      })
    : undefined

  // Prevent the cursor to exit the component.
  const position = getClampedPosition({ steps, posX, width })
  // Compute the new value when the user moves the cursor
  const valueFromState = getValue({ range, position, width })
  // Dispatch this new value to the listener
  React.useEffect(() => {
    // Prevent return NaN
    onChange?.(isNaN(valueFromState) ? 0 : valueFromState)
  }, [valueFromState])

  // Refresh on window resize
  const windowWidth = useWindowDimensions()
  React.useEffect(() => {
    if (rootViewRef.current) {
      UserInterface.measureLayoutRelativeToWindow(rootViewRef.current).then(
        l => {
          // Reset layout
          layoutRef.current = undefined
          setWidth(l.width)
        }
      )
    }
  }, [windowWidth])

  return (
    <View
      style={root}
      ref={setRootRef}
      onPress={pressX as any}
      onResponderMove={dragX}
      onMouseMove={dragX}
    >
      {isAmount && <View style={unusedSegment} />}
      <View
        style={[
          usedSegment,
          isAmount
            ? {
                right: width - position,
              }
            : undefined,
        ]}
      />
      <Paper
        style={{
          root: [
            cursor,
            {
              left: position - 10,
            },
          ],
        }}
        elevation={1}
      />
    </View>
  )
}

function getValue({
  range,
  position = 0,
  width = 0,
}: {
  range: [number, number]
  step?: number
  width?: number
  position?: number
}) {
  const _range = range[1] - range[0]
  const delta = (position * _range) / width
  return range[0] + delta
}

function getClampedPosition({
  steps,
  posX,
  width = 0,
}: {
  steps?: number
  posX: number
  width?: number
}) {
  const stepWidth = steps && steps > 0 ? width / steps : NaN

  const clampedPosition = Math.min(Math.max(0, posX), width)
  const position =
    steps && steps > 0
      ? Math.round(clampedPosition / stepWidth) * stepWidth
      : clampedPosition

  return isNaN(position) ? 0 : position
}

function createHandler({
  setPos,
  view,
  layoutRef,
  isMouseClick,
}: {
  setPos: React.Dispatch<React.SetStateAction<number>>
  view?: View
  layoutRef: React.MutableRefObject<LayoutInfo | undefined>
  isMouseClick?: boolean
}) {
  if (view) {
    return function(e: Types.TouchEvent | Types.MouseEvent) {
      // On first click/drag, set layout
      if (layoutRef.current === undefined && view) {
        UserInterface.measureLayoutRelativeToWindow(view)
          .then(layout => (layoutRef.current = layout))
          .catch(console.warn)
      }
      if (layoutRef.current !== undefined) {
        if ('targetTouches' in e) {
          setPos(
            Math.min(
              Math.max(0, e.touches[0].clientX - layoutRef.current.x),
              layoutRef.current.width
            )
          )
        } else {
          // If it is a drag
          if (e.nativeEvent.buttons > 0 || isMouseClick) {
            setPos(Math.max(0, e.clientX - layoutRef.current.x))
          }
        }
      }
    }
  }
  return undefined
}

function getInitialPos({
  value = 0,
  range,
  width,
}: {
  value?: number
  width: number
  range: [number, number]
}) {
  const delta = range[1] - range[0]
  return (value * width) / delta
}
