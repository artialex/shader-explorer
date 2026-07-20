import { SavedShadersSelect } from './ui/SavedShadersSelect'
import { ShaderCodeEditor } from './ui/ShaderCodeEditor'
import { getCurrentShader, useVertShaderStore } from './state/store'
import { PreviewCanvas } from './ui/PreviewCanvas'
import { PreviewErrorText } from './ui/PreviewErrorText'
import { PredefinedShadersSelect } from './ui/PredefinedVertexShaderSelect'
import { Group, Splitter, Stack } from '@mantine/core'

export function VertShaderTextEditorApp() {
  const currentShader = useVertShaderStore(getCurrentShader)

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <Splitter w="100%" withHandle={false}>
        <Splitter.Pane defaultSize="50%" min="20%">
          <Stack
            gap={0}
            align="stretch"
            justify="space-between"
            styles={{ root: { height: '100%' } }}
          >
            <Group gap={6} justify="space-between" styles={{ root: { padding: 8 } }}>
              <SavedShadersSelect useShaderStore={useVertShaderStore} />
              <PredefinedShadersSelect />
            </Group>

            {currentShader && <ShaderCodeEditor useShaderStore={useVertShaderStore} />}
            <PreviewErrorText useShaderStore={useVertShaderStore} />
          </Stack>
        </Splitter.Pane>
        <Splitter.Pane defaultSize="50%" min="20%">
          <PreviewCanvas wireframe />
        </Splitter.Pane>
      </Splitter>
    </div>
  )
}
