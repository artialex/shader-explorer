import { Handle, Position, useNodeConnections, useNodesData, type NodeProps } from '@xyflow/react'
import { UI } from '../../ui'
import { useEffect } from 'react'

export function ColorBackgroundNode({ id }: NodeProps) {
  const inputs = useNodeConnections({ handleType: 'target', handleId: id })
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
  return (
    <UI.Node label="Background" noPadding>
      <Handle type="target" position={Position.Left} id={id} className="handle" />
    </UI.Node>
  )
}
