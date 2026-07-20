import { SegmentedControl } from '@mantine/core'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { getCurrentSource, useFragShaderStore, useVertShaderStore } from '../state/store'
import { OrbitControls } from '@react-three/drei'
import { DoubleSide, type ShaderMaterial } from 'three'
import { GLSL3 } from 'three'
import { DEFAULT_FRAG_SHADER, DEFAULT_VERT_SHADER } from '../data'

type PreviewShape = 'plane' | 'cube' | 'sphere'

namespace PreviewCanvas {
  export interface Props {
    wireframe?: boolean
  }
}

export const PreviewCanvas = ({ wireframe }: PreviewCanvas.Props) => {
  const [shape, setShape] = useState<PreviewShape>('plane')
  const vertexShader = useVertShaderStore(getCurrentSource)
  const fragmentShader = useFragShaderStore(getCurrentSource)

  if ((!wireframe && !fragmentShader) || !vertexShader) {
    return null
  }

  return (
    <div style={{ flex: 1, height: '100%', position: 'relative', background: '#2d2d2d' }}>
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, width: 220 }}>
        <SegmentedControl
          fullWidth
          value={shape}
          onChange={setShape}
          data={[
            { label: 'Plane', value: 'plane' },
            { label: 'Cube', value: 'cube' },
            { label: 'Sphere', value: 'sphere' },
          ]}
        />
      </div>

      <Canvas camera={{ position: [2, 2, 3], fov: 45 }}>
        <PreviewMesh
          wireframe={wireframe}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          shape={shape}
        />
        <axesHelper args={[2]} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

namespace PreviewMesh {
  export interface Props {
    vertexShader?: string
    fragmentShader?: string
    wireframe?: boolean
    shape: PreviewShape
  }
}

function PreviewMesh({
  vertexShader = DEFAULT_VERT_SHADER,
  fragmentShader = DEFAULT_FRAG_SHADER,
  shape,
  wireframe,
}: PreviewMesh.Props) {
  const materialRef = useRef<ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ u_time: { value: 0 } }), [])

  useFrame((_state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta
    }
  })

  return (
    <mesh>
      {shape === 'plane' && <planeGeometry args={[2.5, 2.5, 32, 32]} />}
      {shape === 'cube' && <boxGeometry args={[2, 2, 2, 24, 24, 24]} />}
      {shape === 'sphere' && <sphereGeometry args={[1.4, 48, 48]} />}
      {/* Keying by source forces Three to recompile the program whenever the
          validated shader text changes. */}
      <shaderMaterial
        key={vertexShader + fragmentShader}
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={wireframe ? DEFAULT_FRAG_SHADER : fragmentShader}
        uniforms={uniforms}
        side={DoubleSide}
        wireframe={wireframe}
        glslVersion={GLSL3}
      />
    </mesh>
  )
}
