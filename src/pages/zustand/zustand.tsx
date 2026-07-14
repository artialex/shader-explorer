import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import '../../global.css'
import { ZustandApp } from './ZustandApp.tsx'
import { MantineProvider } from '@mantine/core'
import { theme } from '../../theme.ts'
import { ReactFlowProvider } from '@xyflow/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactFlowProvider>
      <MantineProvider theme={theme}>
        <ZustandApp />
      </MantineProvider>
    </ReactFlowProvider>
  </StrictMode>,
)
