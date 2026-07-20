// Named shader saves, persisted to localStorage as a single JSON object
// keyed by name (so saving under an existing name overwrites it).
const STORAGE_KEY = 'shader-explorer:saved-shaders'

export interface SavedShader {
  name: string
  source: string
  savedAt: number
}

function readAll(): Record<string, SavedShader> {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {} // corrupted/foreign data under this key — don't crash the editor over it
  }
}

function writeAll(all: Record<string, SavedShader>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function listSavedShaders(): SavedShader[] {
  return Object.values(readAll()).sort((a, b) => b.savedAt - a.savedAt)
}

export function saveShader(name: string, source: string) {
  const all = readAll()
  all[name] = { name, source, savedAt: Date.now() }
  writeAll(all)
}

export function deleteShader(name: string) {
  const all = readAll()
  delete all[name]
  writeAll(all)
}

// Moves an entry to a new key, keeping its source. If `newName` collides with
// an existing entry, that entry is overwritten — same last-write-wins policy
// as saveShader. No-ops if `oldName` doesn't exist.
export function renameShader(oldName: string, newName: string) {
  const all = readAll()
  const existing = all[oldName]
  if (!existing) return
  delete all[oldName]
  all[newName] = { ...existing, name: newName, savedAt: Date.now() }
  writeAll(all)
}
