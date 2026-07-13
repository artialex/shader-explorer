import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/Image',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    nodes: [{ id: 'image-1', type: 'image', position: { x: 0, y: 0 }, data: { url: '' } }],
  },
}

export const WithImage: Story = {
  args: {
    nodes: [
      {
        id: 'image-1',
        type: 'image',
        position: { x: 0, y: 0 },
        data: { url: 'https://picsum.photos/seed/shader-explorer/400/300' },
      },
    ],
  },
}
