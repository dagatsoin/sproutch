import { Animated, Types } from 'reactxp'

import {
  BaseNodeProps,
  ContextProps,
  INode,
  SubTreeProps,
} from '../foldableTree'
import { LayoutInfo } from '../view'

export type ButtonRenderer<D> = (params: {
  nodeInstance: INodeView<D>
  mandatoryProps: ContentRendererMandatoryProps
}) => React.ReactNode

export interface INodeView<D> extends INode {
  hasChildren: boolean
  path: string[]
  nodeData: D
  setDistanceFromPointer(distance: number): void
}

export type ComputeAnimatedValues<
  A extends { [K in string]: Animated.Value }
> = (params: { isRoot: boolean }) => A

export type FabAnimatedValues = {
  animatedTranslateX: Animated.Value
  animatedTranslateY: Animated.Value
  animatedOpacity: Animated.Value
  animatedScale: Animated.Value
}

export type ContentRendererMandatoryProps = {
  onLayout: (layout: LayoutInfo) => void
  onHoverStart: (e: Types.SyntheticEvent) => void
  onHoverEnd: (e: Types.SyntheticEvent) => void
  onPress: (e: Types.SyntheticEvent) => void
  onLongPress: (e: Types.SyntheticEvent) => void
}

export type NodeRendererProps<D, S> = {
  contextProps: ContextProps<S>
  isFullOpen: boolean
  isPartialOpen: boolean
  nodeProps: BaseNodeProps<D>
  selectedChildNodeId?: string
  path: string[]
  subTreeProps: SubTreeProps
  onViewRef: (node: INode) => void
  onPress: () => void
}

export type NodeRenderer<D, S> = (
  props: NodeRendererProps<D, S>
) => React.ReactNode
