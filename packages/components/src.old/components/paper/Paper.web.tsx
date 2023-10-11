import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { toArray } from '../../styles'
import { ThemeContext } from '../../styles/ThemeContext'
import { View } from '../view'
import { PaperProps } from './PaperProps'
import { createWebPaperStyle, shadows } from './style'

export default class Paper extends React.Component<PaperProps, {}> {
  private containerRef: View | null

  private get shadow(): string {
    return shadows.web[this.props.elevation || 0]
  }

  public componentDidMount() {
    if (this.containerRef) {
      const element = findDOMNode(this.containerRef) as HTMLElement
      element.style.boxShadow = this.shadow
    }
  }

  public render() {
    const { style = {}, ...props } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => {
          const rootStyle = createWebPaperStyle(theme)
          return (
            <View
              ref={(comp: View | null) => {
                this.containerRef = comp
                this.props.ref && this.props.ref(comp)
              }}
              style={[
                ...toArray(rootStyle),
                ...toArray(style.root),
                ...toArray(style.content),
              ]}
              {...props}
            />
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
