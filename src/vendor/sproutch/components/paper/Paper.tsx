import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Platform } from 'reactxp'
import { Styles, View } from 'sproutch'

import { shadows, styles } from './style'

type Props = {
  elevation?: number
  square?: boolean
  children?: React.ReactNode
}

let Paper

if (Platform.getType() === 'web') {
  Paper = class PaperWeb extends React.Component<Props, {}> {
    
    private containerRef: View

    private get shadow(): string {
      return shadows.web[this.props.elevation || 0]
    }

    public componentDidMount() {
      const element = findDOMNode(this.containerRef) as HTMLElement
      element.style.boxShadow = this.shadow
    }
    
    public render() {

      const {children, square } = this.props

      return (
        <View
          ref={comp => this.containerRef = comp}
          style={[
            square
              ? Styles.createViewStyle({
                borderRadius: 0
              })
              : undefined
          ]}
        >
          {children}
        </View>
      )
    }
  }
} else {
  Paper = ({elevation, children, square}: Props) => {
    const nativeShadows = elevation && elevation > 0
      ? shadows.native[elevation]
      : []
    
    return (
      <View
        style={
          square
            ? Styles.createViewStyle({
              borderRadius: 0
            })
            : undefined
        }
      >
        {
          nativeShadows.map(s => (
            <View
              style={[
                styles.shadowContainer,
                styles.roundBorder,
                Styles.createViewStyle(s)
              ]}
            />
          ))
        }
        {children}
      </View>
    )
  }
}

export default Paper