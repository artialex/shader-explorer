import { Group, Splitter, Stack } from '@mantine/core'
import { getCurrentShader, useFragShaderStore, useVertShaderStore } from './state/store'
import { PredefinedShadersSelect } from './ui/PredefinedVertexShaderSelect'
import { PreviewCanvas } from './ui/PreviewCanvas'
import { PreviewErrorText } from './ui/PreviewErrorText'
import { SavedShadersSelect } from './ui/SavedShadersSelect'
import { ShaderCodeEditor } from './ui/ShaderCodeEditor'

function VertexShaderCodeEditor() {
  const vertexShader = useVertShaderStore(getCurrentShader)

  return (
    <Stack gap={0} align="stretch" justify="space-between" styles={{ root: { height: '100%' } }}>
      <Group gap={6} justify="space-between" styles={{ root: { padding: 8 } }}>
        <SavedShadersSelect title="Vertex" useShaderStore={useVertShaderStore} />
        <PredefinedShadersSelect />
      </Group>

      {vertexShader && <ShaderCodeEditor useShaderStore={useVertShaderStore} />}
      <PreviewErrorText useShaderStore={useVertShaderStore} />
    </Stack>
  )
}

function FragmentShaderCodeEditor() {
  const fragmentShader = useFragShaderStore(getCurrentShader)

  return (
    <Stack gap={0} align="stretch" justify="space-between" styles={{ root: { height: '100%' } }}>
      <Group gap={6} justify="space-between" styles={{ root: { padding: 8 } }}>
        <SavedShadersSelect title="Fragment" useShaderStore={useFragShaderStore} />
        {/*<PredefinedShadersSelect />*/}
      </Group>

      {fragmentShader && <ShaderCodeEditor useShaderStore={useFragShaderStore} />}
      <PreviewErrorText useShaderStore={useFragShaderStore} />
    </Stack>
  )
}

export function FragShaderTextEditorApp() {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <Splitter w="100%" withHandle={false}>
        <Splitter.Pane defaultSize="50%" min="20%">
          <Splitter h="100%" withHandle={false} orientation="vertical">
            <Splitter.Pane defaultSize="50%" min="20%">
              <VertexShaderCodeEditor />
            </Splitter.Pane>
            <Splitter.Pane defaultSize="50%" min="20%">
              <FragmentShaderCodeEditor />
            </Splitter.Pane>
          </Splitter>
        </Splitter.Pane>
        <Splitter.Pane defaultSize="50%" min="20%">
          <PreviewCanvas />
        </Splitter.Pane>
      </Splitter>
    </div>
  )
}
