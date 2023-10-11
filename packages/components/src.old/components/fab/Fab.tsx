import * as React from 'react'
import { Animated, Platform, UserInterface } from 'reactxp'

import { StyleProp } from '../../styles'
import { Position } from '../../types/shared'
import { CircleButton, CircleButtonProps } from '../button'
import {
  Child,
  FoldableTree,
  FoldableTreeProps,
  ROOT_ID,
} from '../foldableTree'
import { TextStyle } from '../text'
import { LayoutInfo, View } from '../view'
import { renderNodeFactory } from './renderNode'
import { FabStyleOverride } from './styles'
import {
  PointerFromLayoutsDistances,
  TargetChange,
  TouchDetector,
  TouchedObject,
} from './TouchDetector'
import { ContentRendererMandatoryProps, INodeView } from './type'

export type FabProps = {
  isDisabled?: boolean
  nodeChildren: Array<Child<FabButtonData>>
  nodeData?: FabButtonData
  nodeOpeningDuration?: number
  optionSeparationAngle?: number
  containerRef: Animated.View | View | null
  position: Position
  rootSpreadOrientation?: number // When user need to force the first spread orientation. Affect only the root.
  spreadRadius?: number
  style?: FabStyleOverride
  isOpen?: boolean
  delayLongPress?: number
  onRef?(fab: Fab): void
  buildButtonProps?(nodeInstance: NodeInstance): Partial<CircleButtonProps>
  onCancel?(): void
  onExit?(index: string | null): void
  onEnter?(index: string | null): void
  onPostClose?(index: string): void
  onPressRoot?(): void
  onPostOpen?(index: string): void
  onPreClose?(index: string): void
  onPreOpen?(index: string): void
  onSelect?(index: string, path?: string[]): void
}

const DEFAULT_SPREAD_RADIUS = 120
const DEFAULT_OPTION_SEPARATION_ANGLE = 45
const DEFAULT_NODE_OPENING_DURATION = 300

export type FabButtonData = {
  label?: string
  renderOpenIcon?: (style: StyleProp<TextStyle>) => React.ReactNode
  renderCancelIcon?: (style: StyleProp<TextStyle>) => React.ReactNode
}

type State = {
  containerPositionRelativeToWindow: Position
  isTouchDetectorEnabled: boolean
}

class Fab extends React.Component<FabProps, State> {
  public state: State = {
    containerPositionRelativeToWindow: { x: 0, y: 0 },
    isTouchDetectorEnabled: true,
  }
  private nodeRefs: Map<string, INodeView<any>> = new Map()
  private touchDetector: TouchDetector

  public UNSAFE_componentWillReceiveProps(props: FabProps) {
    /**
     * https://github.com/facebook/react-native/issues/3282 still needed despit RN effort
     * If the parentRef has no onLayout function, RN measurment return an undefined layout
     */
    if (props.containerRef && props.containerRef.props.onLayout === undefined) {
      // (props.parentRef.props as any).onLayout = () => {}
    }
  }

  public componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  public componentDidUpdate() {
    this.updateParentLayout()
  }

  public render() {
    const { containerPositionRelativeToWindow } = this.state
    const {
      // Root props
      isOpen,
      onPressRoot,

      // Context props
      isDisabled,
      onCancel,
      onEnter,
      onExit,
      onPostClose,
      onPostOpen,
      onPreClose,
      onPreOpen,
      onSelect,
      style,

      // Node props
      delayLongPress = 300,
      nodeOpeningDuration = DEFAULT_NODE_OPENING_DURATION,
      optionSeparationAngle = DEFAULT_OPTION_SEPARATION_ANGLE,
      rootSpreadOrientation,
      spreadRadius = DEFAULT_SPREAD_RADIUS,
      position,
      nodeData = {},
      nodeChildren = [],
      buildButtonProps,
    } = this.props

    const completeProps: FoldableTreeProps<any, any> = {
      id: ROOT_ID,
      isOpen,
      contextProps: {
        isDisabled,
        style,
        onCancel,
        onSelect,
        onEnter,
        onExit,
        onPostClose,
        onPostOpen,
        onPreClose,
        onPreOpen,
        onPressRoot,
        renderNode: renderNodeFactory(
          renderContentFactory({ isDisabled, buildButtonProps, delayLongPress })
        ),
      },
      nodeProps: {
        // root node props
        id: ROOT_ID,
        nodeData,
        nodeParentAbsolutePosition: { x: 0, y: 0 },
        positionRelativeToParentNode: position,
        nodeChildren,
        nodeOpeningDuration,
        optionSeparationAngle,
        onNodeLayout: this.setNodeLayout,
        onUnmount: this.deleteNodeLayout,
        rootSpreadOrientation,
        spreadRadius,
      },
    }

    return (
      <>
        <FoldableTree {...completeProps} />
        {this.state.isTouchDetectorEnabled && (
          <TouchDetector
            positionRelativeToParent={this.props.position}
            containerPositionRelativeToWindow={
              containerPositionRelativeToWindow
            }
            onRef={ref => (this.touchDetector = ref)}
            onObjectLongTouchStart={this.onObjectLongTouchStart}
            onObjectLongTouchStop={this.onObjectLongTouchStop}
            onTouchStop={this.onTouchStop}
            onClick={this.onClick}
            onPointerDistancesFromLayouts={this.scaleChildren}
            onTargetChange={this.onTargetChange}
          />
        )}
      </>
    )
  }

