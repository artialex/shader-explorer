import type { PropsWithChildren, ReactNode, CSSProperties, ComponentProps } from 'react'
import css from './Node.module.css'
import { Label } from './Label'

interface Props extends ComponentProps<'div'> {
  label: ReactNode
  style?: CSSProperties
  noPadding?: boolean
}

export function Node({ children, label, style, noPadding = false, ...props }: PropsWithChildren<Props>) {
  return (
    <div className={css.root} {...props}>
      {typeof label === 'string' ? <Label>{label}</Label> : label}
      {children && (
        <div className={css.content} style={{ padding: noPadding ? 0 : style?.padding, ...style }}>
          {children}
        </div>
      )}
    </div>
  )
}
