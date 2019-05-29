import { Types } from 'reactxp'

import { Animated } from '../animated'
import { LayoutInfo } from '../view'

export interface INode {
  id: string
  show: (callback: Types.Animated.EndCallback) => void
  hide: (callback: Types.Animated.EndCallback, ancestorId?: string) => void
}

export interface INodeView<D> {
  hasChildren: boolean
  isOpen: boolean
  nodeData: D
}

export type ContextProps<S> = {
  isDisabled?: boolean
  style?: S
  onCancel?: () => void
  onHover?: (index: string | null) => void
  onPostClose?: (index: string) => void
  onPostOpen?: (index: string) => void
  onPreClose?: (index: string) => void
  onPreOpen?: (index: string) => void
  onSelect?: (index: string, path?: string[]) => void
}

export type SubTreeProps = {
  parentPath: string[]
  onMountSubTree: (child: INode) => void
  onSelectChildLeaf: (id: string, path?: string[]) => void
  onSelectChildNode: (id: string, cb: () => void) => void
}

export type ChildRendererAddedProps<D> = {
  getShowAnimation: BuildShowAnimation<D>
  getHideAnimation: BuildHideAnimation<D>
}

export type ContentRendererMandatoryProps = {
  onHoverStart: (e: Types.SyntheticEvent) => void
  onHoverEnd: (e: Types.SyntheticEvent) => void
  onPress: (e: Types.SyntheticEvent) => void
  onLongPress: (e: Types.SyntheticEvent) => void
}

export type ButtonRenderer<D> = (params: {
  nodeInstance: INodeView<D>
  mandatoryProps: ContentRendererMandatoryProps
}) => React.ReactNode

export type FoldableTreeProps<D, S> = {
  id: string
  isOpen?: boolean
  animatedValues: AnimatedValues
  contextProps: ContextProps<S>
  nodeProps: BaseNodeProps<D>
  renderNode: NodeRenderer<D, S>

  // added by the FoldableTree component
  subTreeProps?: SubTreeProps

  // added by the node renderer
  childRendererAddedProps?: ChildRendererAddedProps<D>
}

export type AnimatedValues = { [key in string]: Animated.Value }

export type BuildShowAnimation<A> = (
  animatedValues: A
) => Types.Animated.CompositeAnimation

export type BuildHideAnimation<A> = (
  animatedValues: A
) => Types.Animated.CompositeAnimation

export type BaseNodeProps<D> = {
  id: string
  nodeChildren: Array<Child<D>>
  nodeData: D
  localPosition: Position
  parentAbsolutePosition: Position
  nodeOpeningDuration: number
  optionSeparationAngle: number
  rootSpreadOrientation?: number // When user need to force the first spread orientation. Affect only the root.
  spreadRadius: number
  onButtonLayout?: (layoutInfo: LayoutInfo) => void
  onMount?: (node: any) => void
  onUnmount?: (node: any) => void
}

export type Child<D> = {
  id: string
  nodeData?: D
  nodeChildren?: Array<Child<D>>
}

export const ROOT_ID = 'root'

export type Position = { x: number; y: number }

export type NodeRendererProps<D, S> = {
  animatedValues: AnimatedValues
  areChildrenDisplayed: boolean
  contextProps: ContextProps<S>
  isDisplayed: boolean
  isFullOpen: boolean
  isPartialOpen: boolean
  nodeProps: BaseNodeProps<D>
  selectedChildNodeId?: string
  subTreeProps: SubTreeProps
  onHoverChild: (index: string) => void
  onPress: () => void
}

export type NodeRenderer<D, S> = (
  props: NodeRendererProps<D, S>
) => React.ReactNode
