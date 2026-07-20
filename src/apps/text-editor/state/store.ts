import type { Shader } from '../types/Shader'
import { validateFragmentShader, validateVertexShader } from '../logic/validateShader'
import { createPersistedStore } from '../../../modules/zustand/createPersistentStore'
import type { StoreApi, UseBoundStore } from 'zustand'
import { DEFAULT_FRAG_SHADER, DEFAULT_VERT_SHADER } from '../data'

interface State {
  shaders: Shader[]
  selected: string | null
  error: string | null
}

interface Action {
  createShader: () => void
  deleteShader: (id: string) => void
  selectShader: (id: string) => void
  editShaderSource: (id: string, source: string) => void
  editShaderName: (id: string, name: string) => void
}

function createShader(source: string) {
  const id = crypto.randomUUID()

  return {
    id,
    name: id.slice(0, 8),
    source,
  }
}

export function getCurrentShader(state: State) {
  return state.shaders.find((_) => _.id === state.selected) ?? null
}

export function getCurrentName(state: State) {
  return state.shaders.find((_) => _.id === state.selected)?.name ?? ''
}

export function getCurrentSource(state: State) {
  return state.shaders.find((_) => _.id === state.selected)?.source
}

function createShaderStore(key: string, defaultShader: string, validate: Function) {
  return createPersistedStore<State & Action>(key, (set) => ({
    shaders: [],
    selected: null,
    error: null,

    createShader: () =>
      set((state) => {
        const shader = createShader(defaultShader)

        return {
          shaders: state.shaders.concat(shader),
          selected: shader.id,
        }
      }),

    selectShader: (id: string) => set(() => ({ selected: id, error: null })),

    deleteShader: (id: string) =>
      set((state) => {
        const index = state.shaders.findIndex((_) => _.id === id)

        const newSelectedId = state.shaders[index + 1]?.id ?? state.shaders[index - 1]?.id ?? null

        return {
          shaders: state.shaders.filter((_, i) => i !== index),
          selected: newSelectedId,
        }
      }),

    editShaderName: (id: string, name: string) =>
      set((state) => {
        const shader = state.shaders.find((_) => _.id === id)
        if (!shader) return
        shader.name = name
      }),

    editShaderSource: (id: string, source: string) =>
      set((state) => {
        const shader = state.shaders.find((_) => _.id === id)
        console.log(shader, source)
        if (!shader) return

        const result = validate(source)

        if (result.ok) {
          shader.source = source
          state.error = null
        } else {
          state.error = result.error
        }
      }),
  }))
}

export const useVertShaderStore = createShaderStore(
  'vertex-store',
  DEFAULT_VERT_SHADER,
  validateVertexShader,
)

export const useFragShaderStore = createShaderStore(
  'fragment-store',
  DEFAULT_FRAG_SHADER,
  validateFragmentShader,
)

export type ShaderStoreHook = UseBoundStore<StoreApi<State & Action>>
