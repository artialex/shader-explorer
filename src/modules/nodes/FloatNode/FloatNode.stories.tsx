import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/Float',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    nodes: [
      {
        id: 'float-1',
        type: 'float',
        position: { x: 0, y: 0 },
        data: { label: 'Amplitude', value: 0.25, min: 0, max: 1, step: 0.01 },
      },
    ],
  },
}

export const WideRange: Story = {
  args: {
    nodes: [
      {
        id: 'float-1',
        type: 'float',
        position: { x: 0, y: 0 },
        data: { label: 'Frequency', value: 4, min: 0, max: 20, step: 0.1 },
      },
    ],
  },
}
