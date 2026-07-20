import { ActionIcon, Group, Input, Select, Title } from '@mantine/core'
import { PlusIcon, XIcon } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'

import { getCurrentName, type ShaderStoreHook } from '../state/store'

namespace RenamingInput {
  export interface Props {
    name: string
    onChange: (name: string) => void
  }
}

const RenamingInput = (props: RenamingInput.Props) => {
  const [value, setValue] = useState(props.name)

  return (
    <Input
      value={value}
      autoFocus
      size="xs"
      onFocus={({ currentTarget }) => currentTarget.select()}
      onChange={({ target }) => setValue(target.value)}
      onBlur={() => props.onChange(value)}
      onKeyDown={({ key }) => {
        if (key === 'Enter') {
          props.onChange(value)
        }
      }}
    />
  )
}

namespace SavedShadersSelect {
  export interface Props {
    useShaderStore: ShaderStoreHook
    title?: string
  }
}

export const SavedShadersSelect = ({ useShaderStore, title }: SavedShadersSelect.Props) => {
  const shaders = useShaderStore((s) => s.shaders)
  const name = useShaderStore(getCurrentName)
  const editShaderName = useShaderStore((s) => s.editShaderName)
  const selected = useShaderStore((s) => s.selected)

  const createShader = useShaderStore((s) => s.createShader)
  const deleteShader = useShaderStore((s) => s.deleteShader)
  const selectShader = useShaderStore((s) => s.selectShader)

  const options = useMemo(() => shaders.map((_) => ({ label: _.name, value: _.id })), [shaders])

  const [isRenaming, setRenaming] = useState(false)

  const handleNameChange = (value: string) => {
    selected && editShaderName(selected, value)
    setRenaming(false)
  }

  return (
    <Group gap={6}>
      {isRenaming ? (
        <RenamingInput name={name} onChange={handleNameChange} />
      ) : (
        <Select
          size="xs"
          placeholder="Save/Load shader"
          data={options}
          value={selected}
          onChange={(value) => value && selectShader(value)}
          onDoubleClick={() => setRenaming(true)}
        />
      )}
      <ActionIcon onClick={() => createShader()}>
        <PlusIcon />
      </ActionIcon>
      <ActionIcon
        color="pink"
        variant=""
        onClick={() => selected && deleteShader(selected)}
        disabled={!selected}
      >
        <XIcon />
      </ActionIcon>
      {title && <Title order={4}>{title}</Title>}
    </Group>
  )
}
