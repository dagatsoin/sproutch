import * as React from 'react'

import { ButtonProps, Button } from './Button'
import { ButtonStyleOverride, createCircleButtonStyle } from './style'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

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
    return (
      <Button style={circleButtonStyle} {...(props as any)} nativeRef={ref} />
    )
  }
)
