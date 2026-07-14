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
  useReactFlow,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import { useCallback, useRef, useState, type MouseEvent } from 'react'
import { nodeTypes } from '../index'
import { UI } from '../../ui'

export interface NodeCanvasProps {
  nodes: Node[]
  edges?: Edge[]
  height?: number | string
}

export function NodeCanvas(props: NodeCanvasProps) {
  return (
    <ReactFlowProvider>
      <NodeCanvasInner {...props} />
    </ReactFlowProvider>
  )
}

// Renders node(s) inside a real, interactive ReactFlow instance. Node
// components rely on hooks (useReactFlow, useNodeConnections, useNodesData)
// that only work when mounted as an actual node in a flow — they can't be
// rendered standalone.
// A definite length (not a percentage) so @xyflow/react's own `.react-flow`
// element — which sizes itself with `height: 100%` — has something concrete
// to resolve against, regardless of how Storybook's own wrapper elements are
// sized.
export function NodeCanvasInner({ nodes: initialNodes, edges: initialEdges = [], height = '100vh' }: NodeCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [])
  // const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])
  const { screenToFlowPosition } = useReactFlow()
  const ref = useRef<HTMLDivElement>(null)

  const handleAddNode = useCallback((evt: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const bounds = ref.current.getBoundingClientRect()
    const center = {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    }
    const position = screenToFlowPosition(center)
    console.log(position)

    const node = {
      id: evt.currentTarget.dataset.type + ':' + crypto.randomUUID(),
      type: evt.currentTarget.dataset.type,
      position,
      data: { value: 0, label: 'New Node' },
    }
    setNodes((nodes) => [...nodes, node])
  }, [])

  return (
    <div style={{ width: '100%', height }} ref={ref}>
      <UI.Sidebar nodeTypes={Object.keys(nodeTypes)} onAddNode={handleAddNode} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        deleteKeyCode="Delete"
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
