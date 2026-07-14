import { ReactFlow, useReactFlow, Controls, Panel, Background } from '@xyflow/react'
import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import '@xyflow/react/dist/style.css'
import { load, save } from '../../modules/persistence/persistence'
import { UI } from '../../modules/ui'
import { Button } from '@mantine/core'
import { useStore } from './store'
import { ColorNode } from './ColorNode'
import { LogNode } from './LogNode'
import { useIsValidConnection } from '../../modules/flow/useIsValidConnection'
import { VertexShaderNode } from './VertexShaderNode'
import { BoxGeometryNode } from './BoxGeometryNode'
import { Vector3Node } from './Vector3Node'

const nodeTypes = {
  color: ColorNode,
  log: LogNode,
  vertexShader: VertexShaderNode,
  boxGeometry: BoxGeometryNode,
  vector3: Vector3Node,
}

export function ZustandApp() {
  const { screenToFlowPosition } = useReactFlow()
  const nodes = useStore((s) => s.nodes)
  const edges = useStore((s) => s.edges)
  const onNodesChange = useStore((s) => s.onNodesChange)
  const onEdgesChange = useStore((s) => s.onEdgesChange)
  const onConnect = useStore((s) => s.onConnect)
  const setNodes = useStore((s) => s.setNodes)
  const setEdges = useStore((s) => s.setEdges)

  useEffect(() => {
    setEdges(edges)
  }, [])

  const isValidConnection = useIsValidConnection(edges)

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
    <div style={{ width: '100vw', height: '100vh' }}>
      <Panel position="top-right">
        <Button
          onClick={() => {
            console.log(nodes, edges)
            save({ nodes, edges }, '__zustand')
          }}
        >
          Save
        </Button>

        <Button
          onClick={() => {
            const { nodes, edges } = load('__zustand')
            console.log(nodes)
            setNodes(nodes)
            setEdges(edges)
          }}
        >
          Load
        </Button>
      </Panel>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        isValidConnection={isValidConnection}
        deleteKeyCode="Delete"
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={ref}>
      <UI.Sidebar nodeTypes={Object.keys(nodeTypes)} onAddNode={handleAddNode} />

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
