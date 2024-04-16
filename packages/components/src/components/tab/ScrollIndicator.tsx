import { GestureResponderEvent, Pressable, StyleSheet, View } from 'react-native'
import * as React from 'react'

import { Theme } from '../../styles'
import { getMaterialOverlayColor } from '../../styles/helpers'
import { Fade } from '../fade'
import { Emitter, Ripple } from '../ripple'
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
  onPress: (e: GestureResponderEvent) => void
}

type State = {
  isHover: boolean
}

const flex = StyleSheet.create({
  root: {
    flex: 1,
  }
})

export class ScrollIndicator extends React.Component<Props, State> {
  public state: State = {
    isHover: false,
  }
  private ripple!: Emitter

  public render() {
    const { onPress, palette, slot, style, theme } = this.props
    const overlayColor = getMaterialOverlayColor({
      palette,
      theme,
      isOnPaper: palette !== undefined,
    })
    const overlayStyle = createScrollIndicatorOverlayStyle(overlayColor, theme)
    return (
      <View style={style} onStartShouldSetResponder={() => true}>
        {slot?.(theme)}
        <Ripple
          color={overlayColor}
          onRef={(emitter: Emitter) => (this.ripple = emitter)}
        />
        <Fade style={fitParent.root} isVisible={this.state.isHover}>
          <View style={overlayStyle.root} />
        </Fade>
        <View style={fitParent.root}>
          <Pressable
            style={flex.root}
            onHoverIn={() => this.setState({ isHover: true })}
            onHoverOut={() => {
              this.ripple.onPressOut()
              this.setState({ isHover: false })
            }}
            onPress={onPress}
            onPressIn={(e: GestureResponderEvent) => {
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
