import { Button, Stack } from '@mantine/core'
import type { MouseEvent } from 'react'
import css from './Sidebar.module.css'

interface Props {
  nodeTypes: string[]
  onAddNode: (evt: MouseEvent<HTMLButtonElement>) => void
}

export function Sidebar({ nodeTypes, onAddNode }: Props) {
  return (
    <div className={css.root}>
      <div className={css.header}>Add Node</div>
      <Stack className={css.list} gap={4}>
        {nodeTypes.map((type) => (
          <Button
            key={type}
            className={css.button}
            onClick={onAddNode}
            data-type={type}
            size="xs"
            variant="light"
            fullWidth
          >
            {type}
          </Button>
        ))}
      </Stack>
    </div>
  )
}
