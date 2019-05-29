import * as React from 'react'
import { Types } from 'reactxp'

import { noop } from '../../helpers'
import {
  AnimatedValues,
  FoldableTreeProps,
  INode,
  ROOT_ID,
  SubTreeProps,
} from './type'

type State = {
  areChildrenDisplayed: boolean
  isDisplayed: boolean
  isFullOpen: boolean
  isPartialOpen: boolean
  selectedChildNodeId?: string
}

class FoldableTree
  extends React.PureComponent<FoldableTreeProps<any, any>, State>
  implements INode {
  private get isRoot() {
    return this.id === ROOT_ID
  }

  private get path() {
    const parentPath = this.props.subTreeProps
      ? this.props.subTreeProps.parentPath
      : []
    return [...parentPath, this.id]
  }

  public get id() {
    return this.props.id
  }

  public state: State = {
    areChildrenDisplayed: false,
    isDisplayed: false,
    isFullOpen: false,
    isPartialOpen: false,
  }

  private childRefs: INode[] = []
  private animatedValues: AnimatedValues
  private animation: Types.Animated.CompositeAnimation

  constructor(props: FoldableTreeProps<any, any>) {
    super(props)
    const { animatedValues } = props
    this.animatedValues = animatedValues
  }

  public componentDidMount() {
    const { subTreeProps } = this.props
    if (
      !this.isRoot &&
      subTreeProps &&
      subTreeProps.onMountSubTree &&
      subTreeProps.onMountSubTree
    ) {
      subTreeProps.onMountSubTree(this)
    }
    // Open after the mount if needed
    if (this.isRoot && this.props.isOpen && !this.state.isFullOpen) {
      this.onPress()
    }
  }

  public render() {
    const {
      areChildrenDisplayed,
      isDisplayed,
      isPartialOpen,
      isFullOpen,
      selectedChildNodeId,
    } = this.state
    const { contextProps, renderNode, nodeProps } = this.props

    const subTreeProps: SubTreeProps = {
      parentPath: this.path,
      onSelectChildNode: this.onSelectChildNode,
      onSelectChildLeaf: this.onSelectChildLeaf,
      onMountSubTree: child => {
        child.show(() => this.setState({ areChildrenDisplayed: true }))
        this.childRefs.push(child)
      },
    }

    return renderNode({
      areChildrenDisplayed,
      isDisplayed,
      isFullOpen,
      isPartialOpen,
      selectedChildNodeId,
      contextProps,
      subTreeProps,
      nodeProps,
      onHoverChild: this.onHoverChild,
      onPress: this.onPress,
      animatedValues: this.animatedValues,
    })
  }

  public componentDidUpdate(
    prevProps: FoldableTreeProps<any, any>,
    prevState: State
  ) {
    const { onPostClose, onPreOpen } = this.props.contextProps
    // A node will be open (animation did not start yet)
    if (prevState.isFullOpen === false && this.state.isFullOpen === true) {
      onPreOpen && onPreOpen(this.id)
    }

    // A node did close (animation just finished)
    if (
      (prevState.isFullOpen === true && this.state.isFullOpen === false) ||
      (prevState.isPartialOpen === true && this.state.isPartialOpen === false)
    ) {
      onPostClose && onPostClose(this.id)
    }

    // Parent ask to open the root
    if (
      this.isRoot &&
      this.props.isOpen !== prevProps.isOpen &&
      this.props.isOpen &&
      !this.state.isFullOpen
    ) {
      this.onPress()
    }
  }

  /**
   * Move this child away from its parent
   */
  public show = (callback: Types.Animated.EndCallback = noop) => {
    if (this.animation) {
      this.animation.stop()
    }
    const { childRendererAddedProps } = this.props

    if (childRendererAddedProps) {
      this.animation = childRendererAddedProps.getShowAnimation(
        this.animatedValues
      )

      this.animation.start(result => {
        this.setState({ isDisplayed: true }, () => callback(result))
      })
    }
  }

  /**
   * Hide this child behind its parent.
   * This function is recursive and will hide all open child first.
   */
  public hide = (
    callback: Types.Animated.EndCallback,
    ancestorId: string = this.id
  ) => {
    if (this.animation) {
      this.animation.stop()
    }
    const { childRendererAddedProps } = this.props

    if (childRendererAddedProps) {
      this.animation = childRendererAddedProps.getHideAnimation(
        this.animatedValues
      )

      if (this.childRefs.length > 0) {
        this.childRefs.map(node => node.hide(noop, ancestorId))
      }
      if (this.id === ancestorId) {
        this.animation.start(result => {
          this.setState({ isDisplayed: false }, () => callback(result))
        })
      } else {
        this.animation.start(() => this.setState({ isDisplayed: false }))
      }
    }
  }

  private onHoverChild = (nodeId: string | null) => {
    const { onHover } = this.props.contextProps
    onHover && onHover(nodeId)
  }

  private onPress = () => {
    const { isDisabled, onCancel } = this.props.contextProps
    const { id = 'root', nodeChildren: children } = this.props.nodeProps
    const { onSelectChildLeaf = noop, onSelectChildNode = noop } =
      this.props.subTreeProps || {}

    if (isDisabled) return

    // It is a node
    if (children && children.length) {
      // It is a final node which shows all its available children
      if (this.state.isFullOpen) {
        if (this.isRoot) {
          onCancel && onCancel()
        }

        // The node were reselected, close it.
        if (this.state.selectedChildNodeId === undefined) {
          this.hideChildren()
        }

        // It is an intermediate node part of an active path showing the selected child
      } else if (this.state.isPartialOpen) {
        // The user clicked on an intermediate opened node. Close it.
        if (this.state.selectedChildNodeId !== undefined) {
          this.closeIntermediateNode()
        }
      }
      // It is a closed node:
      // 1- Open it.
      // 2- Trigger the parent handler
      else {
        /* 1 */
        this.displayChildren()
        /* 2 */
        onSelectChildNode(id, this.displayChildren)
      }
    }

    // It is a leaf
    else {
      onSelectChildLeaf(id, this.path)
      this.hideChildren()
    }
  }

  private displayChildren = () => {
    this.setState({ isFullOpen: true })
  }

  /**
   * Hide chldren but keep them in the virtual dom until the animation is finished
   */
  private hideChildren = () => {
    requestAnimationFrame(() => {
      this.childRefs.map((child, index, { length }) => {
        const isLast = index === length - 1
        child.hide(() => {
          if (isLast) {
            this.childRefs = []
            this.setState({
              areChildrenDisplayed: false,
              isFullOpen: false,
              isPartialOpen: false,
              selectedChildNodeId: undefined,
            })
          }
        })
      })
    })
  }

  private closeUnselectedChildren = (selectedChildNodeId: string) => {
    requestAnimationFrame(() => {
      this.childRefs
        .filter(({ id }) => id !== selectedChildNodeId)
        .map((child, index, { length }) => {
          const isLast = index === length - 1
          child.hide(() => {
            // remove the hidden child from the refs
            if (isLast) {
              this.childRefs = this.childRefs.filter(
                ({ id }) => id === selectedChildNodeId
              )
              this.setState({
                isFullOpen: false,
                isPartialOpen: true,
              })
            }
          })
        })
    })
  }

  private closeIntermediateNode = () => {
    this.childRefs.map((child, index, { length }) => {
      const isLast = index === length - 1
      child.hide(() => {
        // remove the closed hidden from the refs
        if (isLast) {
          this.childRefs = []
          this.setState(
            {
              areChildrenDisplayed: false,
              isPartialOpen: false,
              selectedChildNodeId: undefined,
            },
            () => {
              this.props.subTreeProps &&
                this.props.subTreeProps.onSelectChildNode(this.id, noop)
            }
          )
        }
      })
    })
  }

  /**
   * Handler of the parent when an node is selected:
   * 1- Close the others children
   * 2- Update the active child node id
   */
  private onSelectChildNode = (selectedChildNodeId: string) => {
    const { nodeChildren: children = [] } = this.props.nodeProps
    /* 1 */
    // @todo make a props to disable this behavior.
    if (children.some(({ id }) => id === selectedChildNodeId)) {
      this.closeUnselectedChildren(selectedChildNodeId)
    }

    /* 2 */
    this.setState({ selectedChildNodeId })
  }

  /**
   * Behavior of the parent when a child is selected
   * 1- recursively call the ancestor handler until reach the root
   * 2- call the root handler
   * 3- close the entire tree
   */
  private onSelectChildLeaf = (selectedChildNodeId: string, path: string[]) => {
    const { onSelect } = this.props.contextProps
    const { onSelectChildLeaf = noop } = this.props.subTreeProps || {}

    if (!this.isRoot) {
      /* 1 */
      // Call ancestor handler
      onSelectChildLeaf(selectedChildNodeId, path)
    } else {
      /* 2 */
      // Root reached
      onSelect && onSelect(selectedChildNodeId, path)
      /* 3 */
      this.hideChildren()
    }
  }
}

export default FoldableTree
