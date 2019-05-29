import * as React from 'react'
import { Types, UserInterface } from 'reactxp'

import { isTouch, noop } from '../../helpers'
import { Styles } from '../../styles'
import { Animated } from '../animated'
import {
  AnimatedValues,
  BaseNodeProps,
  ButtonRenderer,
  Child,
  ChildRendererAddedProps,
  ContextProps,
  FoldableTree,
  NodeRenderer,
  Position,
  ROOT_ID,
  SubTreeProps,
} from '../foldableTree'
import { LayoutInfo, View } from '../view'
import {
  Dimensions,
  getHideAnimationFactory,
  getInitialAnimatedValues,
  getPosition,
  getShowAnimationFactory,
  getSpreadOrientation,
} from './common'
import { FabButtonData } from './Fab'
import { createFabStyle, FabStyleOverride } from './styles'

type SAMModel = {
  pointerType: 'mouse' | 'touch'
  touchDetectorLayoutRelativeToParent?: LayoutInfo
  touchDetectorLayoutRelativeToNode?: LayoutInfo
  buttonLayoutRelativeToPage?: LayoutInfo
  pointerToHoveredChildDistance?: number | null
  hoveredChildId: string | null
}

type SAMState = Readonly<SAMModel>

export type NodeViewProps<D, S> = {
  animatedValues: AnimatedValues
  areChildrenDisplayed: boolean
  contextProps: ContextProps<S>
  isDisplayed: boolean
  isFullOpen: boolean
  isPartialOpen: boolean
  nodeProps: BaseNodeProps<D>
  renderButton: ButtonRenderer<D>
  renderNode: NodeRenderer<D, S>
  selectedChildNodeId?: string
  subTreeProps: SubTreeProps
  onHoverChild: (childId: string | null) => void
  onPress: () => void
}

type Props = NodeViewProps<FabButtonData, FabStyleOverride>

type HoverAnimatedValues = {
  translateX: Animated.Value
  translateY: Animated.Value
  scale: Animated.Value
}

export class NodeView extends React.Component<Props> {
  public get isRoot(): boolean {
    return this.props.nodeProps.id === ROOT_ID
  }

  public get localPosition() {
    return this.props.nodeProps.localPosition
  }

  public get layout() {
    return this._state.buttonLayoutRelativeToPage
  }

  public get nodeData() {
    return this.props.nodeProps.nodeData
  }

  public get hasChildren() {
    return !!this.props.nodeProps.nodeChildren.length
  }

  private get isLeaf() {
    return !this.props.isFullOpen && !this.props.isPartialOpen
  }

  public get isOpen() {
    return this.props.isFullOpen || this.props.isPartialOpen
  }

  private get children() {
    const {
      contextProps,
      nodeProps: {
        nodeChildren,
        localPosition: nodeLocalPosition,
        nodeOpeningDuration,
        parentAbsolutePosition: nodeParentAbsolutePosition,
        optionSeparationAngle,
        spreadRadius,
      },
      subTreeProps,
      areChildrenDisplayed,
      isFullOpen,
      renderNode,
      selectedChildNodeId,
    } = this.props

    return renderChildren({
      areChildrenDisplayed,
      contextProps,
      isFullOpen,
      nodeChildren,
      nodeLocalPosition,
      nodeOpeningDuration,
      nodeParentAbsolutePosition,
      onButtonLayout: this.onChildLayout,
      optionSeparationAngle,
      spreadRadius,
      selectedChildNodeId,
      spreadOrientation: this.spreadOrientation,
      subTreeProps,
      onMount: child => this.childRefs.push(child),
      onUnmount: child => {
        this.childRefs = this.childRefs.filter(
          ({ props }) => child.props.nodeProps.id !== props.nodeProps.id
        )
      },
      renderNode,
    })
  }

