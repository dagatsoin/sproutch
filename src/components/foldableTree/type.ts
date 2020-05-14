import { Types } from 'reactxp'

import { Position } from '../../types/shared'
import { NodeRenderer } from '../fab/type'
import { LayoutInfo } from '../view'

export interface INode {
  id: string
  isOpen: boolean
  isPartialOpen: boolean
  isFullOpen: boolean
  show: (callback: Types.Animated.EndCallback) => void
  hide: (callback: Types.Animated.EndCallback, ancestorId?: string) => void
  hideChildren(): void
  open(): void
  close(): void
  cancel(): void
  reopen(): void
}
export type ContextProps<S> = {
  isDisabled?: boolean
  style?: S
  renderNode: NodeRenderer<any, S>
  onCancel?: () => void
  onEnter?: (index: string) => void
  onExit?: (index: string) => void
  onPostClose?: (index: string) => void
  onPostOpen?: (index: string) => void
  onPreClose?: (index: string) => void
  onPreOpen?: (index: string) => void
  onSelect?: (index: string, path?: string[]) => void
  onPressRoot?: () => void
}

export type SubTreeProps = {
  parentPath: string[]
  onRef: (child: INode) => void
  onSelectChildLeaf: (id: string, path?: string[]) => void
  onSelectChildNode: (id: string, cb: () => void) => void
}

export type FoldableTreeProps<D, S> = {
  id: string
  isOpen?: boolean
  contextProps: ContextProps<S>
  nodeProps: BaseNodeProps<D>

  // added by the FoldableTree component
  subTreeProps?: SubTreeProps
}

export type NodeLayout = {
  width: number
  height: number
  positionRelativeToContainer: { x: number; y: number }
}

export type BaseNodeProps<D> = {
  id: string
  nodeChildren: Array<Child<D>>
  nodeData: D
  positionRelativeToParentNode: Position
  // On react native, the position can be return with undefined x y
  nodeParentAbsolutePosition: Partial<Position>
  nodeOpeningDuration: number
  optionSeparationAngle: number
  rootSpreadOrientation?: number // When user need to force the first spread orientation. Affect only the root.
  spreadRadius: number
  onNodeLayout: (node: INode, nodeLayout: LayoutInfo) => void
  onMount?: (node: INode) => void
  onUnmount?: (nodeId: string) => void
}

export type Child<D> = {
  id: string
  nodeData?: D
  nodeChildren?: Array<Child<D>>
}

export const ROOT_ID = 'root'
