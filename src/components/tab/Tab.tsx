import * as React from 'react'
import { Types } from 'reactxp'
import {
  LayoutInfo,
  StyleRuleSet,
  StyleRuleSetRecursive,
} from 'reactxp/dist/common/Types'

import { ThemeContext } from '../../styles/theme'
import { Ripple } from '../ripple'
import { Text } from '../text'
import { View } from '../view'
import { tabStyle, TabStyle } from './styles'

export type TabProps = {
  id: string
  renderIcon?: (
    style: StyleRuleSetRecursive<StyleRuleSet<Types.TextStyle>>
  ) => JSX.Element
  label?: string
  isActive?: boolean
  hasTwoLines?: boolean
  isDisable?: boolean
  mustGrow?: boolean
  palette?: 'primary' | 'secondary'
  notification?: boolean
  style?: Partial<TabStyle>
  onClick?: (index: string) => void
  onUnmount?: (id: string) => void
  onTabLayout?: (tab: { id: string; layout: LayoutInfo }) => void
  onWillMount?: (id: string) => void
  renderSlot?: () => JSX.Element
}

class Tab extends React.Component<TabProps & Types.ViewProps> {
  private layout?: LayoutInfo

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
      hasTwoLines = false,
      mustGrow = false,
      palette,
      renderSlot,
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
              hasTwoLines,
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
              {renderSlot && renderSlot()}
              {
                <Ripple
                  onPress={() => !!onClick && onClick(id)}
                  palette={palette}
                />
              }
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
    )
      return
    this.layout = layout
    onTabLayout &&
      onTabLayout({
        id,
        layout,
      })
  }
}
export default Tab
