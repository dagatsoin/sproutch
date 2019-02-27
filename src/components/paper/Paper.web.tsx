import * as React from 'react'
import { findDOMNode } from 'react-dom'

import { ThemeContext } from '../../styles'
import { Styles } from '../../styles/createStyle'
import { View } from '../view'
import { PaperProps } from './PaperProps'
import { shadows } from './style'

export default class Paper extends React.Component<PaperProps, {}> {
  private containerRef: View

  private get shadow(): string {
    return shadows.web[this.props.elevation || 0]
  }

  public componentDidMount() {
    const element = findDOMNode(this.containerRef) as HTMLElement
    element.style.boxShadow = this.shadow
  }

  public render() {
    const { children, square } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => {
          return (
            <View
              ref={(comp: any) => (this.containerRef = comp)}
              style={[
                Styles.createViewStyle({
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: square ? 0 : undefined,
                }),
                this.props.style,
              ]}
            >
              {children}
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
