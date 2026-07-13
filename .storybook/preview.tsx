import type { Preview } from '@storybook/react-vite'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@xyflow/react/dist/style.css'
import '../src/index.css'
import { theme } from '../src/theme'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  decorators: [
    (Story) => (
      <MantineProvider theme={theme}>
        <Story />
      </MantineProvider>
    ),
  ],
}

export default preview
