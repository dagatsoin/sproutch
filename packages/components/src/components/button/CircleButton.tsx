import * as React from 'react'

import { Button, ButtonProps } from './Button'
import { ButtonStyleOverride, createCircleButtonStyle } from './style'

export type CircleButtonProps = Omit<ButtonProps, 'isDense'> & {
  radius?: number
  style?: ButtonStyleOverride
}

export default React.forwardRef(
  ({ style = {}, radius = 32, ...props }: CircleButtonProps, ref) => {
    const circleButtonStyle = createCircleButtonStyle({
      style,
      radius,
    })
    return <Button style={circleButtonStyle} {...(props as any)} ref={ref} />
  }
)
