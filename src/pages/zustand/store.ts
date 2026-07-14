import { create } from 'zustand'
import { applyNodeChanges, applyEdgeChanges, addEdge, getOutgoers } from '@xyflow/react'

const initialNodes = [
  // {
  //   id: 'color-1',
  //   type: 'color',
  //   position: { x: 0, y: 50 },
  //   data: { label: 'Red', value: '#996262' },
  // },
  // {
  //   id: 'log-1',
  //   type: 'log',
  //   position: { x: 300, y: 50 },
  //   data: {},
  // },
  // {
  //   id: 'log-2',
  //   type: 'log',
  //   position: { x: 500, y: 50 },
  //   data: {},
  // },
  // {
  //   id: 'log-3',
  //   type: 'log',
  //   position: { x: 300, y: 200 },
  //   data: {},
  // },
  // {
  //   id: 'log-4',
  //   type: 'log',
  //   position: { x: 500, y: 200 },
  //   data: {},
  // },
  // {
  //   id: 'log-5',
  //   type: 'log',
  //   position: { x: 700, y: 200 },
  //   data: {},
  // },
  {
    id: 'boxGeometry-1',
    type: 'boxGeometry',
    position: { x: 0, y: 0 },
    data: {},
  },
  {
    id: 'vector3-1',
    type: 'vector3',
    position: { x: 0, y: 100 },
    data: { value: { x: 1.1, y: 0.8, z: 5 } },
  },
  {
    id: 'vector3-2',
    type: 'vector3',
    position: { x: 100, y: -100 },
    data: { value: { x: 1.1, y: 0.8, z: 5 } },
  },
  {
    id: 'log-1',
    type: 'log',
    position: { x: 200, y: 100 },
    data: {},
  },
  {
    id: 'log-2',
    type: 'log',
    position: { x: 200, y: 300 },
    data: {},
  },
  {
    id: 'vertex-shader-1',
    type: 'vertexShader',
    position: { x: 450, y: 0 },
    data: {
      value: {
        cameraPosition: { x: 0, y: 1, z: 1 },
        boxPosition: { x: 0, y: 1, z: 1 },
      },
    },
  },
]

const initialEdges = [
  { id: 'vector3-1-log-1', source: 'vector3-1', target: 'log-1' },
  { id: 'log-1-vertex-shader-1', source: 'log-1', target: 'vertex-shader-1', targetHandle: 'cameraPosition' },
  // { id: 'log-1-log-2', source: 'log-1', target: 'log-2' },
  // { id: 'log-2-log-3', source: 'log-2', target: 'log-3' },
  // { id: 'log-3-log-4', source: 'log-3', target: 'log-4' },
  // { id: 'log-4-log-5', source: 'log-4', target: 'log-5' },
]

// Per-node-type logic: given a node and its incoming values (keyed by the
// *targetHandle* the edge is attached to — not connection order), return its
// new value. React Flow reports a `null` targetHandle for a node with a
// single unnamed handle, so we key that case under DEFAULT_HANDLE.
const DEFAULT_HANDLE = '__default__'

function computeValue(node, valuesByHandle) {
  switch (node.type) {
    case 'log':
      return valuesByHandle[DEFAULT_HANDLE] ?? 0 // pass the input straight through unchanged
    case 'vertexShader':
      return {
        cameraPosition: valuesByHandle.cameraPosition ?? { x: 1, y: 1, z: 5 },
        boxPosition: valuesByHandle.boxPosition ?? { x: 0, y: 0, z: 0 },
      }
    default:
      return node.data.value // source nodes are set directly by the user
  }
}

