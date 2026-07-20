import { Button, Textarea } from '@mantine/core'
import { type Node, type NodeProps } from '@xyflow/react'
import { memo, useState } from 'react'
import { MyNode, OutputHandle } from '../../modules/ui/MyNode/MyNode'
import { useStore } from './store'

// A source node: instead of compiling GLSL from the graph (that's what the
// 'vsstring' node does), this lets you hand-write raw GLSL and use it as the
// shader directly — wire its output straight into a Plane node. Its output
// value *is* its data.value, same as ColorNode/Vector3Node, so it needs no
// entry in the store's computeValue switch.
type VertexShaderTextNode = Node<{ value: string }, 'vertexShaderText'>

const DEFAULT_SOURCE = `void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

// Sidebar-added nodes get generic data `{ value: 0, label: 'New Node' }` — a
// *number*, not a string — so `??` alone won't catch it (0 isn't nullish).
function initialSource(value: unknown): string {
  return typeof value === 'string' ? value : DEFAULT_SOURCE
}

export const VertexShaderTextNode = memo(({ id, data }: NodeProps<VertexShaderTextNode>) => {
  const updateNodeData = useStore((s) => s.updateNodeData)
  // Local draft buffer: typing doesn't touch the store (and so doesn't force
  // Three to recompile the WebGL program) on every keystroke — only Apply /
  // blur commits it, which also avoids compiling obviously-incomplete GLSL
  // mid-edit.
  const [draft, setDraft] = useState(() => initialSource(data.value))
  const dirty = draft !== initialSource(data.value)

  const apply = () => updateNodeData(id, { value: draft })

  return (
    <MyNode label="Vertex Shader (Text)" outputs={[<OutputHandle>Shader</OutputHandle>]}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 320 }}>
        <Textarea
          className="nodrag"
          autosize
          minRows={8}
          maxRows={20}
          styles={{ input: { fontFamily: 'monospace', fontSize: 11, background: '#1e1e1e', color: '#d4d4d4' } }}
          value={draft}
          onChange={(e) => setDraft(e.currentTarget.value)}
          onBlur={apply}
        />
        <Button className="nodrag" size="xs" variant={dirty ? 'filled' : 'light'} onClick={apply}>
          {dirty ? 'Apply' : 'Applied'}
        </Button>
      </div>
    </MyNode>
  )
})
