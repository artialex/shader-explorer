import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/Log',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const NoInput: Story = {
  args: {
    nodes: [{ id: 'log-1', type: 'log', position: { x: 0, y: 0 }, data: {} }],
  },
}

export const Connected: Story = {
  args: {
    nodes: [
      { id: 'number-1', type: 'number', position: { x: -220, y: 0 }, data: { label: 'Value', value: 200 } },
      { id: 'log-1', type: 'log', position: { x: 100, y: 0 }, data: {} },
    ],
    edges: [{ id: 'n-l', source: 'number-1', target: 'log-1' }],
  },
}
