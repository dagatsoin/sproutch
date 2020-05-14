import * as React from 'react'
import { Types, UserInterface } from 'reactxp'

import { isTouch, noop } from '../../helpers'
import { Styles } from '../../styles'
import { Position } from '../../types/shared'
import { Animated } from '../animated'
import {
  BaseNodeProps,
  Child,
  ContextProps,
  FoldableTree,
  INode,
  NodeLayout,
  ROOT_ID,
  SubTreeProps,
} from '../foldableTree'
import { LayoutInfo } from '../view'
import {
  getInitialAnimatedValues,
  getPosition,
  getSpreadOrientation,
} from './business'
import { FabButtonData } from './Fab'
import { createFabStyle, FabStyleOverride } from './styles'
import {
  ButtonRenderer,
  FabAnimatedValues,
  INodeView,
  NodeRenderer,
} from './type'

export type NodeViewProps<D, S> = {
  contextProps: ContextProps<S>
  isFullOpen: boolean
  isPartialOpen: boolean
  nodeProps: BaseNodeProps<D>
  renderButton: ButtonRenderer<D>
  renderNode: NodeRenderer<D, S>
  selectedChildNodeId?: string
  path: string[]
  subTreeProps: SubTreeProps
  onViewRef: (node: INode) => void
  onPress: (params?: { isCancel?: boolean; isLongPress?: boolean }) => void
  onPressRoot?: () => void
}

type Props = NodeViewProps<FabButtonData, FabStyleOverride>

type HoverAnimatedValues = {
  translateX: Animated.Value
  translateY: Animated.Value
  scale: Animated.Value
}

type State = {
  width: number
  height: number
}

