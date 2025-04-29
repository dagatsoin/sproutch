import { View } from 'react-native'

import { ThemeContext } from '../../styles/ThemeContext'
import { PaperProps } from './PaperProps'
import { createWebPaperStyle } from './style'
import { useContext } from 'react'

export default function Paper(props: PaperProps) {
  const { style = {}, ...rest } = props
  const theme = useContext(ThemeContext)
  const rootStyle = createWebPaperStyle(theme)

  return (
    <View
      elevation={props.elevation}
      ref={(comp: View | null) => {
        props.ref && props.ref(comp)
      }}
      style={[rootStyle.root, style.root, style.content]}
      {...rest}
    />
  )
}
