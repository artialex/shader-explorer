import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export function createPersistedStore<T>(
  name: string,
  initializer: StateCreator<T, [['zustand/immer', never]], []>,
) {
  return create<T>()(persist(immer(initializer), { name }))
}
