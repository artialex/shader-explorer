import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/Normalize',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const NoInput: Story = {
  args: {
    nodes: [{ id: 'normalize-1', type: 'normalize', position: { x: 0, y: 0 }, data: {} }],
  },
}

export const Connected: Story = {
  args: {
    nodes: [
      { id: 'number-1', type: 'number', position: { x: -220, y: 0 }, data: { label: 'Value', value: 191 } },
      { id: 'normalize-1', type: 'normalize', position: { x: 100, y: 0 }, data: {} },
      { id: 'log-1', type: 'log', position: { x: 320, y: 0 }, data: {} },
    ],
    edges: [
      { id: 'n-norm', source: 'number-1', target: 'normalize-1' },
      { id: 'norm-log', source: 'normalize-1', target: 'log-1' },
    ],
  },
}
