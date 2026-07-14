export const initialState = {
  nodes: [
    {
      id: 'color-1',
      type: 'color',
      position: { x: 0, y: 50 },
      data: { label: 'Red', value: '#996262' },
    },
    {
      id: 'log-1',
      type: 'log',
      position: { x: 300, y: 50 },
      data: {},
    },
    {
      id: 'log-2',
      type: 'log',
      position: { x: 500, y: 50 },
      data: {},
    },
    {
      id: 'log-3',
      type: 'log',
      position: { x: 300, y: 200 },
      data: {},
    },
    {
      id: 'log-4',
      type: 'log',
      position: { x: 500, y: 200 },
      data: {},
    },
    {
      id: 'log-5',
      type: 'log',
      position: { x: 700, y: 200 },
      data: {},
    },
    {
      id: 'vertex-shader-1',
      type: 'vertexShader',
      position: { x: 900, y: 0 },
      data: {},
    },
  ],
  edges: [
    { id: 'color-1-log-1', source: 'color-1', target: 'log-1' },
    { id: 'log-1-log-2', source: 'log-1', target: 'log-2' },
    { id: 'log-2-log-3', source: 'log-2', target: 'log-3' },
    { id: 'log-3-log-4', source: 'log-3', target: 'log-4' },
    { id: 'log-4-log-5', source: 'log-4', target: 'log-5' },
  ],
  viewport: {
    x: 0,
    y: 0,
    zoom: 1,
  },
}
