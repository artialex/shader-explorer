import { type NodeProps } from '@xyflow/react'
import { memo } from 'react'
import { MyNode } from '../../modules/ui/MyNode/MyNode'
import { ValueInputHandle, ValueOutputHandle } from '../../modules/handles/ValueHandle'

export const LogNode = memo(({ data }: NodeProps) => {
  const view = data.value != null ? JSON.stringify(data.value, null, 2) : 'No Input'

  return (
    <MyNode
      data-type="log"
      label="Log"
      inputs={[<ValueInputHandle view={view} />]}
      outputs={[<ValueOutputHandle />]}
    />
  )
})
