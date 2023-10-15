import * as React from 'react'
import { View } from 'react-native'

import { ThemeContext } from '../../styles/ThemeContext'
import { PaperProps } from './PaperProps'
import { createWebPaperStyle } from './style'

export default function Paper(props: PaperProps) {
  const { style = {}, ...rest } = props

  return (
    <ThemeContext.Consumer>
      {theme => {
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
      }}
    </ThemeContext.Consumer>
  )
}