  private get spreadOrientation() {
    const { buttonLayoutRelativeToPage } = this._state
    const {
      nodeProps: { rootSpreadOrientation, spreadRadius },
    } = this.props

    if (this.isRoot && rootSpreadOrientation) {
      return rootSpreadOrientation
    }

    if (!buttonLayoutRelativeToPage || !this.layout) {
      return 0
    }

    // The button position into the page
    // If the node is still closed, add the final position offset.
    const openedPositionRelativeToPage = {
      x: buttonLayoutRelativeToPage.x,
      y: buttonLayoutRelativeToPage.y,
    }
    return getSpreadOrientation({
      localPosition: openedPositionRelativeToPage,
      radius: spreadRadius,
      nodeLayout: { x: 0, y: 0, ...this.layout },
      parentDimension: UserInterface.measureWindow(),
    })
  }
  private childRefs: NodeView[] = []
  private animatedValues: HoverAnimatedValues = {
    translateX: new Animated.Value(0),
    translateY: new Animated.Value(0),
    scale: new Animated.Value(1),
  }
  private model: SAMModel = {
    pointerType: 'mouse',
    hoveredChildId: null,
  }
  private _state: SAMState = {
    pointerType: 'mouse',
    hoveredChildId: null,
  }
  private animation?: Types.Animated.CompositeAnimation

  public componentDidMount() {
    const { onMount } = this.props.nodeProps
    onMount && onMount(this)
  }

  public componentWillUnmount() {
    const { onUnmount } = this.props.nodeProps
    onUnmount && onUnmount(this)
  }

