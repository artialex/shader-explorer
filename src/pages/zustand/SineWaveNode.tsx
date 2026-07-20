import { Slider } from '@mantine/core'
import { type Node, type NodeProps } from '@xyflow/react'
import { memo, useCallback, useRef } from 'react'
import { InputHandle, MyNode, OutputHandle } from '../../modules/ui/MyNode/MyNode'
import { useStore } from './store'

// Takes a time expression on its input and emits the GLSL expression
// `sin(<time> * frequency) * amplitude`. The amplitude/frequency sliders live
// in the node's own data, so a change has to recompute *this* node (not just
// its outgoers) — hence updateComputedNodeData rather than updateNodeData.
type SineWaveNode = Node<
  { value: string; amplitude: number; frequency: number },
  'sineWave'
>

export const SineWaveNode = memo(({ id, data }: NodeProps<SineWaveNode>) => {
  const updateComputedNodeData = useStore((s) => s.updateComputedNodeData)
  const frame = useRef<number>(null)

  const patch = useCallback(
    (p: Partial<SineWaveNode['data']>) => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => updateComputedNodeData(id, p))
    },
    [id, updateComputedNodeData],
  )

  const amplitude = data.amplitude ?? 1
  const frequency = data.frequency ?? 1

  return (
    <MyNode
      label="Sine Wave"
      inputs={[<InputHandle id="time">Time</InputHandle>]}
      outputs={[
        <OutputHandle>
          <div className="nodrag" style={{ display: 'grid', gap: 4, width: 150 }}>
            <span style={{ fontSize: 10, opacity: 0.7 }}>amplitude {amplitude.toFixed(2)}</span>
            <Slider
              size="xs"
              min={0}
              max={2}
              step={0.05}
              value={amplitude}
              onChange={(v) => patch({ amplitude: v })}
            />
            <span style={{ fontSize: 10, opacity: 0.7 }}>frequency {frequency.toFixed(2)}</span>
            <Slider
              size="xs"
              min={0}
              max={5}
              step={0.1}
              value={frequency}
              onChange={(v) => patch({ frequency: v })}
            />
            <code style={{ fontSize: 10, opacity: 0.85 }}>{data.value || 'sin(u_time)'}</code>
          </div>
        </OutputHandle>,
      ]}
    />
  )
})
