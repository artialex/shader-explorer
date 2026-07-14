import { Slider } from '@mantine/core'
import { type Node, type NodeProps } from '@xyflow/react'
import { memo, useCallback, useRef } from 'react'
import { type Vector3Like } from 'three'
import { MyNode, OutputHandle } from '../../modules/ui/MyNode/MyNode'
import { useStore } from './store'

type Vector3Node = Node<{ value: Vector3Like }, 'vector3'>

export const Vector3Node = memo(({ id, data }: NodeProps<Vector3Node>) => {
  const updateNodeData = useStore((s) => s.updateNodeData)
  const frame = useRef<number>(null)

  const handleChange = useCallback((value: Vector3Like) => {
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      updateNodeData(id, { value })
    })
  }, [])

  return (
    <MyNode
      label="Vector3 "
      outputs={[
        <Vector3Handle value={data.value ?? { x: 0, y: 0, z: 0 }} onChange={handleChange} />,
      ]}
    />
  )
})

interface Vector3Props {
  value: Vector3Like
  onChange: (value: Vector3Like) => void
}
const axes = ['x', 'y', 'z'] as const
export function Vector3Handle(props: Vector3Props) {
  const value = props.value

  return (
    <OutputHandle>
      {axes.map((axis) => (
        <Slider
          key={axis}
          size="xs"
          className="nodrag"
          min={-5}
          max={5}
          step={0.1}
          value={value[axis]}
          onChange={(newValue) => {
            props.onChange({ ...value, [axis]: newValue })
          }}
        />
      ))}
    </OutputHandle>
  )
}
