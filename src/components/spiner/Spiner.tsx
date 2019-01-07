import * as React from 'react'
import { ActivityIndicator, Types } from 'reactxp'

import { ThemeContext } from '../../styles/theme'

export type Props = Partial<Types.ActivityIndicatorProps & Types.CommonStyledProps<Types.ActivityIndicatorStyleRuleSet>>

export default ({color, ...props}: Props) => (
  <ThemeContext.Consumer>
    {theme => (
      <ActivityIndicator
        color={color || theme.palette.secondary.main}
        {...props}
      />
    )}
  </ThemeContext.Consumer>
)