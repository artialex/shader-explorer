import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Handle, Position, useNodeConnections, useNodesData, type NodeProps } from '@xyflow/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform float uSpeed;

  varying float vElevation;

  void main() {
    vec3 pos = position;

    // A classic vertex-shader wave: displace each vertex along its normal by a
    // travelling sine/cosine field. Amplitude/frequency/speed come from the graph.
    float elevation =
      sin(pos.x * uFrequency + uTime * uSpeed) *
      cos(pos.y * uFrequency + uTime * uSpeed);

    pos += normal * elevation * uAmplitude;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying float vElevation;

  void main() {
    vec3 low = vec3(0.10, 0.30, 0.60);
    vec3 high = vec3(0.95, 0.75, 0.25);
    vec3 color = mix(low, high, vElevation * 0.5 + 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
`

interface WaveMeshProps {
  amplitude: number
  frequency: number
  speed: number
}

function WaveMesh({ amplitude, frequency, speed }: WaveMeshProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Build the uniforms object once — recreating it (or the material) forces a
  // shader recompile every frame. We only mutate uniform values afterwards.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: amplitude },
      uFrequency: { value: frequency },
      uSpeed: { value: speed },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame((state) => {
    const material = materialRef.current
    if (!material) return

    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uAmplitude.value = amplitude
    material.uniforms.uFrequency.value = frequency
    material.uniforms.uSpeed.value = speed
  })

  return (
    <mesh rotation={[-Math.PI / 2.6, 0, 0]}>
      {/* High subdivision count so the per-vertex deformation is visible. */}
      <planeGeometry args={[3, 3, 96, 96]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  )
}

function ParamHandle({
  id,
  label,
  onChange,
}: {
  id: string
  label: string
  onChange: (value: number | undefined) => void
}) {
  const connections = useNodeConnections({ handleType: 'target', handleId: id })
  const nodeData = useNodesData(connections?.[0]?.source)

  useEffect(() => {
    const value = nodeData?.data?.value
    onChange(typeof value === 'number' ? value : undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeData])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', position: 'relative' }}>
      <Handle type="target" position={Position.Left} id={id} className="handle" />
      <span style={{ fontSize: 11, fontWeight: 600 }}>{label}</span>
    </div>
  )
}

export function VertexShaderOutputNode({}: NodeProps) {
  const [amplitude, setAmplitude] = useState(0.25)
  const [frequency, setFrequency] = useState(4)
  const [speed, setSpeed] = useState(1.2)

  const canvasWrapRef = useRef<HTMLDivElement>(null)

  // R3F's own size measurement doesn't fire inside React Flow's transformed
  // container, leaving the canvas stuck at Three's 300x150 default. R3F does
  // re-measure on window resize, so we wake it that way. A ResizeObserver
  // handles later layout changes (node drag, zoom); the timed dispatches win
  // the race against R3F's async renderer setup on first mount.
  useEffect(() => {
    const wake = () => window.dispatchEvent(new Event('resize'))
    const timers = [setTimeout(wake, 60), setTimeout(wake, 250)]

    const el = canvasWrapRef.current
    const ro = el ? new ResizeObserver(wake) : null
    if (el && ro) ro.observe(el)

    return () => {
      timers.forEach(clearTimeout)
      ro?.disconnect()
    }
  }, [])

  return (
    <div
      style={{
        width: 280,
        border: '1px solid #444',
        borderRadius: 8,
        background: '#2d2d2d',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #444', fontWeight: 600 }}>Vertex Shader</div>

      <div style={{ padding: '6px 12px', borderBottom: '1px solid #444' }}>
        <ParamHandle id="amplitude" label="amplitude" onChange={(v) => setAmplitude(v ?? 0.25)} />
        <ParamHandle id="frequency" label="frequency" onChange={(v) => setFrequency(v ?? 4)} />
        <ParamHandle id="speed" label="speed" onChange={(v) => setSpeed(v ?? 1.2)} />
      </div>

      {/* nodrag/nowheel stop React Flow from treating scene interaction (orbit
          drag, zoom wheel) as a node-drag or pane-zoom gesture. */}
      <div ref={canvasWrapRef} className="nodrag nowheel" style={{ height: 220, cursor: 'grab' }}>
        <Canvas style={{ width: 278, height: 220 }} camera={{ position: [0, 2.6, 3.6], fov: 45 }}>
          <WaveMesh amplitude={amplitude} frequency={frequency} speed={speed} />
          {/* The mesh is never repositioned (only rotated), so its center stays
              at the world origin — target there so the camera looks exactly
              at the mesh rather than relying on OrbitControls' implicit default. */}
          <OrbitControls makeDefault target={[0, 0, 0]} />
        </Canvas>
      </div>
    </div>
  )
}
