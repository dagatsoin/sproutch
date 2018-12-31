import * as React from 'react'
import { ActivityIndicator, Types } from 'reactxp'
import { ThemeContext } from 'sproutch'

export type Props = Partial<Types.ActivityIndicatorProps & Types.CommonStyledProps<Types.ActivityIndicatorStyleRuleSet>>

export default ({color, deferTime, size, testId, ref, ...props}: Props) => (
  <ThemeContext.Consumer>
    {theme => (
      <ActivityIndicator
        color={color || theme.palette.secondary.main}
        deferTime={deferTime}
        size={size}
        testId={testId}
        {...props}
      />
    )}
  </ThemeContext.Consumer>
)