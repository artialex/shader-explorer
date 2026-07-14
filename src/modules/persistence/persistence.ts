import type { Edge, Node } from '@xyflow/react'
import { initialState } from './initial-state'

interface State {
  nodes: Node[]
  edges: Edge[]
}

const KEY = '__my-flow'

export function save(state: State, key = KEY) {
  localStorage.setItem(key, JSON.stringify(state))
}

export function load(key = KEY) {
  const saved = localStorage.getItem(key)

  if (!saved) return initialState

  return JSON.parse(saved)
}
