import { memo, useEffect } from 'react'
import { InputHandle, MyNode } from '../../modules/ui/MyNode/MyNode'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, type Vector3Like } from 'three'
import type { Node, NodeProps } from '@xyflow/react'
import { toArray } from '../../modules/toolbelt/three'

type VertexShaderNode = Node<
  {
    value: {
      cameraPosition: Vector3Like
      boxPosition: Vector3Like
    }
  },
  'vertexShader'
>

export const VertexShaderNode = memo((props: NodeProps<VertexShaderNode>) => {
  const width = 300
  const height = 300
  console.log(props.data)

  return (
    <MyNode
      label="Vertex Shader"
      inputs={[
        <InputHandle id="cameraPosition">Camera Position</InputHandle>,
        <InputHandle id="boxPosition">Box Position</InputHandle>,
      ]}
    >
      <div style={{ width, height }}>
        <Canvas camera={{ position: [0.5, 0.5, 5], fov: 45 }}>
          <Scene {...props} />
          <axesHelper />
        </Canvas>
      </div>
    </MyNode>
  )
})

const Scene = memo(({ data }: NodeProps<VertexShaderNode>) => {
  const { camera } = useThree()
  const meshRef = useRef<Mesh>(null)

  useEffect(() => {
    camera.position.set(...toArray(data.value.cameraPosition))
  }, [camera, data.value?.cameraPosition])

  useEffect(() => {
    meshRef.current?.position.set(...toArray(data.value.boxPosition))
  }, [data.value?.boxPosition])

  useFrame((_state, delta) => {
    // Rotates the mesh by delta amount (time) around the Y-axis
    if (meshRef.current) {
      meshRef.current.rotation.y += delta
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 1, 0]}>
      <boxGeometry />
      <meshBasicMaterial />
    </mesh>
  )
})
