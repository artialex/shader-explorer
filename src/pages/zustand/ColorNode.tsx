import { useReactFlow, type Node, type NodeProps } from '@xyflow/react'
import { ColorPicker } from '@mantine/core'
import { memo, useCallback, useRef } from 'react'
import { throttle } from 'lodash'
import { MyNode, OutputHandle } from '../../modules/ui/MyNode/MyNode'
import { useStore } from './store'

type ColorNode = Node<{ value: string }, 'color'>

export const ColorNode = memo(({ id, data }: NodeProps<ColorNode>) => {
  const updateNodeData = useStore((s) => s.updateNodeData)
  const frame = useRef<number>(null)

  const handleChange = useCallback(
    (value: string) => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        updateNodeData(id, { value })
      })
    },
    [id, updateNodeData],
  )
  return (
    <MyNode
      label="Color"
      outputs={[
        <OutputHandle id={id}>
          <ColorPicker className="nodrag" value={data.value} onChange={handleChange} />
        </OutputHandle>,
      ]}
    />
  )
})
