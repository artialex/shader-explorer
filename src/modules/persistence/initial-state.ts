export const initialState = {
  nodes: [
    {
      id: 'red',
      type: 'number',
      position: { x: 0, y: 50 },
      data: { label: 'Red', value: 250 },
    },
    {
      id: 'green',
      type: 'number',
      position: { x: 0, y: 150 },
      data: { label: 'Green', value: 250 },
    },
    {
      id: 'blue',
      type: 'number',
      position: { x: 0, y: 250 },
      data: { label: 'Blue', value: 250 },
    },
    {
      id: 'preview',
      type: 'colorPreview',
      position: { x: 300, y: 150 },
      data: { label: 'Color' },
    },
    {
      id: 'log',
      type: 'log',
      position: { x: 300, y: 50 },
    },
    {
      id: 'amplitude',
      type: 'float',
      position: { x: 0, y: 400 },
      data: { label: 'Amplitude', value: 0.25, min: 0, max: 1, step: 0.01 },
    },
    {
      id: 'frequency',
      type: 'float',
      position: { x: 0, y: 480 },
      data: { label: 'Frequency', value: 4, min: 0, max: 20, step: 0.1 },
    },
    {
      id: 'speed',
      type: 'float',
      position: { x: 0, y: 560 },
      data: { label: 'Speed', value: 1.2, min: 0, max: 5, step: 0.05 },
    },
    {
      id: 'vertexShader',
      type: 'vertexShader',
      position: { x: 360, y: 400 },
      data: {},
    },
  ],
  edges: [
    { id: 'amplitude-vs', source: 'amplitude', target: 'vertexShader', targetHandle: 'amplitude' },
    { id: 'frequency-vs', source: 'frequency', target: 'vertexShader', targetHandle: 'frequency' },
    { id: 'speed-vs', source: 'speed', target: 'vertexShader', targetHandle: 'speed' },
    // {
    //   id: 'red-preview',
    //   source: 'red',
    //   target: 'preview',
    //   targetHandle: 'red',
    // },
    // {
    //   id: 'green-preview',
    //   source: 'green',
    //   target: 'preview',
    //   targetHandle: 'green',
    // },
    // {
    //   id: 'blue-preview',
    //   source: 'blue',
    //   target: 'preview',
    //   targetHandle: 'blue',
    // },
    // {
    //   id: 'red-log',
    //   source: 'red',
    //   target: 'log',
    //   targetHandle: 'input',
    // },
  ],
  viewport: {
    x: 0,
    y: 0,
    zoom: 1,
  },
}
