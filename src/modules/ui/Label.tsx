import { TextInput } from '@mantine/core'
import { useRef, useState, type ComponentProps } from 'react'
import css from './Label.module.css'
import clsx from 'clsx'

interface Props extends ComponentProps<typeof TextInput> {
  children: string
  onNameChange?: (value: string) => void
}

export function Label({ children, onNameChange, ...props }: Props) {
  const [isEditing, setEditing] = useState(false)
  const [value, setValue] = useState(children)
  const ref = useRef<HTMLInputElement>(null)

  return (
    <TextInput
      name="label"
      ref={ref}
      // autoFocus
      size="xs"
      readOnly={!isEditing}
      onDoubleClick={() => {
        setEditing(true)
      }}
      className={css.root}
      styles={{
        input: { minHeight: 20, height: 16, borderRadius: 0, cursor: isEditing ? 'text' : 'pointer' },
      }}
      variant="unstyled"
      value={value}
      onChange={({ target }) => {
        setValue(target.value)
      }}
      onBlur={() => {
        setEditing(false)
        onNameChange?.(value)
      }}
      {...props}
    />
  )
}
