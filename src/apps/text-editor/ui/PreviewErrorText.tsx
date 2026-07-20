import { type ShaderStoreHook } from '../state/store'

namespace PreviewErrorText {
  export interface Props {
    useShaderStore: ShaderStoreHook
  }
}

export const PreviewErrorText = ({ useShaderStore }: PreviewErrorText.Props) => {
  const error = useShaderStore((_) => _.error)

  if (!error) return null

  return (
    <pre
      style={{
        margin: 0,
        padding: 10,
        maxHeight: 160,
        overflow: 'auto',
        background: '#3a1414',
        color: '#ff8a8a',
        fontFamily: 'var(--mantine-font-family-monospace)',
        fontSize: 12,
        whiteSpace: 'pre-wrap',
      }}
    >
      {error}
    </pre>
  )
}
