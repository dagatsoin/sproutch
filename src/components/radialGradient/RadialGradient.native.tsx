import { Svg } from 'expo'
import * as React from 'react'
import { Types } from 'reactxp'

import { colorManipulator, StyleProp } from '../../styles'
import { View } from '../view'

type Props = {
  colors: string[]
  stops: number[]
  center?: [number, number]
  radius: number
  isPercent?: boolean
  style: StyleProp<Types.ViewStyle>
}

type State = {
  layout: Types.LayoutInfo
}

class RadialGradientComponent extends React.PureComponent<Props, State> {
  public backgroundImageRef: View
  public state: State = {
    layout: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  }

  public render() {
    const { style, stops, colors } = this.props
    const { Defs, RadialGradient, Stop, Ellipse } = Svg

    return (
      <View style={style} onLayout={this.onLayout}>
        <Svg height={this.state.layout.height} width={this.state.layout.width}>
          <Defs>
            <RadialGradient
              id="grad"
              cx={this.state.layout.width / 2}
              cy={this.state.layout.height / 2}
              rx={this.state.layout.width / 2}
              ry={this.state.layout.height / 2}
              fx={this.state.layout.width / 2}
              fy={this.state.layout.height / 2}
              gradientUnits="userSpaceOnUse"
            >
              {colors.map((color, i) => {
                const { values } = colorManipulator.decomposeColor(color)
                return (
                  <Stop
                    key={stops[i]}
                    offset={stops[i].toString()}
                    stopColor={`rgb(${values[0]}, ${values[1]}, ${values[2]})`}
                    stopOpacity={(values[3] || 1) + ''}
                  />
                )
              })}
            </RadialGradient>
          </Defs>
          <Ellipse
            cx={this.state.layout.width / 2}
            cy={this.state.layout.height / 2}
            rx={this.state.layout.width / 2}
            ry={this.state.layout.height / 2}
            fill="url(#grad)"
          />
        </Svg>
      </View>
    )
  }

  private onLayout = (layout: Types.LayoutInfo) => {
    this.setState({ layout })
  }
}

export default RadialGradientComponent