  public render() {
    const { pointerType } = this._state
    const { areChildrenDisplayed, animatedValues, nodeProps } = this.props
    const { style = {} } = this.props.contextProps

    // Touch detector has dimensions only when the node is open.
    const touchDetectorLayout = this.isOpen
      ? this._state.touchDetectorLayoutRelativeToNode
      : undefined

    const fabStyle = createFabStyle({
      isRoot: this.isRoot,
      localPosition: nodeProps.localPosition,
      isOpen: true,
      touchDetectorLayout,
      style,
    })

    const animatedStyles = {
      toggle: Styles.createAnimatedViewStyle({
        opacity: animatedValues.animatedOpacity,
        transform: [
          { translateX: animatedValues.animatedTranslateX },
          { translateY: animatedValues.animatedTranslateY },
          { scale: animatedValues.animatedScale },
        ],
      }),
      hover: Styles.createAnimatedViewStyle({
        transform: [
          { translateX: this.animatedValues.translateX },
          { translateY: this.animatedValues.translateY },
          { scale: this.animatedValues.scale },
        ],
      }),
    }

    const ButtonContainer = (
      <Animated.View
        style={[
          fabStyle.buttonContainer,
          fabStyle.animatedViewHover,
          animatedStyles.hover,
        ]}
        onLayout={this.onButtonLayout}
      >
        {this.props.renderButton({
          nodeInstance: this,
          mandatoryProps: {
            onHoverStart: this.onHoverStart,
            onHoverEnd: this.onHoverEnd,
            onPress: (e: Types.SyntheticEvent) => {
              // prevent the touch detector, which is just behind, to also trigger
              if (!isTouch(e)) {
                // For consistent behavior:
                // Sometimes the onHoverEnd is trigger sometimes not.
                // Here we force the trigger has the mouse exits the button when it disapears
                this.onHoverEnd()
              }
              if (
                pointerType === 'mouse' ||
                (pointerType === 'touch' && // When using touch screen
                  (!this.props.isFullOpen || // The fab is partial opened or closed
                    (this.props.isFullOpen &&
                      this.props.nodeProps.nodeChildren.length &&
                      this._state.hoveredChildId === null))) // user clicked on the fab
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
        {// On touch screen, the children are displayed behind the touch detector.
        // This allows the following use case:
        // 1- the user taps on the Fab instead of a long press.
        // 2- the user touches and moves on one of the children.
        (!areChildrenDisplayed ||
          (areChildrenDisplayed && pointerType === 'touch')) &&
          this.children}
        <View
          style={fabStyle.touchDetector}
          onResponderStart={this.onResponderStart}
          onMoveShouldSetResponder={() => this.props.isFullOpen}
          onMoveShouldSetResponderCapture={() => this.props.isFullOpen}
          onMouseLeave={this.stopHovering}
          onResponderMove={this.onTouchMove}
          onResponderRelease={this.onResponderRelease}
        >
          {ButtonContainer}
        </View>
        {// On desktop, the children are displayed in front of the touch detector.
        // This allows the following use case:
        // 1- the user clicks/long click on the Fab
        // 2- the user hover the children
        areChildrenDisplayed && pointerType === 'mouse' && this.children}
      </Animated.View>
    )
  }

  private onButtonLayout = (layout: LayoutInfo) => {
    const {
      nodeProps: { onButtonLayout = noop },
    } = this.props
    this.setButtonLayoutRelativeToPage(layout)
    if (onButtonLayout) {
      onButtonLayout(layout)
    }
  }

  private onChildLayout = (_layout: LayoutInfo) => {
    const {
      nodeProps: { nodeChildren },
    } = this.props
    if (areAllChildrenLayoutRegistered(nodeChildren.length, this.childRefs)) {
      this.setTouchDetectorLayoutRelativeToNode()
    }
  }

  private onPress = () => {
    this.animateScaleDown()
    this.props.onPress()
  }

  private onHoverStart = () => {
    // Wait for the node to be displayed.
    // Not for disabled node.
    this.props.onHoverChild(this.props.nodeProps.id)
    this.animateScaleUp()
  }

  private onHoverEnd = () => {
    // Wait for the node to be displayed.
    // Not for touch event.
    // Not for disabled node.
    this.props.onHoverChild(null)
    this.animateScaleDown()
  }

  private onTouchMove = (e: Types.TouchEvent) => {
    const touch = e.touches[0]
    if (touch) {
      this.setTouchDetectorPositionRelativeToRootParent()

      if (this._state.touchDetectorLayoutRelativeToParent) {
        const localMousePosition = {
          x: touch.pageX - this._state.touchDetectorLayoutRelativeToParent.x,
          y: touch.pageY - this._state.touchDetectorLayoutRelativeToParent.y,
        }
        this.setHoveredChild(localMousePosition)
        this.setChildDistanceFromPointer(localMousePosition)
      }
    }
  }

  private onResponderStart = (e: Types.TouchEvent) => {
    this.setPointerType(e)
    this.onTouchMove(e)
  }

  private onResponderRelease = (e: Types.TouchEvent) => {
    const touch = e.changedTouches[0]
    if (touch) {
      this.setTouchDetectorPositionRelativeToRootParent()

      if (this._state.touchDetectorLayoutRelativeToParent) {
        const localMousePosition = {
          x: touch.pageX - this._state.touchDetectorLayoutRelativeToParent.x,
          y: touch.pageY - this._state.touchDetectorLayoutRelativeToParent.y,
        }
        this.setHoveredChild(localMousePosition)
        this.setChildDistanceFromPointer(localMousePosition)
      }
    }
    this.openHoveredChild()
  }

  //
  // Actions
  //
  private setButtonLayoutRelativeToPage = (layout: LayoutInfo) => {
    const {
      nodeProps: { localPosition, parentAbsolutePosition },
    } = this.props
    this.present({
      buttonLayoutRelativeToPage: {
        x: parentAbsolutePosition.x + localPosition.x,
        y: parentAbsolutePosition.y + localPosition.y,
        width: layout.width,
        height: layout.height,
      },
    })
  }

  private setPointerType = (e: Types.SyntheticEvent) => {
    this.present({ pointerType: isTouch(e) ? 'touch' : 'mouse' })
  }

  private setHoveredChild = (pointerPos: Position) => {
    const { nodeChildren: children } = this.props.nodeProps
    const {
      touchDetectorLayoutRelativeToNode,
      buttonLayoutRelativeToPage,
    } = this._state
    if (
      !children ||
      !touchDetectorLayoutRelativeToNode ||
      !buttonLayoutRelativeToPage ||
      this.isLeaf
    )
      return

    const maybeChild = children.find((_, index, { length }) =>
      isHover({
        parentNodeDimension: {
          width: buttonLayoutRelativeToPage.width,
          height: buttonLayoutRelativeToPage.height,
        },
        touchDetectorLayoutRelativeToNode,
        pointerPos,
        siblingNumber: length,
        index,
        spreadRadius: this.props.nodeProps.spreadRadius,
        orientation: this.spreadOrientation,
        openSeparationAngle: this.props.nodeProps.optionSeparationAngle,
      })
    )

    this.present({ hoveredChildId: maybeChild ? maybeChild.id : null })
  }

  private setChildDistanceFromPointer = (pointerPos: Position) => {
    const {
      nodeChildren,
      spreadRadius,
      optionSeparationAngle,
    } = this.props.nodeProps
    const { touchDetectorLayoutRelativeToNode, hoveredChildId } = this._state
    if (
      !!hoveredChildId &&
      !!touchDetectorLayoutRelativeToNode &&
      this.childRefs.length
    ) {
      const childIndex = nodeChildren.findIndex(
        ({ id }) => id === hoveredChildId
      )
      const childPosition = getPosition({
        optionSeparationAngle,
        spreadRadius,
        spreadOrientation: this.spreadOrientation,
        siblingNumber: nodeChildren.length,
        index: childIndex,
      })
      const childLayoutRelativeToNode = {
        x: childPosition.x,
        y: childPosition.y,
        width: this.childRefs[0].layout!.width,
        height: this.childRefs[0].layout!.height,
      }
      const pointerToHoveredChildDistance = !!hoveredChildId
        ? getPointerToHoveredChildDistance({
            touchDetectorLayoutRelativeToNode,
            pointerPos,
            childLayoutRelativeToNode,
          })
        : undefined
      this.present({ pointerToHoveredChildDistance })
    } else {
      this.present({ pointerToHoveredChildDistance: null })
    }
  }

  private stopHovering = () => {
    if (this.isLeaf) return
    this.present({ hoveredChildId: null })
  }

  private setTouchDetectorPositionRelativeToRootParent() {
    const childrenDimensions = getChildrenDimensions(this.childRefs)
    const {
      localPosition,
      parentAbsolutePosition,
      optionSeparationAngle,
      spreadRadius,
    } = this.props.nodeProps

    if (!childrenDimensions.length) {
      return
    }
    const boundingBox = getBoundingBox({
      optionSeparationAngle,
      spreadRadius,
      childrenDimensions,
      spreadOrientation: this.spreadOrientation,
    })
    const touchDetectorLayoutRelativeToParent = {
      x: parentAbsolutePosition.x + localPosition.x + boundingBox.x,
      y: parentAbsolutePosition.y + localPosition.y + boundingBox.y,
      width: boundingBox.width,
      height: boundingBox.height,
    }
    this.present({ touchDetectorLayoutRelativeToParent })
  }

  private setTouchDetectorLayoutRelativeToNode = () => {
    const childrenDimensions = getChildrenDimensions(this.childRefs)
    const { optionSeparationAngle, spreadRadius } = this.props.nodeProps

    if (!childrenDimensions.length) {
      return
    }

    const touchDetectorLayoutRelativeToNode = getBoundingBox({
      optionSeparationAngle,
      spreadRadius,
      childrenDimensions,
      spreadOrientation: this.spreadOrientation,
    })

    if (touchDetectorLayoutRelativeToNode) {
      this.present({ touchDetectorLayoutRelativeToNode })
    }
  }

  //
  // Acceptors
  //

  private present = (payload: Partial<SAMModel>) => {
    const previousModel = {
      ...this.model,
    }
    // hoveredChildId is nullable
    if (payload.hoveredChildId !== undefined) {
      this.model.hoveredChildId = payload.hoveredChildId
    }
    if (payload.touchDetectorLayoutRelativeToParent) {
      if (!this.model.touchDetectorLayoutRelativeToParent) {
        this.model.touchDetectorLayoutRelativeToParent =
          payload.touchDetectorLayoutRelativeToParent
      }
    }
    if (payload.touchDetectorLayoutRelativeToNode) {
      if (!this.model.touchDetectorLayoutRelativeToNode) {
        this.model.touchDetectorLayoutRelativeToNode =
          payload.touchDetectorLayoutRelativeToNode
      }
    }
    // touchDetectorLayoutRelativeToNode is nullable
    if (payload.pointerToHoveredChildDistance !== undefined) {
      this.model.pointerToHoveredChildDistance =
        payload.pointerToHoveredChildDistance
    }
    if (payload.buttonLayoutRelativeToPage) {
      this.model.buttonLayoutRelativeToPage = payload.buttonLayoutRelativeToPage
    }
    if (payload.pointerType) {
      this.model.pointerType = payload.pointerType
    }
    this.computeState(this.model, previousModel)
  }

  //
  // State function
  //

  private computeState = (model: SAMModel, prevModel: SAMModel) => {
    const currentHoveredChildId = model.hoveredChildId
    const previousHoveredChildId = prevModel.hoveredChildId

    /* Compute control state */
    const didStartHoveredChild =
      currentHoveredChildId !== null && previousHoveredChildId === null
    const didStopHoveredChild =
      currentHoveredChildId === null && previousHoveredChildId !== null
    const didChangeHoveredChild =
      !!currentHoveredChildId &&
      !!previousHoveredChildId &&
      currentHoveredChildId !== previousHoveredChildId

    /* Update view */
    this._state = { ...model }

    // Handle the scale of the hovered child
    const child = this.childRefs.find(
      ({ props }) => props.nodeProps.id === model.hoveredChildId
    )
    // Animate the new hovered child
    if (child && this.props.areChildrenDisplayed) {
      onHoverFeedback({
        localPosition: child.localPosition,
        animatedValues: child.animatedValues,
        distanceFromChildCenter: model.pointerToHoveredChildDistance,
      })
    }

    // Reset the previous hovered child
    if (didStopHoveredChild || didChangeHoveredChild) {
      const prevChild = this.childRefs.find(
        ({ props }) => props.nodeProps.id === prevModel.hoveredChildId
      )
      if (prevChild) {
        prevChild.animateScaleDown()
      }
    }
    // Trigger the onHoverChild callback
    if (didStartHoveredChild || didChangeHoveredChild || didStopHoveredChild) {
      if (this.props.onHoverChild) {
        this.props.onHoverChild(currentHoveredChildId)
      }
    }
  }

  private animateScaleUp() {
    if (this.animation) {
      this.animation.stop()
    }

    this.animation = getHoverAnimation({
      toPos: {
        x: 0,
        y: 0,
      },
      toScale: 1.2,
      animatedValues: this.animatedValues,
      duration: 100,
    })

    this.animation.start()
  }

  private animateScaleDown() {
    if (this.animation) {
      this.animation.stop()
    }

    this.animation = getHoverAnimation({
      toPos: {
        x: 0,
        y: 0,
      },
      toScale: 1,
      animatedValues: this.animatedValues,
      duration: 100,
    })

    this.animation.start()
  }

  private openHoveredChild = () => {
    const child = this.childRefs.find(
      ({ props }) => props.nodeProps.id === this._state.hoveredChildId
    )
    child && child.onPress()
  }
}

function isHover({
  touchDetectorLayoutRelativeToNode,
  pointerPos,
  siblingNumber,
  index,
  orientation,
  spreadRadius,
  openSeparationAngle,
  parentNodeDimension,
}: {
  parentNodeDimension: Dimensions
  touchDetectorLayoutRelativeToNode: LayoutInfo
  pointerPos: {
    x: number
    y: number
  }
  siblingNumber: number
  index: number
  spreadRadius: number
  orientation: number
  openSeparationAngle: number
}) {
  const minRadius =
    Math.hypot(parentNodeDimension.width, parentNodeDimension.height) / 2
  const maxRadius = spreadRadius + 100
  const spread = openSeparationAngle * (siblingNumber - 1) // degree angle on which the options are distributed

  const nodeCenterInCollider = {
    x: -touchDetectorLayoutRelativeToNode.x + parentNodeDimension.width / 2,
    y: -touchDetectorLayoutRelativeToNode.y + parentNodeDimension.height / 2,
  }

  // We compute the angle bewtween the X axis and the vector representented by the center of the node to the touch position.
  // We need an angle between 0-360deg
  // We rotate the vector by 90 deg (trigonometric direction) to have the 0 along the X axis.
  const rotatedVectorBy90 = {
    x: -pointerPos.x + nodeCenterInCollider.x,
    y: -pointerPos.y + nodeCenterInCollider.y,
  }
  // touch distance
  const dist = Math.hypot(rotatedVectorBy90.x, rotatedVectorBy90.y)

  if (dist < minRadius || dist > maxRadius) return false

  // touch angle between 0-360 deg
  const angle =
    ((Math.PI + Math.atan2(rotatedVectorBy90.y, rotatedVectorBy90.x)) * 180) /
    Math.PI
  // touch angle between 0 and (+/-180) deg
  const angle180 = angle > 180 ? angle - 360 : angle

  // limits angles between 0 and (+/-180) deg
  const limitA =
    orientation -
    spread / 2 +
    openSeparationAngle * index -
    openSeparationAngle / 2
  const limitB = limitA + openSeparationAngle
  // limits angles between 0 and 360 deg
  const limitA360Base = limitA < 0 ? limitA + 360 : limitA
  const limitB360Base = limitA360Base + openSeparationAngle

  // Special case, if the checked node is near the X axis, limitA could be negative and limitB could be positive
  return limitA <= 0 && limitB >= 0
    ? limitA < angle180 && angle180 < limitB
    : limitA360Base < angle && angle < limitB360Base
}

function areAllChildrenLayoutRegistered(
  childrenNumber: number,
  childRefs: NodeView[]
) {
  return (
    childRefs.length === childrenNumber &&
    childRefs.every(({ layout }) => !!layout)
  )
}

function getChildrenDimensions(childRefs: NodeView[]) {
  return childRefs
    .map(
      ({ layout }) => !!layout && { width: layout.width, height: layout.height }
    )
    .filter(layout => !!layout) as LayoutInfo[]
}

function getPointerToHoveredChildDistance({
  childLayoutRelativeToNode,
  touchDetectorLayoutRelativeToNode,
  pointerPos,
}: {
  childLayoutRelativeToNode: LayoutInfo
  touchDetectorLayoutRelativeToNode: Position
  pointerPos: {
    x: number
    y: number
  }
}): number {
  const childrenCenterPosition = {
    x:
      -touchDetectorLayoutRelativeToNode.x +
      childLayoutRelativeToNode.x +
      childLayoutRelativeToNode.width / 2,
    y:
      -touchDetectorLayoutRelativeToNode.y +
      childLayoutRelativeToNode.y +
      childLayoutRelativeToNode.height / 2,
  }

  return Math.hypot(
    childrenCenterPosition.x - pointerPos.x,
    childrenCenterPosition.y - pointerPos.y
  )
}

/**
 * Compute the bounding box of an opened node.
 * The top/left direction taked in account the size of the layout button.
 */
function getBoundingBox({
  childrenDimensions,
  spreadOrientation,
  optionSeparationAngle,
  spreadRadius,
}: {
  optionSeparationAngle: number
  childrenDimensions: Dimensions[]
  spreadOrientation: number
  spreadRadius: number
}): LayoutInfo {
  const childrenLayouts: LayoutInfo[] = childrenDimensions.map(
    (dimensions, index, { length }) => ({
      ...dimensions,
      ...getPosition({
        spreadRadius,
        optionSeparationAngle,
        spreadOrientation,
        siblingNumber: length,
        index,
      }),
    })
  )

  const rightestChild = childrenLayouts.reduce(
    (farestChild, childWithPosition) => {
      if (farestChild) {
        return farestChild.x > childWithPosition.x
          ? farestChild
          : childWithPosition
      } else {
        return childWithPosition
      }
    },
    childrenLayouts[0]
  )
  const leftestChild = childrenLayouts.reduce(
    (farestChild, childWithPosition) => {
      if (farestChild) {
        return farestChild.x < childWithPosition.x
          ? farestChild
          : childWithPosition
      } else {
        return childWithPosition
      }
    },
    childrenLayouts[0]
  )
  const uppestChild = childrenLayouts.reduce(
    (farestChild, childWithPosition) => {
      if (farestChild) {
        return farestChild.y < childWithPosition.y
          ? farestChild
          : childWithPosition
      } else {
        return childWithPosition
      }
    },
    childrenLayouts[0]
  )
  const lowestChild = childrenLayouts.reduce(
    (farestChild, childWithPosition) => {
      if (farestChild) {
        return farestChild.y > childWithPosition.y
          ? farestChild
          : childWithPosition
      } else {
        return childWithPosition
      }
    },
    childrenLayouts[0]
  )

  const leftest = Math.min(0, leftestChild.x)
  const rightest = Math.max(0, rightestChild.x)
  const uppest = Math.min(0, uppestChild.y)
  const lowest = Math.max(0, lowestChild.y)

  const width = rightest - leftest + rightestChild.width
  const height = lowest - uppest + lowestChild.height

  return {
    x: leftest,
    y: uppest,
    width,
    height,
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
  areChildrenDisplayed,
  contextProps,
  isFullOpen,
  nodeChildren,
  nodeLocalPosition,
  nodeOpeningDuration,
  nodeParentAbsolutePosition,
  onButtonLayout,
  onMount,
  onUnmount,
  optionSeparationAngle,
  renderNode,
  selectedChildNodeId,
  spreadOrientation,
  spreadRadius,
  subTreeProps,
}: {
  areChildrenDisplayed: boolean
  contextProps: ContextProps<any>
  isFullOpen: boolean
  nodeChildren: Array<Child<any>>
  nodeLocalPosition: Position
  nodeOpeningDuration: number
  nodeParentAbsolutePosition: Position
  optionSeparationAngle: number
  renderNode: NodeRenderer<any, any>
  selectedChildNodeId?: string
  spreadOrientation: number
  spreadRadius: number
  subTreeProps: SubTreeProps
  onButtonLayout: (layoutInfo: LayoutInfo) => void
  onMount?: (node: NodeView) => void
  onUnmount?: (node: NodeView) => void
}) {
  return nodeChildren.reduce(
    (els, child, index, { length: siblingNumber }) => {
      const { id } = child
      const localPosition = getPosition({
        spreadRadius,
        optionSeparationAngle,
        spreadOrientation,
        siblingNumber,
        index,
      })
      const parentAbsolutePosition = {
        x: nodeParentAbsolutePosition.x + nodeLocalPosition.x,
        y: nodeParentAbsolutePosition.y + nodeLocalPosition.y,
      }
      const animatedValues = areChildrenDisplayed
        ? {
            animatedTranslateX: new Animated.Value(localPosition.x),
            animatedTranslateY: new Animated.Value(localPosition.y),
            animatedOpacity: new Animated.Value(1),
            animatedScale: new Animated.Value(1),
          }
        : getInitialAnimatedValues({
            isRoot: false,
          })
      const childRendererAddedProps: ChildRendererAddedProps<any> = {
        getShowAnimation: getShowAnimationFactory(
          localPosition,
          nodeOpeningDuration
        ),
        getHideAnimation: getHideAnimationFactory(nodeOpeningDuration),
      }

      if (isFullOpen || child.id === selectedChildNodeId) {
        return [
          ...els,
          <FoldableTree
            key={id}
            id={child.id}
            animatedValues={animatedValues}
            renderNode={renderNode}
            subTreeProps={subTreeProps}
            contextProps={contextProps}
            childRendererAddedProps={childRendererAddedProps}
            nodeProps={{
              id: child.id,
              nodeData: child.nodeData || {},
              nodeChildren: child.nodeChildren || [],
              localPosition,
              parentAbsolutePosition,
              onButtonLayout,
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
    },
    [] as React.ReactNode[]
  )
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
