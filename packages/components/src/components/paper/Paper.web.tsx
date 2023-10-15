import { useMemo, useRef, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { findDOMNode } from 'react-dom'

import { ThemeContext } from '../../styles/ThemeContext'
import { PaperProps } from './PaperProps'
import { createWebPaperStyle, shadows } from './style'
import { componentDidMount } from '../../utils'

export default function Paper(props: PropsWithChildren<PaperProps>) {
  const containerRef = useRef<View|null>(null)

  const shadow  = useMemo(() => shadows.web[props.elevation ?? 0], [props.elevation])

  componentDidMount(() => {
    if (containerRef.current) {
      const element = findDOMNode(containerRef.current) as HTMLElement
      element.style.boxShadow = shadow
    }
  })

  const { style = {}, ...rest} = props

  return (
    <ThemeContext.Consumer>
      {theme => {
        const rootStyle = createWebPaperStyle(theme)
        return (
          <View
            ref={(comp: View | null) => {
              containerRef.current = comp
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
