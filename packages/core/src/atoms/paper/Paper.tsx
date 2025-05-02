import { PropsWithChildren, useContext } from 'react'
import { View } from 'react-native'

import { ThemeContext } from '../../styles/ThemeContext'
import type { PaperProps } from './PaperProps'
import { createWebPaperStyle, shadows } from './style'

/**
 * An organic design low level element representing a surface. Also know in the
 * Material Design system, paper are used to enhance content by elevate them above other content.
 */
export default function Paper(props: PropsWithChildren<PaperProps>) {

  const boxShadow  = shadows.web[props.elevation ?? 0]

  const { style = {}, ...rest} = props

  const theme = useContext(ThemeContext)
  const rootStyle = createWebPaperStyle(theme)

  return (
    <View
      style={[rootStyle.root, style.root, style.content, { boxShadow }]}
      {...rest}
    />
  )
}
