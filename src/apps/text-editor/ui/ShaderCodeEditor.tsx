import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'
import { glsl } from 'codemirror-lang-glsl'
import { debounce } from 'lodash'
import { getCurrentShader, type ShaderStoreHook } from '../state/store'

const extensions = [glsl(), EditorView.lineWrapping]

namespace ShaderCodeEditor {
  export interface Props {
    useShaderStore: ShaderStoreHook
  }
}

export const ShaderCodeEditor = ({ useShaderStore }: ShaderCodeEditor.Props) => {
  const shader = useShaderStore(getCurrentShader)
  const editShaderSource = useShaderStore((s) => s.editShaderSource)

  if (!shader) return null

  const handleSourceChange = debounce((value) => {
    editShaderSource(shader.id, value)
  }, 200)

  return (
    <CodeMirror
      value={shader.source}
      onChange={handleSourceChange}
      theme={oneDark}
      extensions={extensions}
      height="100%"
      style={{ flex: 1, height: '100%', fontSize: 13 }}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        highlightSelectionMatches: true,
      }}
    />
  )
}
