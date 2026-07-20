import { Tabs } from '@mantine/core'
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { VertShaderTextEditorApp } from './apps/text-editor/VertShaderTextEditorApp'
import { FragShaderTextEditorApp } from './apps/text-editor/FragShaderTextEditorApp'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <main style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <Tabs value={location.pathname} onChange={(value) => value && navigate(value)}>
        <Tabs.List>
          <Tabs.Tab value="/vertex-shader">Vertex Shader</Tabs.Tab>
          <Tabs.Tab value="/vertex-fragment-shader">Vertex + Fragment</Tabs.Tab>
          <Tabs.Tab disabled value="/node-editor">
            Node Editor (WIP)
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Outlet />
      </div>
    </main>
  )
}

export const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<div style={{ padding: 20 }}>Select an editor above ^ </div>} />
      <Route path="vertex-shader" element={<VertShaderTextEditorApp />} />
      <Route path="vertex-fragment-shader" element={<FragShaderTextEditorApp />} />
    </Route>
  </Routes>
)
