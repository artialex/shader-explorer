import { useReactFlow, type Node, type NodeProps } from '@xyflow/react'
import { useState } from 'react'

import { clamp } from '@mantine/hooks'
import { MyNode, SliderHandle } from '../../ui/MyNode/MyNode'

type NumberNode = Node<{ value: number }, 'number'>

export function NumberNode({ id, data }: NodeProps<NumberNode>) {
  const { updateNodeData } = useReactFlow()

  const [value, setValue] = useState(data?.value ?? 0)

  const onChange = (value: number) => {
    const cappedNumber = clamp(value, 0, 255)
    updateNodeData(id, { value: cappedNumber })
    setValue(cappedNumber)
  }

  return <MyNode label="Number" data-type="math" outputs={[<SliderHandle value={value} onChange={onChange} />]} />
}
