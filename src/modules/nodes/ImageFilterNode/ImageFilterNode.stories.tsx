import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/ImageFilter',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const NoInput: Story = {
  args: {
    nodes: [{ id: 'filter-1', type: 'imageFilter', position: { x: 0, y: 0 }, data: { kind: 'sepia', value: 0.6 } }],
  },
}

export const Connected: Story = {
  args: {
    nodes: [
      {
        id: 'image-1',
        type: 'image',
        position: { x: -260, y: 0 },
        data: { url: 'https://picsum.photos/seed/shader-explorer/400/300' },
      },
      { id: 'filter-1', type: 'imageFilter', position: { x: 100, y: 0 }, data: { kind: 'grayscale', value: 0.8 } },
    ],
    // ImageFilterNode's target handle id is its own node id.
    edges: [{ id: 'i-f', source: 'image-1', target: 'filter-1', targetHandle: 'filter-1' }],
  },
}
