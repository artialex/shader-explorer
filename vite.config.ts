/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this as a project page at /shader-explorer/, so
  // built asset URLs need that prefix. Keep the dev server at the root.
  base: command === 'build' ? '/shader-explorer/' : '/',
  server: {
    port: 5199,
  },
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
}))
