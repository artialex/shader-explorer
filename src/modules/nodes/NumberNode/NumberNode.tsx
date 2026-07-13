import { Handle, Position, useReactFlow } from '@xyflow/react'
import { throttle } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Slider } from '@mantine/core'
import { UI } from '../../ui'
import { clamp } from '@mantine/hooks'

export function NumberNode({ id, data }) {
  const { updateNodeData } = useReactFlow()

  const [number, setNumber] = useState(data?.value ?? 0)

  useEffect(() => {
    if (data?.value !== undefined) {
      setNumber(data.value)
    }
  }, [data?.value]) // Only run when the specific value in your saved state changes

  const onChange = useCallback(
    throttle((value) => {
      const cappedNumber = clamp(value, 0, 255)
      setNumber(cappedNumber)
      updateNodeData(id, { value: cappedNumber })
    }, 16),
    [id, updateNodeData], // Include proper dependencies
  )

  return (
    <UI.Node
      data-type="math"
      label={<UI.Label onNameChange={(label) => updateNodeData(id, { label })}>{data.label}</UI.Label>}
    >
      <Slider size="sm" className="nodrag" value={number} mih={0} max={255} onChange={onChange} id={`number-${id}`} />
      <Handle type="source" position={Position.Right} />
    </UI.Node>
  )
}
