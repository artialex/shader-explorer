import { Handle, Position, useNodeConnections, useNodesData, type Node, type NodeProps } from '@xyflow/react'
import { UI } from '../../ui'
import { useEffect } from 'react'
import { InputHandle, MyNode } from '../../ui/MyNode/MyNode'

export function ColorBackgroundNode() {
  const inputs = useNodeConnections({ handleType: 'target' })
  const nodeData = useNodesData(inputs?.[0]?.source)

  useEffect(() => {
    const value = nodeData?.data?.value

    if (!value) {
      document.body.style.background = ''
    } else {
      document.body.style.background = `rgb(${value.r}, ${value.g}, ${value.b})`
    }

    // Reset on unmount (node deleted, or story/page navigated away from) so the
    // background doesn't leak into whatever renders next.
    return () => {
      document.body.style.background = ''
    }
  }, [nodeData])

  return <MyNode label="Background Color" data-type="color" inputs={[<InputHandle>In</InputHandle>]} />
}
// <Handle type="target" position={Position.Left} className="handle" />

function ColorHandle() {
  return
}
