import * as React from 'react'

import { ButtonRenderer, NodeRendererProps } from '../foldableTree'
import { NodeView as Node } from './NodeView'

export function renderNodeFactory(renderContent: ButtonRenderer<any>) {
  return function renderNode({
    animatedValues,
    areChildrenDisplayed,
    contextProps,
    isDisplayed,
    isFullOpen,
    isPartialOpen,
    nodeProps,
    onHoverChild,
    onPress,
    selectedChildNodeId,
    subTreeProps,
  }: NodeRendererProps<any, any>) {
    return (
      <Node
        animatedValues={animatedValues}
        areChildrenDisplayed={areChildrenDisplayed}
        contextProps={contextProps}
        isDisplayed={isDisplayed}
        isFullOpen={isFullOpen}
        isPartialOpen={isPartialOpen}
        nodeProps={nodeProps}
        renderButton={renderContent}
        renderNode={renderNode}
        selectedChildNodeId={selectedChildNodeId}
        subTreeProps={subTreeProps}
        onHoverChild={onHoverChild}
        onPress={onPress}
      />
    )
  }
}
