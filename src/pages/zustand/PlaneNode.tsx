import { memo, useMemo, useRef } from 'react'
import { InputHandle, MyNode } from '../../modules/ui/MyNode/MyNode'
import { Canvas, useFrame } from '@react-three/fiber'
import type { ShaderMaterial } from 'three'
import type { Node, NodeProps } from '@xyflow/react'

// The generated source flows in on the store's `data.value` (see the store's
// `plane` case in computeValue), assembled by the Vertex Shader (GLSL) node.
type PlaneNode = Node<{ value: string }, 'plane'>

// Shown until something is wired in — a plain pass-through so the plane always
// compiles and renders instead of erroring on an empty shader string.
const FALLBACK_VERTEX = `void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const FRAGMENT = `void main() {
  gl_FragColor = vec4(0.45, 0.62, 0.9, 1.0);
}`

export const PlaneNode = memo(({ data }: NodeProps<PlaneNode>) => {
  const width = 300
  const height = 300
  const vertexShader = data.value || FALLBACK_VERTEX

  return (
    <MyNode label="Plane" inputs={[<InputHandle>Vertex Shader</InputHandle>]}>
      <div style={{ width, height }}>
        <Canvas resize={{ offsetSize: true }} camera={{ position: [0.5, 0.5, 5], fov: 45 }}>
          <PlaneMesh vertexShader={vertexShader} />
          <axesHelper />
        </Canvas>
      </div>
    </MyNode>
  )
})

function PlaneMesh({ vertexShader }: { vertexShader: string }) {
  const materialRef = useRef<ShaderMaterial>(null)
  // The generated shader declares `uniform float u_time;`. Supply it here and
  // advance it every frame so the sine displacement actually animates.
  const uniforms = useMemo(() => ({ u_time: { value: 0 } }), [])

  useFrame((_state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta
    }
  })

  return (
    <mesh>
      <planeGeometry args={[3, 3, 32, 32]} />
      {/* Keying by the source forces Three to recompile the program whenever
          the upstream graph produces a new shader string. */}
      <shaderMaterial
        key={vertexShader}
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        wireframe
      />
    </mesh>
  )
}
