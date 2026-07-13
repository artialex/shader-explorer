import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/VertexShaderOutput',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Defaults: Story = {
  args: {
    nodes: [{ id: 'vs-1', type: 'vertexShader', position: { x: 0, y: 0 }, data: {} }],
  },
}

export const Connected: Story = {
  args: {
    nodes: [
      {
        id: 'amplitude',
        type: 'float',
        position: { x: -280, y: -80 },
        data: { label: 'Amplitude', value: 0.4, min: 0, max: 1, step: 0.01 },
      },
      {
        id: 'frequency',
        type: 'float',
        position: { x: -280, y: 40 },
        data: { label: 'Frequency', value: 6, min: 0, max: 20, step: 0.1 },
      },
      {
        id: 'speed',
        type: 'float',
        position: { x: -280, y: 160 },
        data: { label: 'Speed', value: 2, min: 0, max: 5, step: 0.05 },
      },
      { id: 'vs-1', type: 'vertexShader', position: { x: 120, y: 0 }, data: {} },
    ],
    edges: [
      { id: 'a-vs', source: 'amplitude', target: 'vs-1', targetHandle: 'amplitude' },
      { id: 'f-vs', source: 'frequency', target: 'vs-1', targetHandle: 'frequency' },
      { id: 's-vs', source: 'speed', target: 'vs-1', targetHandle: 'speed' },
    ],
  },
}
