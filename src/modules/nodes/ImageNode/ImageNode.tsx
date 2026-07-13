import { useState } from 'react'
import { UI } from '../../ui'
import { Image, TextInput } from '@mantine/core'
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'

export type ImageNode = Node<{ url: string }, 'image'>

export function ImageNode({ id, data }: NodeProps<ImageNode>) {
  const { updateNodeData } = useReactFlow()
  const [value, setValue] = useState(data?.url ?? '')
  const [isEditing, setEditing] = useState(false)

  return (
    <UI.Node label="Image" data-type="image" noPadding>
      {isEditing ? (
        <TextInput
          onBlur={() => {
            setEditing(false)
            updateNodeData(id, { url: value })
          }}
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      ) : value ? (
        <Image
          src={value}
          h={200}
          onDoubleClick={() => {
            setEditing(true)
          }}
        />
      ) : (
        <p
          onDoubleClick={() => {
            setEditing(true)
          }}
        >
          Double click to add image
        </p>
      )}
      <Handle type="source" position={Position.Right} id={id}></Handle>
    </UI.Node>
  )
}
