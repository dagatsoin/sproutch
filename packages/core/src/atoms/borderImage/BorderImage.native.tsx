import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { BorderImageProps } from './BorderImageProps'


// Declare a static object for style.
const style = StyleSheet.create({ root: { left: 0, top: 0, bottom: 0, right: 0, position: "absolute" } });

export function BorderImage(props: BorderImageProps) {
  const { source, borderWidth, sliceWidth } = props
  const ref = useRef<View>(null)
  const [layout, setLayout] = useState<{ width: number, height: number }>()

  // Prevent to create a function at each render
  useLayoutEffect(() => {
    ref.current?.measure((_x, _y, width, height) => {
      setLayout({ height, width})
    })
  }, [props])

  const borders = useMemo(() => layout
   ? renderBorders(props, layout)
   : <></>,
   [source, borderWidth, sliceWidth, layout]
  )

  return (
    <View ref={ref} style={style.root}>
      {borders}
    </View>
  )
}

function renderBorders(props: BorderImageProps, layout: { width: number, height: number }) {
  const { growInside, borderWidth, source } = props
  const borderOffset = growInside ? 0 : -borderWidth

  const borderTop = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        alignItems: 'center',
        top: borderOffset,
        right: 0,
        left: 0,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          height: borderWidth * 2,
          width: 1.2,
          transform: [{ scaleX: layout.width - (growInside ? borderWidth * 2 : 0)}],
        }}
        resizeMode="cover"
        source={source}
      />
    </View>
  )

  const cornerTopRight = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        top: borderOffset,
        right: borderOffset,
        width: borderWidth,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          right: 0,
          height: borderWidth * 2,
          width: borderWidth * 2,
        }}
        resizeMode="cover"
        source={source}
      />
    </View>
  )

  const borderRight = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        justifyContent: 'center',
        top: 0,
        right: borderOffset,
        bottom: 0,
        width: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          right: 0,
          width: borderWidth * 2,
          height: 1.01, // fix a weird bug where the value 1 produce gaps. Maybe a rounding related issue.
          transform: [{ scaleY: layout.height - (growInside ? borderWidth * 2 : 0)}],
        }}
        resizeMode="cover"
        source={source}
      />
    </View>
  )

  const cornerBottomRight = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        bottom: borderOffset,
        right: borderOffset,
        width: borderWidth,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          right: 0,
          bottom: 0,
          height: borderWidth * 2,
          width: borderWidth * 2,
        }}
        resizeMode="cover"
        source={source}
      />
    </View>
  )

  const borderBottom = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        alignItems: 'center',
        right: 0,
        bottom: borderOffset,
        left: 0,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          bottom: 0,
          height: borderWidth * 2,
          width: 1.2, // fix a weird bug where the value 1 produce gaps. Maybe a rounding related issue.
          transform: [{ scaleX: layout.width - (growInside ? borderWidth * 2 : 0)}],
        }}
        resizeMode="cover"
        source={source}
      />
    </View>
  )

  const cornerBottomLeft = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        bottom: borderOffset,
        left: borderOffset,
        width: borderWidth,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          position: 'absolute',
          overflow: 'hidden',
          bottom: 0,
          height: borderWidth * 2,
          width: borderWidth * 2,
        }}
        resizeMode="cover"
        source={source}
      />
    </View>
  )

  const borderLeft = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: borderOffset,
        width: borderWidth,
      }}
    >
      <Image
        style={{
          width: borderWidth * 2,
          height: 1.01,
          transform: [{ scaleY: layout.height - (growInside ? borderWidth * 2 : 0)}],
        }}
        resizeMode="cover"
        source={source}
      />
    </View>
  )

  const cornerTopLeft = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        width: borderWidth,
        height: borderWidth,
        left: borderOffset,
        top: borderOffset,
      }}
    >
      <Image
        style={{
          height: borderWidth * 2,
          width: borderWidth * 2,
        }}
        resizeMode="cover"
        source={source}
      />
    </View>
  )

  return (
    <>
      {borderTop}
      {cornerTopRight}
      {borderRight}
      {cornerBottomRight}
      {borderBottom}
      {cornerBottomLeft}
      {borderLeft}
      {cornerTopLeft}
    </>
  )
}
