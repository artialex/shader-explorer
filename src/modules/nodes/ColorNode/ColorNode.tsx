import { useReactFlow, type Node, type NodeProps } from '@xyflow/react'
import { MyNode, OutputHandle } from '../../ui/MyNode/MyNode'
import { ColorPicker } from '@mantine/core'
import { memo, useCallback } from 'react'
import { throttle } from 'lodash'

type ColorNode = Node<{ value: string }, 'color'>

export const ColorNode = memo(({ id, data }: NodeProps<ColorNode>) => {
  const { updateNodeData } = useReactFlow()
  const handleChange = useCallback(
    throttle((value) => updateNodeData(id, { value }), 16),
    [],
  )

  return (
    <MyNode
      label="Color"
      outputs={[
        <OutputHandle id={id}>
          <ColorPicker
            className="nodrag"
            value={data.value}

            onChange={handleChange}
          />
        </OutputHandle>,
      ]}
    />
  )
})
