import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/ThreeOutput',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    nodes: [{ id: 'output-1', type: 'output', position: { x: 0, y: 0 }, data: { color: 'orange' } }],
  },
}

export const Connected: Story = {
  args: {
    nodes: [
      { id: 'color-1', type: 'color', position: { x: -220, y: 0 }, data: { color: '#4dabf7' } },
      { id: 'output-1', type: 'output', position: { x: 100, y: 0 }, data: { color: '#4dabf7' } },
    ],
    edges: [{ id: 'c-o', source: 'color-1', target: 'output-1' }],
  },
}
