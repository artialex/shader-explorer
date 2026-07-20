import predefinedShaders from '../data/default.json' with { type: 'json' }
import { Select } from '@mantine/core'
import { useVertShaderStore } from '../state/store'

// Let Vite discover and bundle every .vert at build time. Each entry is a
// lazy loader keyed by path relative to this file, so the sources resolve in
// both `dev` and the production build (unlike a `@vite-ignore` dynamic import,
// which is never bundled and 404s once deployed).
const vertLoaders = import.meta.glob('../data/vert/*.vert', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

export const PredefinedShadersSelect = () => {
  const options = predefinedShaders.vert.map((_) => ({
    value: _.shader,
    label: _.name,
  }))

  const selected = useVertShaderStore((_) => _.selected)
  const editShaderSource = useVertShaderStore((_) => _.editShaderSource)

  const handleChange = async (value: string | null) => {
    if (!selected || !value) return

    const loadShader = vertLoaders[`../data/vert/${value}`]
    if (!loadShader) return

    const data = await loadShader()

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
