import { memo } from 'react'
import { MyNode, SliderHandle } from '../../modules/ui/MyNode/MyNode'

export const BoxGeometryNode = memo(() => {
  return (
    <MyNode label="Box Geometry" outputs={[<SliderHandle min={0} max={20} step={1} />]}></MyNode>
  )
})
