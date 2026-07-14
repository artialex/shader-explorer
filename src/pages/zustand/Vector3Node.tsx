import { Slider } from '@mantine/core'
import { type Node, type NodeProps } from '@xyflow/react'
import { memo, useCallback, useEffect, useReducer, useRef } from 'react'
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

export function Vector3Handle(props: Vector3Props) {
  const [value, dispatch] = useReducer(vectorReducer, props.value)

  useEffect(() => {
    props.onChange(value)
  }, [value])
  return (
    <OutputHandle>
      {(['x', 'y', 'z'] as const).map((axis) => (
        <Slider
          key={axis}
          size="xs"
          className="nodrag"
          min={-5}
          max={5}
          step={0.1}
          value={value[axis]}
          onChange={(newValue) => {
            dispatch({ type: `set_${axis}`, payload: newValue })
          }}
        />
      ))}
    </OutputHandle>
  )
}

type State = Vector3Like

type Action =
  | { type: 'set_x'; payload: number }
  | { type: 'set_y'; payload: number }
  | { type: 'set_z'; payload: number }

function vectorReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set_x':
      return { ...state, x: action.payload }
    case 'set_y':
      return { ...state, y: action.payload }
    case 'set_z':
      return { ...state, z: action.payload }
    default:
      return state
  }
}
