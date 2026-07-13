import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import { useCallback, useState } from "react";

type OutputNodeData = {
  color?: string;
};

export function OutputNode({ data }: NodeProps<OutputNodeData>) {
  const reactFlow = useReactFlow();
  const [count, setCount] = useState(0);
  const countNodes = useCallback(() => {
    setCount(reactFlow.getNodes().length);
    // you need to pass it as a dependency if you are using it with useEffect or useCallback
    // because at the first render, it's not initialized yet and some functions might not work.
  }, [reactFlow]);

  // console.log(getNodes(), getEdges());
  // const edges = getEdges();
  // console.log(edges);

  return (
    <div
      style={{
        width: 260,
        border: "1px solid #444",
        borderRadius: 8,
        background: "#2d2d2d",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Handle type="target" position={Position.Left} />

      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid #444",
          fontWeight: 600,
        }}
      >
        Output
      </div>

      {/* nodrag/nowheel stop React Flow from treating scene interaction (orbit
          drag, zoom wheel) as a node-drag or pane-zoom gesture. */}
      <div
        className="nodrag nowheel"
        style={{
          height: 180,
          cursor: 'grab',
        }}
      >
        <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} />

          <mesh>
            <boxGeometry />
            <meshStandardMaterial color={data.color ?? "orange"} />
          </mesh>

          <gridHelper args={[10, 10]} />

          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </div>
  );
}
