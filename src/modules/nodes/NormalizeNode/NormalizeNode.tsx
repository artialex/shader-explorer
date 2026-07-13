import { Handle, Position, useNodeConnections, useNodesData, useReactFlow, type NodeProps } from '@xyflow/react'
import { UI } from '../../ui'
import { useEffect } from 'react'

export function NormalizeNode({ id, data }: NodeProps) {
  const inputs = useNodeConnections({ handleType: 'target' })
  const { updateNodeData } = useReactFlow()

  const nodeData = useNodesData(inputs?.[0]?.source)

  useEffect(() => {
    const value = nodeData?.data?.value
    if (value != null) {
      updateNodeData(id, { value: value / 255 })
    } else {
      updateNodeData(id, { value: null })
    }
  }, [nodeData])

  return (
    <UI.Node label="Normalize" noPadding data-type="math">
      <Handle type="target" position={Position.Left} className="handle" />
      <Handle type="source" position={Position.Right} className="handle" />
    </UI.Node>
  )
}
