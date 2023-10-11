import { useMemo } from 'react'
import { BorderImageProps } from './BorderImageProps'
import { StyleSheet } from 'react-native'

export default function BorderImage(props: BorderImageProps) {
  const { borderWidth, uri, sliceWidth } = props
  const style = useMemo(function() {
    return StyleSheet.create({
      root: {
        position: 'absolute',
        inset: 0,
        borderWidth: borderWidth,
        borderStyle: 'solid',
        borderImageSource: `url(${uri})`,
        borderImageSlice: `${sliceWidth}`,
      }
    })
  }, [borderWidth, sliceWidth, uri])
  return (
    <div style={style.root}/>
  )    
}
