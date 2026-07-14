import { InputHandle, OutputHandle } from '../ui/MyNode/MyNode'

export function ValueInputHandle({ view }: { view: any }) {
  return <InputHandle>In {view}</InputHandle>
}

export function ValueOutputHandle() {
  return <OutputHandle>Out</OutputHandle>
}
