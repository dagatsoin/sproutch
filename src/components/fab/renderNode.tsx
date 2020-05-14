import * as React from 'react'

import { NodeView as Node } from './NodeView'
import { ButtonRenderer, NodeRendererProps } from './type'

export function renderNodeFactory(renderContent: ButtonRenderer<any>) {
  return function renderNode(rendererProps: NodeRendererProps<any, any>) {
    return (
      <Node
        renderButton={renderContent}
        renderNode={renderNode}
        {...rendererProps}
      />
    )
  }
}
