import * as React from 'react'

import { BackgroundImageProps, BackgroundSize } from './BackgroundImageProps'
import { toBackgroundURL } from '../../utils'

function toSize(size: BackgroundSize): React.CSSProperties['backgroundSize'] {
  switch(size) {
    case 'stretch':
      return '100% 100%'
    
    case 'none':
      return 'unset'
    
    default:
      return size
  }
}

/**
 * This component is a step forward for developers familiar with the CSS background image and **organic design.**
 * - Size and position can be set in pixels and percent
 * - To be iso web, position is not enable when 'stretch' size is active.
 * - In react native, "cover" mode does not support background position in percent. As the image fits the parent container, the formula
 * of the css specification does not work.
 */
export function BackgroundImage(props: BackgroundImageProps) {
  const elRef = React.useRef<HTMLDivElement>(null)

  const {
    position,
    source,
    repeat,
    size = 'contain',
  } = props

  const style = React.useMemo(function () {
  
    return {
      position: 'relative',
      backgroundImage: `url(${toBackgroundURL(source)})`,
      backgroundPosition: `${position}`,
      backgroundSize: toSize(size),
      backgroundRepeat: repeat ? 'repeat' : 'no-repeat',
    } satisfies React.CSSProperties
  },
    [
      source,
      props.position,
      repeat,
      size,
    ]
  )

  return (
    <div ref={elRef} style={{ ...style, ...props.style as object }}>
      {props.children}
    </div>
  )
}
