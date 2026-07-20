import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import './global.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme.ts'
import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} forceColorScheme="dark">
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </MantineProvider>
  </StrictMode>,
)
