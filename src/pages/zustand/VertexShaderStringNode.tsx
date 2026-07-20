import { SegmentedControl } from '@mantine/core'
import { type Node, type NodeProps } from '@xyflow/react'
import { memo } from 'react'
import { InputHandle, MyNode, OutputHandle } from '../../modules/ui/MyNode/MyNode'
import { useStore } from './store'

// Assembles the full GLSL vertex shader (built in the store's computeValue)
// from its displacement input and displays it as read-only text. Its output
// handle emits that shader source, so it can be wired into the Plane node,
// which feeds it to a ShaderMaterial. The axis selector picks which coordinate
// (x/y/z) the displacement is applied to.
type Axis = 'x' | 'y' | 'z'
type VertexShaderStringNode = Node<{ value: string; axis: Axis }, 'vsstring'>

export const VertexShaderStringNode = memo(({ id, data }: NodeProps<VertexShaderStringNode>) => {
  const updateComputedNodeData = useStore((s) => s.updateComputedNodeData)
  const axis = data.axis ?? 'y'

  return (
    <MyNode
      label="Vertex Shader (GLSL)"
      inputs={[<InputHandle id="displacement">Displacement</InputHandle>]}
      outputs={[<OutputHandle>Shader</OutputHandle>]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
        <SegmentedControl
          className="nodrag"
          size="xs"
          fullWidth
          value={axis}
          onChange={(value) => updateComputedNodeData(id, { axis: value as Axis })}
          data={[
            { label: 'X', value: 'x' },
            { label: 'Y', value: 'y' },
            { label: 'Z', value: 'z' },
          ]}
        />
        <pre
          className="nodrag"
          style={{
            margin: 0,
            padding: 8,
            fontSize: 10,
            lineHeight: 1.5,
            textAlign: 'left',
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
            maxHeight: 240,
            color: '#d4d4d4',
            background: '#1e1e1e',
            borderRadius: 4,
          }}
        >
          {data.value || '// connect a Displacement input'}
        </pre>
      </div>
    </MyNode>
  )
})
