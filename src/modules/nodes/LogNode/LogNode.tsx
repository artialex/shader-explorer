import { Handle, Position, useNodeConnections, useNodesData, useReactFlow, type NodeProps } from '@xyflow/react'
import { UI } from '../../ui'
import css from './LogNode.module.css'
import { useEffect } from 'react'

export function LogNode({ id }: NodeProps) {
  const { updateNodeData } = useReactFlow()

  const inputs = useNodeConnections({
    handleType: 'target',
  })
  const nodeData = useNodesData(inputs?.[0]?.source)

  useEffect(() => {
    updateNodeData(id, { value: nodeData?.data?.value })
  }, [nodeData])

  const view = nodeData?.data?.value != null ? JSON.stringify(nodeData?.data?.value, null, 2) : 'No Input'

  return (
    <UI.Node data-type="log" label="Log" style={{ background: nodeData?.data?.value != null ? 'initial' : 'pink' }}>
      <Handle type="target" position={Position.Left} className="handle" />
      <pre className={css.pre}>{view}</pre>
      <Handle type="source" position={Position.Right} className="handle" />
    </UI.Node>
  )
}
