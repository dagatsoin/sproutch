import * as React from 'react'
import { Button, Styles, Types } from 'reactxp'

import { Theme } from '../../styles'
import { getMaterialOverlayColor } from '../../styles/helpers'
import { Fade } from '../fade'
import { Emitter, Ripple } from '../ripple'
import { View } from '../view'
import {
  createScrollIndicatorOverlayStyle,
  fitParent,
  TabsBarStyle,
} from './styles'

type Props = {
  style: TabsBarStyle['leftIndicator' | 'rightIndicator']
  palette?: 'primary' | 'secondary'
  theme: Theme<any, any>
  slot?: (theme: Theme<any, any>) => React.ReactNode
  onPress: (e: Types.SyntheticEvent) => void
}

type State = {
  isHover: boolean
}

const flex = Styles.createViewStyle({
  flex: 1,
})

export class ScrollIndicator extends React.Component<Props, State> {
  public state: State = {
    isHover: false,
  }
  private ripple: Emitter

  public render() {
    const { onPress, palette, slot, style, theme } = this.props
    const overlayColor = getMaterialOverlayColor({ palette, theme })
    const overlayStyle = createScrollIndicatorOverlayStyle(overlayColor, theme)
    return (
      <View style={style} onStartShouldSetResponder={() => true}>
        {slot && slot(this.props.theme!)}
        <Ripple
          color={overlayColor}
          onRef={(emitter: Emitter) => (this.ripple = emitter)}
        />
        <Fade style={fitParent} isVisible={this.state.isHover}>
          <View style={overlayStyle} />
        </Fade>
        <View style={fitParent}>
          <Button
            style={flex}
            onHoverStart={() => this.setState({ isHover: true })}
            onHoverEnd={() => this.setState({ isHover: false })}
            onPress={onPress}
            onPressIn={(e: Types.SyntheticEvent) => {
              this.ripple.onPressIn(e)
            }}
            onPressOut={() => {
              this.ripple.onPressOut()
            }}
          />
        </View>
      </View>
    )
  }
}
