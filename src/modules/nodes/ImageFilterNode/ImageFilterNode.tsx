import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import { UI } from '../../ui'
import { useCallback, useEffect, useState } from 'react'
import { Image, Select, Slider } from '@mantine/core'
import { throttle } from 'lodash'
import { clamp } from '@mantine/hooks'
import css from './ImageFilterNode.module.css'

export type ImageFilterNode = Node<{ kind: 'sepia' | 'grayscale'; value: number }, 'imageFilter'>

export function ImageFilterNode({ id, data }: NodeProps<ImageFilterNode>) {
  const { updateNodeData } = useReactFlow()
  const [filter, setFilter] = useState(data?.kind ?? 'sepia')
  const [filterValue, setFilterValue] = useState(data?.value ?? 0)

  const inputs = useNodeConnections({
    handleType: 'target',
    handleId: id,
  })

  const nodeData = useNodesData(inputs?.[0]?.source)
  useEffect(() => {
    console.log(nodeData)
  }, [nodeData])

  const url = nodeData?.data?.url

  console.log(nodeData)

  const onChange = useCallback(
    throttle((value) => {
      const cappedNumber = clamp(value, 0, 1)
      setFilterValue(cappedNumber)
      updateNodeData(id, { value: cappedNumber })
    }, 16),
    [id, updateNodeData], // Include proper dependencies
  )

  return (
    <UI.Node label="Image Filter" data-type="image" noPadding className={css.root}>
      <div className={css.controls}>
        <Select
          size="xs"
          value={filter}
          variant="unstyled"
          onChange={(kind) => {
            setFilter(kind)
            updateNodeData(id, { kind })
          }}
          data={['sepia', 'grayscale']}
          allowDeselect={false}
        />

        <Slider size="xs" min={0} max={1} step={0.01} value={filterValue} onChange={onChange} className="nodrag" />
      </div>

      {url ? <Image src={url} style={{ filter: `${filter}(${filterValue})` }} h={200} /> : <p>No input</p>}
      <Handle type="target" position={Position.Left} id={id} className="handle"></Handle>
    </UI.Node>
  )
}
