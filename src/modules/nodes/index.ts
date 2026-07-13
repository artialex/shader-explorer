import { OutputNode } from './ThreeOutput/ThreeOutput'
import { ColorNode } from './ColorNode/ColorNode'
import { NumberNode } from './NumberNode/NumberNode'
import { ColorPreviewNode } from './ColorPreviewNode/ColorPreviewNode'
import { LogNode } from './LogNode/LogNode'
import { ColorBackgroundNode } from './ColorBackgroundNode/ColorBackgroundNode'
import { ImageNode } from './ImageNode/ImageNode'
import { ImageFilterNode } from './ImageFilterNode/ImageFilterNode'
import { NormalizeNode } from './NormalizeNode/NormalizeNode'
import { FloatNode } from './FloatNode/FloatNode'
import { VertexShaderOutputNode } from './VertexShaderOutputNode/VertexShaderOutputNode'

export const nodeTypes = {
  color: ColorNode,
  output: OutputNode,
  number: NumberNode,
  colorPreview: ColorPreviewNode,
  log: LogNode,
  background: ColorBackgroundNode,
  image: ImageNode,
  imageFilter: ImageFilterNode,
  normalize: NormalizeNode,
  float: FloatNode,
  vertexShader: VertexShaderOutputNode,
}
