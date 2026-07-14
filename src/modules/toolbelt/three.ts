import type { Vector3Like } from 'three'

export function toArray(v: Vector3Like): [number, number, number] {
  return v ? [v.x, v.y, v.z] : [0, 0, 0]
}

export function fromArray([x, y, z]: [number, number, number]): Vector3Like {
  return { x, y, z }
}