export class NodeView extends React.Component<Props, State>
  implements INodeView<any> {
  public get id(): string {
    return this.props.nodeProps.id
  }

  public get isRoot(): boolean {
    return this.props.nodeProps.id === ROOT_ID
  }

  public get localPosition() {
    return this.props.nodeProps.positionRelativeToParentNode
  }

  public get nodeData() {
    return this.props.nodeProps.nodeData
  }

  public get hasChildren() {
    return !!this.props.nodeProps.nodeChildren.length
  }

  public get isOpen() {
    return this.props.isFullOpen || this.props.isPartialOpen
  }

  public get isFullOpen() {
    return this.props.isFullOpen
  }

  public get isPartialOpen() {
    return this.props.isPartialOpen
  }

  public get path(): string[] {
    return this.props.path
  }

  private get spreadOrientation() {
    const {
      nodeProps: { rootSpreadOrientation, spreadRadius },
    } = this.props

    if (this.isRoot && rootSpreadOrientation) {
      return rootSpreadOrientation
    }

    if (!this.buttonLayoutRelativeToContainer) {
      return 0
    }

    // The button position into the page
    // If the node is still closed, add the final position offset.
    const openedPositionRelativeToPage = {
      x: this.buttonLayoutRelativeToContainer.x,
      y: this.buttonLayoutRelativeToContainer.y,
    }
    return getSpreadOrientation({
      localPosition: openedPositionRelativeToPage,
      radius: spreadRadius,
      nodeLayout: { x: 0, y: 0, ...this.buttonLayoutRelativeToContainer }, // FIX ME, pass the container layout
      parentDimension: UserInterface.measureWindow(),
    })
  }
  public state: State = {
    width: 0,
    height: 0,
  }
  private animatedProximityValues: HoverAnimatedValues = {
    translateX: new Animated.Value(0),
    translateY: new Animated.Value(0),
    scale: new Animated.Value(1),
  }
  private animatedToggleValues: FabAnimatedValues
  private buttonLayoutRelativeToContainer?: LayoutInfo
  private touchProximityAnimation?: Types.Animated.CompositeAnimation
  private animation?: Types.Animated.CompositeAnimation

  public setDistanceFromPointer(distance: number) {
    // Scale only leafs
    if (!this.hasChildren) {
      onHoverFeedback({
        animatedValues: this.animatedProximityValues,
        localPosition: this.localPosition,
        distanceFromChildCenter: distance,
      })
    }
  }

  public open(): void {
    if (!this.isOpen) {
      this.props.onPress()
    }
  }

  public close(): void {
    if (this.isOpen) {
      this.props.onPress()
    }
  }

  public reopen(): void {
    this.props.onPress({ isLongPress: true })
  }

  public cancel(): void {
    this.props.onPress({ isCancel: true })
  }

  public hideChildren(): void {
    throw Error('Method not implemented')
  }

  public constructor(props: Props) {
    super(props)
    // Init animated values
    this.animatedToggleValues = getInitialAnimatedValues({
      isRoot: this.props.nodeProps.id === ROOT_ID,
    })
  }

  public componentDidMount() {
    const { onViewRef } = this.props
    if (!this.isRoot) {
      this.show(noop)
    }
    onViewRef && onViewRef(this)
  }

  public componentWillUnmount() {
    const { onUnmount, id } = this.props.nodeProps
    onUnmount && onUnmount(id)
  }

  public render() {
    const {
      contextProps,
      nodeProps: {
        nodeChildren,
        positionRelativeToParentNode: nodeLocalPosition,
        nodeOpeningDuration,
        nodeParentAbsolutePosition,
        optionSeparationAngle,
        spreadRadius,
        onNodeLayout,
      },
      subTreeProps,
      isFullOpen,
      selectedChildNodeId,
      nodeProps,
    } = this.props
    const { style = {} } = this.props.contextProps

    const fabStyle = createFabStyle({
      isRoot: this.isRoot,
      localPosition: nodeProps.positionRelativeToParentNode,
      style,
      ...this.state,
    })

    const animatedStyles = {
      toggle: Styles.createAnimatedViewStyle({
        opacity: this.animatedToggleValues.animatedOpacity,
        transform: [
          { translateX: this.animatedToggleValues.animatedTranslateX },
          { translateY: this.animatedToggleValues.animatedTranslateY },
          { scale: this.animatedToggleValues.animatedScale },
        ],
      }),
      hover: Styles.createAnimatedViewStyle({
        transform: [
          { translateX: this.animatedProximityValues.translateX },
          { translateY: this.animatedProximityValues.translateY },
          { scale: this.animatedProximityValues.scale },
        ],
      }),
    }

    const children = renderChildren({
      contextProps,
      isFullOpen,
      nodeChildren,
      nodeLocalPosition,
      nodeOpeningDuration,
      nodeParentAbsolutePosition,
      onNodeLayout,
      optionSeparationAngle,
      spreadRadius,
      selectedChildNodeId,
      spreadOrientation: this.spreadOrientation,
      subTreeProps,
      onUnmount: childId => {
        this.props.nodeProps.onUnmount &&
          this.props.nodeProps.onUnmount(childId)
      },
    })

    const ButtonContainer = (
      <Animated.View
        style={[
          fabStyle.buttonContainer,
          fabStyle.animatedViewHover,
          animatedStyles.hover,
        ]}
        onLayout={this.onNodeLayout}
      >
        {this.props.renderButton({
          nodeInstance: this,
          mandatoryProps: {
            onHoverStart: this.onHoverStart,
            onHoverEnd: this.onHoverEnd,
            onLayout: ({ width, height }: LayoutInfo) => {
              if (
                (this.state.width === 0 && this.state.width !== width) ||
                (this.state.height === 0 && this.state.height !== height)
              ) {
                this.setState({ width, height })
              }
            },
            onPress: (e: Types.SyntheticEvent) => {
              if (this.isRoot) {
                this.props.contextProps.onPressRoot &&
                  this.props.contextProps.onPressRoot()
              }
              // prevent the touch detector, which is just behind, to also trigger
              if (!isTouch(e)) {
                // For consistent behavior:
                // Sometimes the onHoverEnd is trigger sometimes not.
                // Here we force the trigger has the mouse exits the button when it disapears
                this.onHoverEnd()
              }
              if (
                !isTouch(e) ||
                (isTouch(e) && // Press on touch screen works
                  (this.props.isPartialOpen || // The fab is partial opened
                  this.props.isFullOpen || // or full open
                    (this.props.isFullOpen &&
                      this.props.nodeProps.nodeChildren.length)))
              )
                this.onPress()
            },
            onLongPress: (e: Types.SyntheticEvent) => {
              if (!this.isOpen && this.hasChildren) {
                e.stopPropagation()
                this.onPress()
              }
            },
          },
        })}
      </Animated.View>
    )

    return (
      <Animated.View
        style={[
          fabStyle.animatedViewToggle,
          animatedStyles.toggle,
          this.isRoot ? fabStyle.root : {},
        ]}
      >
        {children}
        {ButtonContainer}
      </Animated.View>
    )
  }

  public show = (callback: Types.Animated.EndCallback) => {
    if (this.animation) {
      this.animation.stop()
    }

    this.animation = Animated.parallel([
      Animated.timing(this.animatedToggleValues.animatedTranslateX, {
        toValue: this.props.nodeProps.positionRelativeToParentNode.x,
        duration: this.props.nodeProps.nodeOpeningDuration,
        easing: Animated.Easing.InOut(),
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedToggleValues.animatedTranslateY, {
        toValue: this.props.nodeProps.positionRelativeToParentNode.y,
        duration: this.props.nodeProps.nodeOpeningDuration,
        easing: Animated.Easing.InOut(),
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedToggleValues.animatedOpacity, {
        toValue: 1,
        duration: this.props.nodeProps.nodeOpeningDuration,
        easing: Animated.Easing.InOut(),
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedToggleValues.animatedScale, {
        toValue: 1,
        duration: this.props.nodeProps.nodeOpeningDuration,
        easing: Animated.Easing.InOut(),
        useNativeDriver: true,
      }),
    ])

    this.animation.start(callback)
  }

  public hide = (callback: Types.Animated.EndCallback) => {
    this.animation = Animated.parallel([
      Animated.timing(this.animatedToggleValues.animatedTranslateX, {
        toValue: 0,
        duration: this.props.nodeProps.nodeOpeningDuration,
        easing: Animated.Easing.InOut(),
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedToggleValues.animatedTranslateY, {
        toValue: 0,
        duration: this.props.nodeProps.nodeOpeningDuration,
        easing: Animated.Easing.InOut(),
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedToggleValues.animatedOpacity, {
        toValue: 0,
        duration: this.props.nodeProps.nodeOpeningDuration,
        easing: Animated.Easing.InOut(),
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedToggleValues.animatedScale, {
        toValue: 1,
        duration: this.props.nodeProps.nodeOpeningDuration,
        easing: Animated.Easing.InOut(),
        useNativeDriver: true,
      }),
    ])

    this.animation.start(callback)
  }

  private onNodeLayout = (layout: LayoutInfo) => {
    this.setButtonLayoutRelativeToContainer(layout)
    this.props.nodeProps.onNodeLayout(
      this,
      this.buttonLayoutRelativeToContainer!
    )
  }

  private onPress = () => {
    this.animateScaleDown()
    this.props.onPress()
  }

  private onHoverStart = () => {
    // Wait for the node to be displayed.
    // Not for disabled node.
    this.props.contextProps.onEnter && this.props.contextProps.onEnter(this.id)
    this.animateScaleUp()
  }

  private onHoverEnd = () => {
    // Wait for the node to be displayed.
    // Not for touch event.
    // Not for disabled node.
    this.props.contextProps.onExit && this.props.contextProps.onExit(this.id)
    this.animateScaleDown()
  }

  private setButtonLayoutRelativeToContainer = (layout: LayoutInfo) => {
    const {
      nodeProps: { positionRelativeToParentNode, nodeParentAbsolutePosition },
    } = this.props
    this.buttonLayoutRelativeToContainer = {
      x: (nodeParentAbsolutePosition.x || 0) + positionRelativeToParentNode.x,
      y: (nodeParentAbsolutePosition.y || 0) + positionRelativeToParentNode.y,
      width: layout.width,
      height: layout.height,
    }
  }

  private animateScaleUp() {
    if (this.touchProximityAnimation) {
      this.touchProximityAnimation.stop()
    }

    this.touchProximityAnimation = getHoverAnimation({
      toPos: {
        x: 0,
        y: 0,
      },
      toScale: 1.2,
      animatedValues: this.animatedProximityValues,
      duration: 100,
    })

    this.touchProximityAnimation.start()
  }

  private animateScaleDown() {
    if (this.touchProximityAnimation) {
      this.touchProximityAnimation.stop()
    }

    this.touchProximityAnimation = getHoverAnimation({
      toPos: {
        x: 0,
        y: 0,
      },
      toScale: 1,
      animatedValues: this.animatedProximityValues,
      duration: 100,
    })

    this.touchProximityAnimation.start()
  }
}

function getHoverAnimation({
  toPos,
  toScale,
  animatedValues,
  duration,
}: {
  toPos: Position
  toScale: number
  animatedValues: HoverAnimatedValues
  duration?: number
}) {
  return Animated.parallel([
    Animated.timing(animatedValues.translateX, {
      toValue: toPos.x,
      duration,
      easing: Animated.Easing.InOut(),
    }),
    Animated.timing(animatedValues.translateY, {
      toValue: toPos.y,
      duration,
      easing: Animated.Easing.InOut(),
    }),
    Animated.timing(animatedValues.scale, {
      toValue: toScale,
      duration,
      easing: Animated.Easing.InOut(),
    }),
  ])
}

function renderChildren({
  contextProps,
  isFullOpen,
  nodeChildren,
  nodeLocalPosition,
  nodeOpeningDuration,
  nodeParentAbsolutePosition,
  onNodeLayout,
  onMount,
  onUnmount,
  optionSeparationAngle,
  selectedChildNodeId,
  spreadOrientation,
  spreadRadius,
  subTreeProps,
}: {
  contextProps: ContextProps<any>
  isFullOpen: boolean
  nodeChildren: Array<Child<any>>
  nodeLocalPosition: Position
  nodeOpeningDuration: number
  nodeParentAbsolutePosition: Partial<Position>
  optionSeparationAngle: number
  selectedChildNodeId?: string
  spreadOrientation: number
  spreadRadius: number
  subTreeProps: SubTreeProps
  onNodeLayout: (node: INode, layoutInfo: LayoutInfo) => void
  onMount?: (node: INode) => void
  onUnmount?: (nodeId: string) => void
}) {
  return nodeChildren.reduce((els, child, index, { length: siblingNumber }) => {
    const { id } = child
    const localPosition = getPosition({
      spreadRadius,
      optionSeparationAngle,
      spreadOrientation,
      siblingNumber,
      index,
    })
    const parentNodeAbsolutePosition = {
      x: (nodeParentAbsolutePosition.x || 0) + nodeLocalPosition.x,
      y: (nodeParentAbsolutePosition.y || 0) + nodeLocalPosition.y,
    }

    if (isFullOpen || child.id === selectedChildNodeId) {
      return [
        ...els,
        <FoldableTree
          key={id}
          id={child.id}
          subTreeProps={subTreeProps}
          contextProps={contextProps}
          nodeProps={{
            id: child.id,
            nodeData: child.nodeData || {},
            nodeChildren: child.nodeChildren || [],
            positionRelativeToParentNode: localPosition,
            nodeParentAbsolutePosition: parentNodeAbsolutePosition,
            onNodeLayout,
            onMount,
            onUnmount,
            nodeOpeningDuration,
            optionSeparationAngle,
            spreadRadius,
          }}
        />,
      ]
    }
    return els
  }, [] as React.ReactNode[])
}

/**
 * Handle the feedback when the pointer is getting closer of a child.
 * Scale the child up as function and push it away from the touch
 */
function onHoverFeedback({
  localPosition,
  animatedValues,
  distanceFromChildCenter: distanceFromCenter,
}: {
  localPosition: Position
  animatedValues: HoverAnimatedValues
  distanceFromChildCenter: number | undefined | null
}) {
  // Not for disabled or node which are not ready
  const addScale = 0.1
  const lowTreshold = 32
  const hiTreshold = 100
  const relativeDistance = (distanceFromCenter || Infinity) - lowTreshold
  const clampedDistance = Math.min(hiTreshold, Math.max(0, relativeDistance))
  const factor =
    addScale - clampedDistance / ((hiTreshold - lowTreshold) / addScale)
  const toScale = 1 + factor

  if (distanceFromCenter) {
    animatedValues.translateX.setValue(localPosition.x * factor)
    animatedValues.translateY.setValue(localPosition.y * factor)
    animatedValues.scale.setValue(toScale)
  }
}
