import { useNodeConnections, useNodesData, useReactFlow, type NodeProps } from '@xyflow/react'
import { UI } from '../../ui'
import css from './LogNode.module.css'
import { MyNode } from '../../ui/MyNode/MyNode'
import { memo, useEffect } from 'react'
import { ValueInputHandle, ValueOutputHandle } from '../../handles/ValueHandle'

export const LogNode = memo(({ id, data }: NodeProps) => {
  const { updateNodeData } = useReactFlow()
  const inputs = useNodeConnections({
    handleType: 'target',
  })

  const nodeData = useNodesData(inputs[0]?.source)
  const value = nodeData?.data?.value

  const view = value != null ? JSON.stringify(value, null, 2) : 'No Input'

  useEffect(() => {
    if (data.value === value) return
    const frame = requestAnimationFrame(() => {
      updateNodeData(id, { value })
    })
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <MyNode data-type="log" label="Log" inputs={[<ValueInputHandle view={view} />]} outputs={[<ValueOutputHandle />]} />
  )
})
