import { Svg } from 'expo'
import * as React from 'react'

import { colorManipulator, Styles } from '../../styles'
import { LayoutInfo, View } from '../view'
import { RadialGradientProps } from './RadialGradientProps'

type State = {
  layout: LayoutInfo
}

class RadialGradientComponent extends React.Component<
  RadialGradientProps,
  State
> {
  public backgroundImageRef: View
  public state: State = {
    layout: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  }

  /**
   * Get the distance between a point and the farhest side of the given rectangle layout.
   */
  private static getFarthestSideDistanceFromPoint(
    { width, height }: { width: number; height: number },
    { x, y }: { x: number; y: number }
  ) {
    return Math.max(y, width - x, height - y, x)
  }

  /**
   * Get the distance between a point and the closest side of the given rectangle layout.
   */
  private static getClosestSideDistanceFromPoint(
    { width, height }: { width: number; height: number },
    { x, y }: { x: number; y: number }
  ) {
    return Math.min(y, width - x, height - y, x)
  }

  /**
   * Get the distance between a point and the farthest corner of the given rectangle layout.
   */
  private static getFarthestCornerDistanceFromPoint(
    { width, height }: { width: number; height: number },
    { x, y }: { x: number; y: number }
  ) {
    return Math.max(
      Math.sqrt((width - x) ** 2 + y ** 2),
      Math.sqrt((width - x) ** 2 + (height - y) ** 2),
      Math.sqrt(x ** 2 + (height - y) ** 2),
      Math.sqrt(x ** 2 + y ** 2)
    )
  }

  /**
   * Get the distance between a point and the closest corner of the given rectangle layout.
   */
  private static getClosestCornerDistanceFromPoint(
    { width, height }: { width: number; height: number },
    { x, y }: { x: number; y: number }
  ) {
    return Math.min(
      Math.sqrt((width - x) ** 2 + y ** 2),
      Math.sqrt((width - x) ** 2 + (height - y) ** 2),
      Math.sqrt(x ** 2 + (height - y) ** 2),
      Math.sqrt(x ** 2 + y ** 2)
    )
  }

  public render() {
    const { center, style, stops, colors, isEllipse, radius } = this.props
    const { Defs, RadialGradient, Stop, Ellipse } = Svg
    const isCenterInPercent = !center || typeof center[0] === 'string'
    const { width, height } = this.state.layout
    const posX = center
      ? isCenterInPercent
        ? (width * Number((center[0] as string).slice(0, -1))) / 100
        : (center[0] as number)
      : width / 2

    const posY = center
      ? isCenterInPercent
        ? (height * Number((center[1] as string).slice(0, -1))) / 100
        : (center[0] as number)
      : height / 2

    const _radius = this.getRadius(
      { width, height },
      { x: posX, y: posY },
      radius,
      isEllipse
    )

    return (
      <View
        style={[
          style,
          // Add the last colors as the background color to avoid transparent after the end of the gradient.
          Styles.createViewStyle({
            backgroundColor: this.props.colors[this.props.colors.length - 1],
          }),
        ]}
        onLayout={this.onLayout}
      >
        <Svg height={height} width={width}>
          <Defs>
            <RadialGradient
              id="grad"
              cx={posX}
              cy={posY}
              rx={Math.max(0, _radius[0])} // negative number throws
              ry={Math.max(0, _radius[1])} // negative number throws
              fx={posX}
              fy={posY}
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
            cx={posX}
            cy={posY}
            rx={Math.max(0, _radius[0])} // negative number throws
            ry={Math.max(0, _radius[1])} // negative number throws
            fill="url(#grad)"
          />
        </Svg>
      </View>
    )
  }

  public componentDidUpdate(_prevProps: RadialGradientProps, prevState: State) {
    const didLayoutChange =
      prevState.layout.width !== this.state.layout.width ||
      prevState.layout.height !== this.state.layout.height ||
      prevState.layout.x !== this.state.layout.x ||
      prevState.layout.y !== this.state.layout.y

    if (didLayoutChange) {
      // @todo optimize with getDerivedStateFromProps
      this.forceUpdate()
    }
  }

  /**
   * Return the [x, y] radius of the final ellipse shape
   */
  private getRadius(
    { width, height }: { width: number; height: number },
    { x, y }: { x: number; y: number },
    radius: RadialGradientProps['radius'],
    isEllipse?: boolean
  ): [number, number] {
    // user passed ellipse radius as percent
    if (Array.isArray(radius)) {
      return [(radius[0] * width) / 100, (radius[1] * height) / 100]
    }

    // Use predefined type
    if (isEllipse) {
      switch (radius) {
        case 'closest-side':
          return [
            Math.min(x, width - x), // closest horizontal side
            Math.min(y, height - y), // closest vertical side
          ]
        case 'farthest-side':
          return [
            Math.max(x, width - x), // farthest horizontal side
            Math.max(y, height - y), // farthest vertical side
          ]
        case 'closest-corner':
          // Compute the radius and say thanks to Pythagore.
          const closestHorizontalSide = Math.min(x, width - x)
          const closestVerticalSide = Math.min(y, height - y)
          return [
            closestHorizontalSide * Math.sqrt(2),
            closestVerticalSide * Math.sqrt(2),
          ]
        default:
          // Compute the radius and say thanks to Pythagore.
          const farthestHorizontalSide = Math.max(x, width - x)
          const farthestVerticalSide = Math.max(y, height - y)
          return [
            farthestHorizontalSide * Math.sqrt(2),
            farthestVerticalSide * Math.sqrt(2),
          ]
      }
    } else {
      let r: number
      switch (radius) {
        case 'closest-side':
          r = RadialGradientComponent.getClosestSideDistanceFromPoint(
            { width, height },
            { x, y }
          )
          break
        case 'farthest-side':
          r = RadialGradientComponent.getFarthestSideDistanceFromPoint(
            { width, height },
            { x, y }
          )
          break
        case 'closest-corner':
          r = RadialGradientComponent.getClosestCornerDistanceFromPoint(
            { width, height },
            { x, y }
          )
          break
        default:
          r = RadialGradientComponent.getFarthestCornerDistanceFromPoint(
            { width, height },
            { x, y }
          )
          break
      }
      return [r, r]
    }
  }

  private onLayout = (layout: LayoutInfo) => {
    this.setState({ layout })
  }
}

export default RadialGradientComponent
