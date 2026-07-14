import { Handle, Position, useNodeConnections, useNodesData, useReactFlow } from '@xyflow/react'
import { useEffect } from 'react'
import css from './ColorPreviewNode.module.css'
import { UI } from '../../ui'

function CustomHandle({ id, label, onChange }) {
  const connections = useNodeConnections({
    handleType: 'target',
    handleId: id,
  })

  const nodeData = useNodesData(connections?.[0]?.source)
  const value = nodeData?.data ? nodeData.data.value : 0

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <div className={css.handle}>
      <Handle type="target" position={Position.Left} id={id} className="handle" />
      <label htmlFor="red" className="label">
        {label}
      </label>
    </div>
  )
}

export function ColorPreviewNode({ id, data }) {
  const { updateNodeData } = useReactFlow()

  return (
    <UI.Node
      label="Color Preview"
      style={{
        width: 140,
        aspectRatio: 1,
        background: data.value ? `rgb(${data.value.r}, ${data.value.g}, ${data.value.b})` : 'rgb(0, 0, 0)',
      }}
    >
      <div className={css.root}>
        <CustomHandle
          id="red"
          label="R"
          onChange={(value) => {
            if (data.value?.r !== value) {
              updateNodeData(id, (node) => {
                return { value: { ...node.data.value, r: value } }
              })
            }
          }}
        />
        <CustomHandle
          id="green"
          label="G"
          onChange={(value) => {
            if (data.value?.g !== value) {
              updateNodeData(id, (node) => {
                return { value: { ...node.data.value, g: value } }
              })
            }
          }}
        />
        <CustomHandle
          id="blue"
          label="B"
          onChange={(value) => {
            if (data.value?.b !== value) {
              updateNodeData(id, (node) => {
                return { value: { ...node.data.value, b: value } }
              })
            }
          }}
        />
        <Handle type="source" position={Position.Right} />
      </div>
    </UI.Node>
  )
}
