import type { Edge } from '@xyflow/react'
import { useCallback } from 'react'

export function useIsValidConnection(edges: Edge[]) {
  return useCallback(
    (connection) => {
      const alreadyConnected = edges.some(
        (edge) =>
          edge.target === connection.target && edge.targetHandle === connection.targetHandle,
      )

      return !alreadyConnected
    },
    [edges],
  )
}
