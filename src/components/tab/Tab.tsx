import * as React from 'react'
import { Button, Styles, Types } from 'reactxp'
import {
  LayoutInfo,
  StyleRuleSet,
  StyleRuleSetRecursive,
} from 'reactxp/dist/common/Types'

import { ThemeContext } from '../../styles/theme'
import { Fade } from '../fade'
import { Ripple } from '../ripple'
import Emitter from '../ripple/Emitter'
import { Text, TextStyle } from '../text'
import { View, ViewProps } from '../view'
import { tabStyle, TabStyleOverride } from './styles'

export type TabProps = {
  id: string
  renderIcon?: (
    style: StyleRuleSetRecursive<StyleRuleSet<TextStyle>>
  ) => JSX.Element
  label?: string
  isDisable?: boolean
  style?: TabStyleOverride
  slot?: JSX.Element
}

type CompleteProps = {
  mustGrow?: boolean
  palette?: 'primary' | 'secondary'
  hasIconOnTop?: boolean
  isActive: boolean
  onClick: (index: string) => void
  onUnmount: (id: string) => void
  onTabLayout: (tab: { id: string; layout: LayoutInfo }) => void
  onWillMount: (id: string) => void
} & TabProps

type State = {
  isHover: boolean
}

class Tab extends React.Component<CompleteProps & ViewProps, State> {
  public state: State = {
    isHover: false,
  }
  private layout?: LayoutInfo
  private ripple: Emitter

  public componentWillMount() {
    const { onWillMount = () => {} } = this.props
    onWillMount(this.props.id)
  }

  public componentDidMount() {
    this.layout && this.onLayout(this.layout)
  }

  public componentWillUnmount() {
    const { onUnmount = () => {} } = this.props
    onUnmount(this.props.id)
  }

  public render() {
    const {
      renderIcon,
      label,
      isActive = false,
      isDisable = false,
      hasIconOnTop = false,
      mustGrow = false,
      palette,
      slot,
      style,
    } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => {
          const styles = tabStyle({
            theme,
            palette,
            style,
            options: {
              hasIconOnTop,
              isDisable,
              isActive,
              mustGrow,
              hasIcon: !!renderIcon,
              hasLabel: !!label,
            },
          })
          const { id, onClick } = this.props

          return (
            <View onLayout={this.onLayout} style={styles.root}>
              {renderIcon && renderIcon(styles.icon)}
              {label && <Text style={styles.label}>{label}</Text>}
              {slot}
              <Fade isVisible={this.state.isHover} duration={75}>
                <View style={styles.overlay} />
              </Fade>
              <Ripple
                onRef={(emitter: Emitter) => {
                  this.ripple = emitter
                }}
                palette={palette}
              />
              <View style={styles.touchDetector}>
                <Button
                  style={Styles.createViewStyle({
                    flex: 1,
                  })}
                  onPress={() => !!onClick && onClick(id)}
                  onPressIn={(e: Types.SyntheticEvent) => {
                    this.ripple.onPressIn(e)
                  }}
                  onPressOut={() => {
                    this.ripple.onPressOut()
                  }}
                  onHoverStart={() => {
                    this.setState({ isHover: true })
                  }}
                  onHoverEnd={() => {
                    this.setState({ isHover: false })
                  }}
                />
              </View>
            </View>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  private onLayout = (layout: LayoutInfo) => {
    const { id, onTabLayout } = this.props
    if (
      this.layout !== undefined &&
      this.layout.height === layout.height &&
      this.layout.width === layout.width &&
      this.layout.x === layout.x &&
      this.layout.y === layout.y
    ) {
      return
    }

    // Round the layout value because hi density screen subpixel value could cause different behavior
    this.layout = {
      x: Math.round(layout.x),
      y: Math.round(layout.y),
      width: Math.round(layout.width),
      height: Math.round(layout.height),
    }
    onTabLayout &&
      onTabLayout({
        id,
        layout: this.layout,
      })
  }
}
export default Tab
