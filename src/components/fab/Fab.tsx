import * as React from 'react'
import { Animated, Platform, UserInterface } from 'reactxp'

import { StyleProp } from '../../styles'
import { CircleButton, CircleButtonProps } from '../button'
import {
  Child,
  ContentRendererMandatoryProps,
  FoldableTree,
  FoldableTreeProps,
  INodeView,
  Position,
  ROOT_ID,
} from '../foldableTree'
import { TextStyle } from '../text'
import { View } from '../view'
import { getInitialAnimatedValues } from './common'
import { renderNodeFactory } from './renderNode'
import { FabStyleOverride } from './styles'

export type FabProps = {
  isDisabled?: boolean
  nodeChildren?: Array<Child<FabButtonData>>
  nodeData?: FabButtonData
  nodeOpeningDuration?: number
  optionSeparationAngle?: number
  parentRef: Animated.View | View | null
  position: Position
  rootSpreadOrientation?: number // When user need to force the first spread orientation. Affect only the root.
  spreadRadius?: number
  style?: FabStyleOverride
  isOpen?: boolean
  onRef?(fab: Fab): void
  buildButtonProps?(nodeInstance: NodeInstance): Partial<CircleButtonProps>
  onCancel?(): void
  onHover?(index: string | null): void
  onPostClose?(index: string): void
  onPostOpen?(index: string): void
  onPreClose?(index: string): void
  onPreOpen?(index: string): void
  onSelect?(index: string, path?: string[]): void
}

const DEFAULT_SPREAD_RADIUS = 120
const DEFAULT_OPTION_SEPARATION_ANGLE = 45
const DEFAULT_NODE_OPENING_DURATION = 200

export type FabButtonData = {
  label?: string
  cancelLabel?: string
  renderOpenIcon?: (style: StyleProp<TextStyle>) => React.ReactNode
  renderCancelIcon?: (style: StyleProp<TextStyle>) => React.ReactNode
}

type State = {
  positionRelativeToPageX: number
  positionRelativeToPageY: number
}

class Fab extends React.Component<FabProps, State> {
  public state: State = {
    positionRelativeToPageX: 0,
    positionRelativeToPageY: 0,
  }

  public componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  public componentDidUpdate() {
    if (this.props.parentRef) {
      UserInterface.measureLayoutRelativeToWindow(this.props.parentRef).then(
        layout => {
          if (
            this.state.positionRelativeToPageX !== layout.x ||
            this.state.positionRelativeToPageY !== layout.y
          ) {
            this.setState({
              positionRelativeToPageX: layout.x,
              positionRelativeToPageY: layout.y,
            })
          }
        }
      )
    }
  }

  public render() {
    const { positionRelativeToPageX, positionRelativeToPageY } = this.state
    const {
      // Root props
      isOpen,

      // Context props
      isDisabled,
      onCancel,
      onHover,
      onPostClose,
      onPostOpen,
      onPreClose,
      onPreOpen,
      onSelect,
      style,

      // Node props
      nodeOpeningDuration = DEFAULT_NODE_OPENING_DURATION,
      optionSeparationAngle = DEFAULT_OPTION_SEPARATION_ANGLE,
      rootSpreadOrientation,
      spreadRadius = DEFAULT_SPREAD_RADIUS,
      position,
      nodeData = {},
      nodeChildren = [],
      buildButtonProps,
    } = this.props
    const animatedValues = getInitialAnimatedValues({
      isRoot: true,
    })

    const parentAbsolutePosition = {
      x: positionRelativeToPageX,
      y: positionRelativeToPageY,
    }

    const completeProps: FoldableTreeProps<any, any> = {
      id: ROOT_ID,
      animatedValues,
      isOpen,
      contextProps: {
        isDisabled,
        style,
        onCancel,
        onSelect,
        onHover,
        onPostClose,
        onPostOpen,
        onPreClose,
        onPreOpen,
      },
      renderNode: renderNodeFactory(
        renderContentFactory({ isDisabled, buildButtonProps })
      ),
      nodeProps: {
        id: ROOT_ID,
        nodeData,
        parentAbsolutePosition,
        localPosition: position,
        nodeChildren,
        nodeOpeningDuration,
        optionSeparationAngle,
        rootSpreadOrientation,
        spreadRadius,
      },
    }

    return <FoldableTree {...completeProps} />
  }
}

export type NodeInstance = INodeView<FabButtonData>

type RenderNodeFactoryParams = {
  isDisabled?: boolean
  buildButtonProps?: (nodeInstance: NodeInstance) => Partial<CircleButtonProps>
} & CircleButtonProps

function renderContentFactory({
  isDisabled,
  buildButtonProps,
}: RenderNodeFactoryParams) {
  return function({
    nodeInstance,
    mandatoryProps,
  }: {
    nodeInstance: INodeView<FabButtonData>
    mandatoryProps: ContentRendererMandatoryProps
  }) {
    const { nodeData } = nodeInstance
    const customProps =
      (buildButtonProps && buildButtonProps(nodeInstance)) || {}

    const label = customProps.label
      ? customProps.label
      : nodeInstance.isOpen
      ? undefined
      : nodeData.label

    const iconSlot = customProps.iconSlot
      ? customProps.iconSlot
      : nodeInstance.isOpen
      ? nodeData.renderCancelIcon
      : nodeData.renderOpenIcon

    return (
      <CircleButton
        {...customProps}
        iconSlot={iconSlot}
        label={label}
        isDisabled={isDisabled}
        // remove shadow on native for performance
        elevation={Platform.getType() === 'web' ? 10 : 0}
        {...mandatoryProps}
      />
    )
  }
}

export default Fab
