import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react'
import { throttle } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Slider } from '@mantine/core'
import { UI } from '../../ui'

// A continuous-range float source. Unlike NumberNode (fixed 0-255 for colour
// channels), the range/step are configurable via data so the same node can
// drive an amplitude (0-1), a frequency (0-20) or a speed (0-5) uniform.
export function FloatNode({ id, data }: NodeProps) {
  const { updateNodeData } = useReactFlow()

  const min = data?.min ?? 0
  const max = data?.max ?? 1
  const step = data?.step ?? 0.01

  const [value, setValue] = useState(data?.value ?? min)

  // Seed the node's data on mount so downstream nodes read a value before the
  // slider is first touched.
  useEffect(() => {
    if (data?.value === undefined) {
      updateNodeData(id, { value })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data?.value !== undefined) {
      setValue(data.value)
    }
  }, [data?.value])

  const onChange = useCallback(
    throttle((next: number) => {
      setValue(next)
      updateNodeData(id, { value: next })
    }, 16),
    [id, updateNodeData],
  )

  return (
    <UI.Node
      data-type="math"
      label={<UI.Label onNameChange={(label) => updateNodeData(id, { label })}>{data?.label ?? 'Float'}</UI.Label>}
    >
      <Slider
        size="sm"
        className="nodrag"
        value={value}
        min={min}
        max={max}
        step={step}
        label={(v) => v.toFixed(2)}
        onChange={onChange}
        id={`float-${id}`}
      />
      <Handle type="source" position={Position.Right} />
    </UI.Node>
  )
}
