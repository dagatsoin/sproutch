import * as React from 'react'
import { Animated, Styles, Types } from 'reactxp'

import { ThemeContext } from '../../styles/theme'
import { View } from '../view'
import styles, { ProgressBarStyle } from './style'

type Props = {
  className?: string
  animationDuration?: number
  progress: number
  palette?: 'primary' | 'secondary'
  style?: Partial<ProgressBarStyle>
}

class ProgressBar extends React.PureComponent<Props> {
  private animatedPercent = Animated.createValue(0.0)
  private animatedStyle: Types.AnimatedViewStyleRuleSet
  private animation: Types.Animated.CompositeAnimation

  constructor(props: Props) {
    super(props)

    const value = this.limit(props.progress)
    this.animatedPercent = Animated.createValue(value)
    this.animatedStyle = Styles.createAnimatedViewStyle({
        transform: [{ scaleX: this.animatedPercent }]
    })
    this.animation = this.getAnimation(value, props.animationDuration || 0)
  }

  public componentDidMount() {
    this.animation.start()
  }

  public componentWillReceiveProps(newProps: Props) {
    this.animation.stop()
    const value = this.limit(newProps.progress)
    this.animation = this.getAnimation(value, newProps.animationDuration || this.props.animationDuration || 0)
    this.animation.start()
  }

  public render() {
    const { palette, style } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => {
          const stylesSheet = styles({theme, palette, style})
          return (
            <View style={stylesSheet.root}>
              <View style={stylesSheet.background}/>
              <View style={stylesSheet.top}>
                <View 
                  style={stylesSheet.fill}
                  animated={this.animatedStyle}
                />
              </View>
            </View>
          )
        }
        }
      </ThemeContext.Consumer>
    )
  }

  private limit(value: number = 0) {
    return Math.min(1, Math.max(0, (value  / 100)))
  }

  private getAnimation(toValue: number, duration: number) {
    return Animated
      .timing(
        this.animatedPercent,
        {
          toValue,
          duration,
          easing: Animated.Easing.InOut()
        }
      )
  }
}

export default ProgressBar