  private updateParentLayout = () => {
    if (this.props.containerRef) {
      UserInterface.measureLayoutRelativeToWindow(this.props.containerRef).then(
        containerPositionRelativeToWindow => {
          if (
            this.state.containerPositionRelativeToWindow.x !==
              containerPositionRelativeToWindow.x ||
            this.state.containerPositionRelativeToWindow.y !==
              containerPositionRelativeToWindow.y
          ) {
            this.setState({ containerPositionRelativeToWindow })
          }
        }
      )
    }
  }

  private onTargetChange = (change: TargetChange) => {
    if (change.op === 'entered') {
      this.props.onEnter && this.props.onEnter(change.target)
    } else {
      this.props.onExit && this.props.onExit(change.prevTarget)
    }
  }

  private onObjectLongTouchStart = (touchedObject: TouchedObject): void => {
    const node = this.nodeRefs.get(touchedObject.targetId)!
    if (node.hasChildren) {
      if (!node.isOpen) {
        node.open()
      } else if (node.isPartialOpen) {
        node.reopen()
      } else if (node.isFullOpen && node.id !== ROOT_ID) {
        node.close()
      }
    }
  }

  private onObjectLongTouchStop = (targetId: string): void => {
    // Select the node if it is a leaf
    if (targetId) {
      const node = this.nodeRefs.get(targetId)
      const isLeaf = !node?.hasChildren
      if (node && isLeaf) {
        this.nodeRefs.get(ROOT_ID)!.close()
        this.props.onSelect && this.props.onSelect(targetId, node.path)
      } else {
        this.nodeRefs.get(ROOT_ID)!.cancel()
      }
    } else {
      // No selection, cancel the navigation
      this.nodeRefs.get(ROOT_ID)!.cancel()
    }
  }

  private scaleChildren = (
    pointerFromLayoutsDistances: PointerFromLayoutsDistances
  ) => {
    pointerFromLayoutsDistances.forEach(({ targetId, distance }) => {
      const node = this.nodeRefs.get(targetId)!
      node.setDistanceFromPointer(distance)
    })
  }

  private onTouchStop = (targetId: string): void => {
    if (targetId === ROOT_ID) {
      this.props.onPressRoot && this.props.onPressRoot()
    }
    // Touched nothing
    if (!targetId) {
      this.nodeRefs.get(ROOT_ID)!.cancel()
    } else {
      this.nodeRefs.get(ROOT_ID)!.close()
    }
  }

  private setNodeLayout = (node: INodeView<any>, layout: LayoutInfo) => {
    this.nodeRefs.set(node.id, node)
    this.touchDetector.actions.addObject(node.id, layout)
  }

  private onClick = (targetId: string) => {
    this.setState({ isTouchDetectorEnabled: false })
    this.nodeRefs.get(targetId)?.open()
  }

  private deleteNodeLayout = (nodeId: string) => {
    this.nodeRefs.delete(nodeId)
    this.touchDetector.actions.removeObject(nodeId)
  }
}

export type NodeInstance = INodeView<FabButtonData>

type RenderNodeFactoryParams = {
  isDisabled?: boolean
  delayLongPress: number
  buildButtonProps?: (nodeInstance: NodeInstance) => Partial<CircleButtonProps>
} & CircleButtonProps

function renderContentFactory({
  isDisabled,
  delayLongPress,
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
        delayLongPress={delayLongPress}
        // remove shadow on native for performance
        elevation={Platform.getType() === 'web' ? 10 : 0}
        {...mandatoryProps}
      />
    )
  }
}

export default Fab
