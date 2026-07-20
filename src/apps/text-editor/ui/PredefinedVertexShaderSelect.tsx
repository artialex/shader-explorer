import predefinedShaders from '../data/default.json' with { type: 'json' }
import { Select } from '@mantine/core'
import { useVertShaderStore } from '../state/store'

export const PredefinedShadersSelect = () => {
  const options = predefinedShaders.vert.map((_) => ({
    value: _.shader,
    label: _.name,
  }))

  const selected = useVertShaderStore((_) => _.selected)
  const editShaderSource = useVertShaderStore((_) => _.editShaderSource)

  const handleChange = async (value: string | null) => {
    if (!selected || !value) return

    const data = (await import(/* @vite-ignore */ `../data/vert/${value}?raw`)).default

    editShaderSource(selected, data)
  }

  return (
    <Select
      size="xs"
      styles={{
        input: { borderColor: selected ? 'blanchedalmond' : 'inherit' },
        option: { color: 'blanchedalmond' },
      }}
      placeholder="Load predefined shader"
      data={options}
      value={null}
      onChange={handleChange}
      disabled={!selected}
    />
  )
}
