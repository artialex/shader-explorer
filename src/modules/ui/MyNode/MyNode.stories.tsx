import type { Meta, StoryObj } from '@storybook/react-vite'

import { NodeCanvas } from '../../nodes/storybook/NodeCanvas'
const meta = {
  title: 'UI/Node',
  component: NodeCanvas,
} satisfies Meta<typeof NodeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    nodes: [
      {
        id: 'number-1',
        type: 'number',
        position: { x: 0, y: 0 },
        data: { label: 'Simple Stuff', value: 57 },
      },
      {
        id: 'log-1',
        type: 'log',
        position: { x: 200, y: 0 },
        data: { label: 'Simple Stuff', value: 200 },
      },
      {
        id: 'normalize-1',
        type: 'normalize',
        position: { x: 0, y: 200 },
        data: { label: 'Simple Stuff', value: 200 },
      },
      {
        id: 'log-2',
        type: 'log',
        position: { x: 200, y: 200 },
        data: { label: 'Simple Stuff', value: 200 },
      },
    ],
    edges: [
      {
        id: 'number-1-log-1',
        source: 'number-1',
        target: 'log-1',
      },
      {
        id: 'log-1-normalize-1',
        source: 'log-1',
        target: 'normalize-1',
      },
      {
        id: 'normalize-1-log-2',
        source: 'normalize-1',
        target: 'log-2',
      },
    ],
  },
}
