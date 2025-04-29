import * as React from 'react'

import { RadialGradientProps } from './RadialGradientProps'

export default function RadialGradient(props: RadialGradientProps) {
  const bgRef = React.useRef<HTMLDivElement>(null)
  const style = getStyle(props)

  return (
    <div style={style}>
      <div ref={bgRef} />
    </div>
  )
}

function getStyle(props: RadialGradientProps): React.CSSProperties {
  // Retrieve the new center coordinates value in pixel
  const {
    center,
    colors,
    isEllipse,
    radius = 'farthest-corner',
    stops,
  } = props

  const colorStrings = colors
    .map((color, i) => `${color} ${stops[i] * 100}%`)
    .join(', ')

  const isCenterInPercent = !center || typeof center[0] === 'string'
  const posX = center ? `${center[0]}${isCenterInPercent ? '' : 'px'}` : '50%'

  const posY = center ? `${center[1]}${isCenterInPercent ? '' : 'px'}` : '50%'

  const shape = isEllipse ? 'ellipse' : 'circle'

  const _radius = isEllipse
    ? Array.isArray(radius)
      ? radius.map(r => r + '%').join(' ')
      : radius
    : `[${radius.toString()}]`

  return {
    position: 'absolute',
    inset: 0,
    backgroundImage: `radial-gradient(${shape} ${_radius} at ${posX} ${posY}, ${colorStrings})`,
  }
}
