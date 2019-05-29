import * as React from 'react'
import { Button, Styles, Types } from 'reactxp'
import {
  LayoutInfo,
  StyleRuleSet,
  StyleRuleSetRecursive,
} from 'reactxp/dist/common/Types'

import { shouldComponentUpdate } from '../../helpers'
import { getMaterialOverlayColor } from '../../styles/helpers'
import { ThemeContext } from '../../styles/theme'
import { Fade } from '../fade'
import { Ripple } from '../ripple'
import Emitter from '../ripple/Emitter'
import { Text, TextStyle } from '../text'
import { View, ViewProps } from '../view'
import { fitParent, tabStyle, TabStyleOverride } from './styles'

export type TabProps = {
  id: string
  iconSlot?: (
    style: StyleRuleSetRecursive<StyleRuleSet<TextStyle>>
  ) => React.ReactNode
  label?: string
  isDisabled?: boolean
  style?: TabStyleOverride
  badgeSlot?: React.ReactNode
}

type CompleteProps = {
  mustGrow?: boolean
  palette?: 'primary' | 'secondary'
  hasIconOnTop?: boolean
  isActive: boolean
  isFrozen?: boolean
  onPress: (index: string) => void
  onUnmount: (id: string) => void
  onTabLayout: (tab: { id: string; layout: LayoutInfo }) => void
  onWillMount: (id: string) => void
} & TabProps

type State = {
  isHover: boolean
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

function noop() {}

class Tab extends React.Component<
  CompleteProps & Omit<ViewProps, 'onPress'>,
  State
> {
  public state: State = {
    isHover: false,
  }
  private layout?: LayoutInfo
  private ripple?: Emitter
  private isActionAllowed = true

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

  public shouldComponentUpdate(
    nextProps: CompleteProps,
    nextState: State
  ): boolean {
    return shouldComponentUpdate(nextProps, nextState, this.props, this.state)
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          const {
            id,
            iconSlot,
            label,
            isActive = false,
            isDisabled = false,
            isFrozen = false,
            hasIconOnTop = false,
            mustGrow = false,
            palette,
            badgeSlot,
            style,
            onPress = noop,
          } = this.props
          const { isHover } = this.state
          const isOnPaper = palette !== undefined
          const overlayColor = getMaterialOverlayColor({
            isOnPaper,
            palette,
            theme,
          })

          const styles = tabStyle({
            theme,
            palette,
            style,
            overlayColor,
            options: {
              hasIconOnTop,
              isDisabled,
              isActive,
              mustGrow,
              hasIcon: !!iconSlot,
              hasLabel: !!label,
            },
          })

          return (
            <View
              onResponderMove={this.blockActionDuringScroll}
              onResponderRelease={this.allowActionDuringScroll}
              onLayout={this.onLayout}
              style={styles.root}
            >
              {iconSlot && iconSlot(styles.icon)}
              {label && <Text style={styles.label}>{label}</Text>}
              {badgeSlot}
              <Fade style={fitParent} isVisible={isHover} duration={75}>
                <View style={styles.overlay} />
              </Fade>
              {!isDisabled && !isFrozen && (
                <Ripple
                  onRef={(emitter: Emitter) => {
                    this.ripple = emitter
                  }}
                  color={overlayColor}
                />
              )}
              <View style={fitParent}>
                <Button
                  disabled={isDisabled}
                  style={Styles.createViewStyle({
                    flex: 1,
                  })}
                  onPress={() => {
                    !isFrozen && this.isActionAllowed && onPress(id)
                  }}
                  onPressIn={(e: Types.SyntheticEvent) => {
                    this.ripple && this.ripple.onPressIn(e)
                  }}
                  onPressOut={() => {
                    this.ripple && this.ripple.onPressOut()
                  }}
                  onHoverStart={() => {
                    this.setState({ isHover: true })
                  }}
                  onHoverEnd={() => {
                    // prevents a bug on Web where onPressOut
                    // is not called whend the touch is released outside
                    this.ripple && this.ripple.onPressOut()
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

  private blockActionDuringScroll = () => {
    this.isActionAllowed = false
    this.ripple && this.ripple.onPressOut()
  }

  private allowActionDuringScroll = () => {
    this.isActionAllowed = true
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
