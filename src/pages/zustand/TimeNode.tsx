import { type Node, type NodeProps } from '@xyflow/react'
import { memo, useEffect, useRef, useState } from 'react'
import { MyNode, OutputHandle } from '../../modules/ui/MyNode/MyNode'

// A source node. Its emitted value is the GLSL expression `u_time`, which the
// downstream shader resolves to a `uniform float` at draw time. The ticking
// seconds display is purely cosmetic — it just makes the node visibly "alive".
type TimeNode = Node<{ value: string }, 'time'>

export const TimeNode = memo(({ data }: NodeProps<TimeNode>) => {
  const [seconds, setSeconds] = useState(0)
  const frame = useRef<number>(null)

  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      setSeconds((now - start) / 1000)
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <MyNode
      label="Time"
      outputs={[
        <OutputHandle>
          <code style={{ fontSize: 12 }}>{data.value ?? 'u_time'}</code>
          <div style={{ fontSize: 10, opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>
            t = {seconds.toFixed(1)}s
          </div>
        </OutputHandle>,
      ]}
    />
  )
})
