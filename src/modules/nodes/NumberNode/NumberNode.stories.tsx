import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/Number',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    nodes: [{ id: 'number-1', type: 'number', position: { x: 0, y: 0 }, data: { label: 'Red', value: 128 } }],
  },
}

export const AtMax: Story = {
  args: {
    nodes: [{ id: 'number-1', type: 'number', position: { x: 0, y: 0 }, data: { label: 'Red', value: 255 } }],
  },
}
