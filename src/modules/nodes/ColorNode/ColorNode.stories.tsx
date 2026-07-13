import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/Color',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    nodes: [{ id: 'color-1', type: 'color', position: { x: 0, y: 0 }, data: { color: '#ff6b6b' } }],
  },
}
