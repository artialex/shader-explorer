import { useState } from 'react'
import { Tabs } from '@mantine/core'
import { ReactFlowProvider } from '@xyflow/react'
import { ZustandApp } from '../zustand/ZustandApp'
import { TextEditorApp } from '../text-editor/TextEditorApp'

type TabId = 'node-editor' | 'vertex-text-editor'

export function App() {
  const [tab, setTab] = useState<TabId>('node-editor')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Tabs value={tab} onChange={(value) => setTab(value as TabId)}>
        <Tabs.List>
          <Tabs.Tab value="node-editor">Node Editor</Tabs.Tab>
          <Tabs.Tab value="vertex-text-editor">Vertex Text Editor</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* Both tabs stay mounted (toggled via display) so switching back
          doesn't lose in-progress node graph edits or unsaved shader text. */}
      <div style={{ flex: 1, minHeight: 0, display: tab === 'node-editor' ? 'block' : 'none' }}>
        <ReactFlowProvider>
          <ZustandApp />
        </ReactFlowProvider>
      </div>
      <div
        style={{ flex: 1, minHeight: 0, display: tab === 'vertex-text-editor' ? 'block' : 'none' }}
      >
        <TextEditorApp />
      </div>
    </div>
  )
}
