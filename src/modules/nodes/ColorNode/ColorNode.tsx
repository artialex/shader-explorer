import { Handle, Position, type NodeProps } from "@xyflow/react";

export function ColorNode({ data }: NodeProps<{ color: string }>) {
  return (
    <div
      style={{
        // width: 260,
        border: "1px solid #444",
        borderRadius: 8,
        background: "#2d2d2d",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid #444",
          fontWeight: 600,
        }}
      >
        Color
      </div>
      <input
        type="color"
        value={data.color}
        onChange={(e) => {
          data.color = e.target.value;
        }}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
