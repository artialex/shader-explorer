import {
  addEdge,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlow,
  useReactFlow,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import '@xyflow/react/dist/style.css'
import { debounce } from 'lodash'
import { load, save } from '../../modules/persistence/persistence'
import { initialState } from '../../modules/persistence/initial-state'
import { nodeTypes } from '../../modules/nodes'
import { UI } from '../../modules/ui'
import { Button } from '@mantine/core'

export function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}

function Flow() {
  const { screenToFlowPosition } = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialState.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialState.edges)
  const onConnect = useCallback((params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), [])

  // useEffect(() => {
  //   const { nodes, edges } = load()
  //   setNodes(nodes)
  //   setEdges(edges)
  // }, [])

  // useEffect(() => {
  //   saveState(nodes, edges)
  // }, [nodes, edges])

  const isValidConnection = useCallback(
    (connection) => {
      const alreadyConnected = edges.some(
        (edge) => edge.target === connection.target && edge.targetHandle === connection.targetHandle,
      )

      return !alreadyConnected
    },
    [edges],
  )

  const ref = useRef<HTMLDivElement>(null)
  const handleAddNode = useCallback((evt: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const bounds = ref.current.getBoundingClientRect()
    const center = {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    }
    const position = screenToFlowPosition(center)

    const node = {
      id: crypto.randomUUID(),
      type: evt.currentTarget.dataset.type,
      position,
      data: { value: 0, label: 'New Node' },
    }

    setNodes((nds) => [...nds, node])
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={ref}>
      <UI.Sidebar nodeTypes={Object.keys(nodeTypes)} onAddNode={handleAddNode} />
      <Panel position="top-right">
        <Button
          onClick={() => {
            save({ nodes, edges })
          }}
        >
          Save
        </Button>
      </Panel>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        deleteKeyCode="Delete"
        isValidConnection={isValidConnection}
        fitView
        onEdgeDoubleClick={(evt, edge) => {
          setEdges((eds) => eds.filter((e) => e.id !== edge.id))
        }}
      />
      <Controls />
    </div>
  )
}
