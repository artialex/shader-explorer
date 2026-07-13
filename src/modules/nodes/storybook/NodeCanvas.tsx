import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Node,
  type Edge,
} from '@xyflow/react'
import { useCallback, useState } from 'react'
import { nodeTypes } from '../index'

export interface NodeCanvasProps {
  nodes: Node[]
  edges?: Edge[]
  height?: number | string
}

// Renders node(s) inside a real, interactive ReactFlow instance. Node
// components rely on hooks (useReactFlow, useNodeConnections, useNodesData)
// that only work when mounted as an actual node in a flow — they can't be
// rendered standalone.
// A definite length (not a percentage) so @xyflow/react's own `.react-flow`
// element — which sizes itself with `height: 100%` — has something concrete
// to resolve against, regardless of how Storybook's own wrapper elements are
// sized.
export function NodeCanvas({ nodes: initialNodes, edges: initialEdges = [], height = '100vh' }: NodeCanvasProps) {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [])
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          deleteKeyCode="Delete"
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}
