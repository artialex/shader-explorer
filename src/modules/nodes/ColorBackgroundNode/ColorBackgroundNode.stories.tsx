import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeCanvas } from '../storybook/NodeCanvas'

const meta = {
  title: 'Nodes/ColorBackground',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const NoInput: Story = {
  args: {
    nodes: [{ id: 'background-1', type: 'background', position: { x: 0, y: 0 }, data: {} }],
  },
}

export const Connected: Story = {
  args: {
    nodes: [
      { id: 'red', type: 'number', position: { x: -260, y: -80 }, data: { label: 'Red', value: 235 } },
      { id: 'green', type: 'number', position: { x: -260, y: 40 }, data: { label: 'Green', value: 120 } },
      { id: 'blue', type: 'number', position: { x: -260, y: 160 }, data: { label: 'Blue', value: 60 } },
      { id: 'preview-1', type: 'colorPreview', position: { x: 40, y: 0 }, data: {} },
      { id: 'background-1', type: 'background', position: { x: 380, y: 40 }, data: {} },
    ],
    edges: [
      { id: 'r-p', source: 'red', target: 'preview-1', targetHandle: 'red' },
      { id: 'g-p', source: 'green', target: 'preview-1', targetHandle: 'green' },
      { id: 'b-p', source: 'blue', target: 'preview-1', targetHandle: 'blue' },
      // ColorBackgroundNode's target handle id is its own node id.
      { id: 'p-bg', source: 'preview-1', target: 'background-1', targetHandle: 'background-1' },
    ],
  },
}
