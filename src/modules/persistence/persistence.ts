import type { Edge, Node } from '@xyflow/react'
import { initialState } from './initial-state'

interface State {
  nodes: Node[]
  edges: Edge[]
}

const KEY = '__my-flow'

export function save(state: State) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function load() {
  const saved = localStorage.getItem(KEY)

  if (!saved) return initialState

  return JSON.parse(saved)
}
