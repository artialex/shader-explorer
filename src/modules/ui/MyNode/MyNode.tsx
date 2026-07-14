import { Slider, type SliderProps } from '@mantine/core'
import css from './MyNode.module.css'
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import { Handle, Position, useNodeConnections } from '@xyflow/react'
import { Fragment } from 'react'

export interface MyNodeProps extends ComponentProps<'div'> {
  label: string
  children?: ReactNode
  inputs?: ReactNode[]
  outputs?: ReactNode[]
}

export function InputHandle({ id, children, ...props }: PropsWithChildren<{ id?: string }>) {
  const connections = useNodeConnections({
    handleType: 'target',
    handleId: id,
  })
  return (
    <div className={css.input}>
      {children}
      <Handle
        type="target"
        isConnectable={connections.length < 1}
        position={Position.Left}
        id={id}
      />
    </div>
  )
}

export function OutputHandle({ id, children, ...props }: PropsWithChildren<{ id?: string }>) {
  return (
    <div className={css.output}>
      {children}
      <Handle type="source" position={Position.Right} id={id} />
    </div>
  )
}

export function SliderHandle(props: SliderProps) {
  return (
    <div className={css.output}>
      <Slider size="xs" className="nodrag" {...props} />
      <Handle type="source" position={Position.Right} id={props.id} />
    </div>
  )
}

export function MyNode({
  label = 'Custom Node',
  children,
  inputs,
  outputs,
  ...props
}: MyNodeProps) {
  return (
    <div className={css.root} {...props}>
      <div className={css.label}>{label}</div>
      {inputs && (
        <div className={css.inputs}>
          {inputs.map((input, ind) => (
            <Fragment key={ind}>{input}</Fragment>
          ))}
        </div>
      )}
      {outputs && (
        <div className={css.outputs}>
          {outputs.map((output, ind) => (
            <Fragment key={ind}>{output}</Fragment>
          ))}
        </div>
      )}
      {children && <div className={css.content}>{children}</div>}
    </div>
  )
}
