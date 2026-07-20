import { SegmentedControl } from '@mantine/core'
import { type Node, type NodeProps } from '@xyflow/react'
import { memo } from 'react'
import { MyNode, OutputHandle } from '../../modules/ui/MyNode/MyNode'
import { useStore } from './store'

// A source node. `uv` is a built-in vertex attribute (Three's ShaderMaterial
// declares it automatically, same as `position`), so this just exposes one
// component of it as a float — pick x or y to drive spatial (rather than
// time-based) effects, e.g. wiring uv.x into a Sine Wave's time input for a
// ripple that varies across the surface instead of over time.
type Axis = 'x' | 'y'
type UVNode = Node<{ component: Axis }, 'uv'>

export const UVNode = memo(({ id, data }: NodeProps<UVNode>) => {
  const updateComputedNodeData = useStore((s) => s.updateComputedNodeData)
  const component = data.component ?? 'x'

  return (
    <MyNode
      label="UV"
      outputs={[
        <OutputHandle>
          <div className="nodrag" style={{ display: 'grid', gap: 4, width: 90 }}>
            <SegmentedControl
              size="xs"
              fullWidth
              value={component}
              onChange={(value) => updateComputedNodeData(id, { component: value as Axis })}
              data={[
                { label: 'U', value: 'x' },
                { label: 'V', value: 'y' },
              ]}
            />
            <code style={{ fontSize: 10, textAlign: 'center', opacity: 0.85 }}>uv.{component}</code>
          </div>
        </OutputHandle>,
      ]}
    />
  )
})