export const useStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) })
  },

  onEdgesChange: (changes) => {
    const prevEdges = get().edges
    set({ edges: applyEdgeChanges(changes, prevEdges) })

    // A removed edge means its target lost an input — recompute the target
    // itself (not just its outgoers) so it falls back to computeValue's
    // default for a missing input instead of keeping the stale value.
    const affectedTargets = changes
      .filter((c) => c.type === 'remove')
      .map((c) => prevEdges.find((e) => e.id === c.id)?.target)
      .filter((id) => id != null)

    if (affectedTargets.length) {
      get().recomputeNodes(affectedTargets)
    }
  },

  onConnect: (connection) => {
    set({ edges: addEdge(connection, get().edges) })
    get().propagateFrom(connection.source)
  },

  // Direct setters for bulk/programmatic updates (loading a saved flow,
  // resetting, drag-and-drop from a sidebar, etc). Accept either a value
  // or an updater function, matching React's setState convention.
  setNodes: (nodesOrUpdater) => {
    const next = typeof nodesOrUpdater === 'function' ? nodesOrUpdater(get().nodes) : nodesOrUpdater
    set({ nodes: next })
  },

  setEdges: (edgesOrUpdater) => {
    const next = typeof edgesOrUpdater === 'function' ? edgesOrUpdater(get().edges) : edgesOrUpdater
    set({ edges: next })
  },

  // Patch a node's own data (user typing in the source value, or changing
  // the intermediary's factor), then push the change downstream.
  updateNodeData: (nodeId, patch) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...patch } } : n,
      ),
    })
    get().propagateFrom(nodeId)
  },

  // BFS downstream from a changed node. Recomputes that node's outgoers
  // (its own value already changed by the caller). Only nodes actually
  // affected get a new object reference; everything else keeps its old
  // reference, so Zustand's default equality check skips re-rendering
  // unrelated nodes.
  propagateFrom: (nodeId) => {
    const { nodes, edges } = get()
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    const outgoers = getOutgoers(node, nodes, edges)
    get().recomputeNodes(outgoers.map((n) => n.id))
  },

  // Like propagateFrom, but recomputes the given nodes themselves (not
  // their outgoers) before cascading further downstream. Used when a node's
  // *inputs* changed rather than its own data — e.g. an incoming edge was
  // removed, so it should fall back to computeValue's default for a
  // missing input instead of keeping its last propagated value.
  recomputeNodes: (nodeIds) => {
    const { nodes, edges } = get()
    const nodeMap = new Map(nodes.map((n) => [n.id, n]))
    const updated = new Map()
    const queue = [...nodeIds]
    const visited = new Set()

    while (queue.length) {
      const currentId = queue.shift()
      if (visited.has(currentId)) continue
      visited.add(currentId)

      const currentNode = updated.get(currentId) ?? nodeMap.get(currentId)
      if (!currentNode) continue

      const incomingEdges = edges.filter((e) => e.target === currentId)
      const valuesByHandle = {}
      for (const e of incomingEdges) {
        const src = updated.get(e.source) ?? nodeMap.get(e.source)
        valuesByHandle[e.targetHandle ?? DEFAULT_HANDLE] = src?.data.value
      }

      const newValue = computeValue(currentNode, valuesByHandle)
      const changed = newValue !== currentNode.data.value
      if (changed) {
        updated.set(currentId, {
          ...currentNode,
          data: { ...currentNode.data, value: newValue },
        })
      }

      // Only cascade further if this node's value actually changed —
      // otherwise downstream nodes have nothing new to compute.
      if (changed) {
        const outgoers = getOutgoers(currentNode, nodes, edges)
        for (const target of outgoers) queue.push(target.id)
      }
    }

    if (updated.size === 0) return false

    set({ nodes: nodes.map((n) => updated.get(n.id) ?? n) })
    return true
  },

  // Computes every node's value from scratch — used once at startup (and
  // safe to call after loading a saved flow) so nodes that are already
  // wired up via edges don't sit with stale/empty data until the first
  // user-driven update. A single recomputeNodes pass can miss a consumer
  // that's listed before its upstream source (sources never register as
  // "changed" since their value already matches, so they don't cascade),
  // so this repeats until nothing changes, bounded by node count so a
  // cyclic graph can't loop forever.
  recomputeAll: () => {
    const ids = get().nodes.map((n) => n.id)
    for (let i = 0; i < ids.length; i++) {
      if (!get().recomputeNodes(ids)) break
    }
  },
}))

useStore.getState().recomputeAll()
