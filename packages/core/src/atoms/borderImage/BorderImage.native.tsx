import { useMemo, useRef, useState } from 'react'
import { Image, LayoutChangeEvent, LayoutRectangle, StyleSheet, View } from 'react-native'

import { BorderImageProps } from './BorderImageProps'


// Declare a static object for style.
const style = StyleSheet.create({ root: { flex: 1 } });

export default function BorderImage(props: BorderImageProps) {
  const { uri, borderWidth, sliceWidth } = props
  const [layout, setLayout] = useState<LayoutRectangle>()

  // Prevent to create a function at each render
  const onLayoutRef = useRef((e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout)
  })

  const borders = useMemo(() => layout
   ? renderBorders(props, layout)
   : <></>,
   [uri, borderWidth, sliceWidth, layout]
  )

  return (
    <View
      // Passing a reference to the style instead of passing an object increases the performances.
      // If we pass the object { flex: 1 }, at each render for each view in the application, a new oject will be created
      // Internaly, each View instance will think this is a new object and will redraw and recompute itself.
      style={style.root}
      onLayout={onLayoutRef.current}
    >
      {borders}
    </View>
  )
}

function renderBorders(props: BorderImageProps, layout: LayoutRectangle) {
  const { borderWidth, uri } = props

  if (!layout) return <></> // wait to kwnow the View size

  const borderTop = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        alignItems: 'center',
        top: 0,
        right: 0,
        left: 0,
        height: borderWidth,
      }}
    >
      <Image
        style={{
          height: borderWidth * 2,
          width: 1,
          transform: [{ scaleX: layout.width - borderWidth * 2 }],
        }}
        resizeMode="cover"
        source={{ uri }}
      />
    </View>
  )

  const cornerTopRight = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        right: 0,
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
        source={{uri}}
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
        right: 0,
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
          height: 1,
          transform: [{ scaleY: layout.height - borderWidth * 2 }],
        }}
        resizeMode="cover"
        source={{uri}}
      />
    </View>
  )

  const cornerBottomRight = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        right: 0,
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
        source={{uri}}
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
        bottom: 0,
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
          width: 1,
          transform: [{ scaleX: layout.width - borderWidth * 2 }],
        }}
        resizeMode="cover"
        source={{uri}}
      />
    </View>
  )

  const cornerBottomLeft = (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        left: 0,
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
        source={{uri}}
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
        left: 0,
        width: borderWidth,
      }}
    >
      <Image
        style={{
          width: borderWidth * 2,
          height: 1,
          transform: [{ scaleY: layout.height - borderWidth * 2 }],
        }}
        resizeMode="cover"
        source={{uri}}
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
      }}
    >
      <Image
        style={{
          height: borderWidth * 2,
          width: borderWidth * 2,
        }}
        resizeMode="cover"
        source={{uri}}
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
