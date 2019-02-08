import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Types } from 'reactxp'

import { StyleProp, Styles } from '../../styles/createStyle'
import { View } from '../view'
import { shadows } from './style'

type Props = {
  elevation?: number
  style?: StyleProp<Types.ViewStyle>
  square?: boolean
  children?: React.ReactNode
}

export default class Paper extends React.Component<Props, {}> {
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
      <View
        ref={(comp: View) => (this.containerRef = comp)}
        style={[
          this.props.style,
          square
            ? Styles.createViewStyle({
                borderRadius: 0,
              })
            : undefined,
        ]}
      >
        {children}
      </View>
    )
  }
}
