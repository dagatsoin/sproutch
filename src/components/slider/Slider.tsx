import * as React from 'react'
import { Types, UserInterface } from 'reactxp'
import { ThemeContext } from '../../styles'
import { Paper } from '../paper'
import { LayoutInfo, View } from '../view'
import { createStyle, SliderStyleOverride } from './style'

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
  const [xPos, setPos] = React.useState(0)
  const [layout, setLayout] = React.useState<LayoutInfo>()
  // Once the component is mounted, we retrieve its width.
  const setRootRef = React.useCallback(function(rootView: View) {
    UserInterface.measureLayoutRelativeToWindow(rootView)
      .then(l => {
        // The width is now known.
        // We set the initial cursor position regarding the
        // given value from props
        setLayout(l)
        setPos(getInitialPos({ range, value, layout: l }))
      })
      .catch(console.warn)
  }, [])
  // Create an event listener which will update the X position
  const dragX = useDrag({ setPos, layout })
  // Prevent the cursor to exit the component.
  const position = getClampedPosition({ steps, xPos, width: layout?.width })
  // Compute the new value when the user moves the cursor
  const valueFromState = getValue({ range, position, width: layout?.width })
  // Dispatch this new value to the listener
  React.useEffect(() => {
    // Prevent return NaN
    onChange?.(isNaN(valueFromState) ? 0 : valueFromState)
  }, [valueFromState])

  return (
    <View
      style={root}
      ref={setRootRef}
      onResponderMove={dragX}
      onMouseMove={dragX}
    >
      {isAmount && <View style={unusedSegment} />}
      <View
        style={[
          usedSegment,
          isAmount
            ? {
                right: (layout?.width ?? 0) - position,
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
  xPos,
  width = 0,
}: {
  steps?: number
  xPos: number
  width?: number
}) {
  const stepWidth = steps && steps > 0 ? width / steps : NaN

  const clampedPosition = Math.min(Math.max(0, xPos), width)
  const position =
    steps && steps > 0
      ? Math.round(clampedPosition / stepWidth) * stepWidth
      : clampedPosition

  return isNaN(position) ? 0 : position
}

function useDrag({
  setPos,
  layout,
}: {
  setPos: React.Dispatch<React.SetStateAction<number>>
  layout?: LayoutInfo
}) {
  return layout
    ? function(e: Types.TouchEvent | Types.MouseEvent) {
        if ('targetTouches' in e) {
          setPos(
            Math.min(Math.max(0, e.touches[0].clientX - layout.x), layout.width)
          )
        } else {
          // If it is a drag
          if (e.nativeEvent.buttons > 0) {
            setPos(Math.max(0, e.clientX - layout.x))
          }
        }
      }
    : undefined
}

function getInitialPos({
  value = 0,
  range,
  layout,
}: {
  value?: number
  layout: LayoutInfo
  range: [number, number]
}) {
  const delta = range[1] - range[0]
  return (value * layout.width) / delta
}
