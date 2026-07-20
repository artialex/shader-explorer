// Compiles the node graph into a real GLSL vertex shader by topologically
// sorting it via DFS, starting from the output ('vsstring') node and walking
// backwards through its dependencies. Every visited node becomes exactly one
// declared GLSL variable, emitted in dependency order — so unlike the old
// approach (which glued expression strings together, e.g. embedding the
// literal text "u_time" straight into a sine expression), a node's code can
// never appear before the nodes it depends on, and a uniform is only
// declared when a node that actually needs it is present in the graph.

const DEFAULT_HANDLE = '__default__'

// GLSL identifiers can't contain hyphens (our node ids can, e.g. "sine-1").
function toVarName(nodeId) {
  return `node_out_${nodeId.replace(/[^a-zA-Z0-9_]/g, '_')}`
}

function fmt(n) {
  return Number.isFinite(n) ? n.toFixed(2) : '0.00'
}

// Per-node-type codegen: given the node and its already-resolved input
// variable names (keyed by targetHandle), return the single GLSL statement
// for this node and register any uniforms it needs.
function codegenNode(node, varName, inputs, uniforms) {
  switch (node.type) {
    case 'time':
      uniforms.add('uniform float u_time;')
      return `float ${varName} = u_time;`

    case 'vector3': {
      const v = node.data.value ?? { x: 0, y: 0, z: 0 }
      return `vec3 ${varName} = vec3(${fmt(v.x)}, ${fmt(v.y)}, ${fmt(v.z)});`
    }

    case 'uv': {
      // `uv` is a built-in vertex attribute Three's ShaderMaterial declares
      // automatically (like `position`) — no uniform needed. `component`
      // picks which axis of the UV coordinate feeds the rest of the graph.
      const component = node.data.component ?? 'x'
      return `float ${varName} = uv.${component};`
    }

    case 'sineWave': {
      const time = inputs.time ?? '0.0'
      const amplitude = fmt(node.data.amplitude ?? 1)
      const frequency = fmt(node.data.frequency ?? 1)
      return `float ${varName} = sin(${time} * ${frequency}) * ${amplitude};`
    }

    default:
      // Not every node type participates in shader codegen (e.g. Color, Log,
      // Plane). Rather than crash the whole compile, fall back to a no-op.
      throw new Error(`no GLSL codegen for node type "${node.type}"`)
  }
}

// nodesById: Map<id, node>. edges: full edge list. rootId: the 'vsstring'
// node to compile from.
export function compileVertexShader(nodesById, edges, rootId) {
  const lines = []
  const uniforms = new Set()
  const visited = new Set() // nodeIds already compiled — reuse their variable, don't re-emit

  function resolveInputs(nodeId) {
    const incoming = edges.filter((e) => e.target === nodeId)
    const inputs: Record<string, string> = {}
    for (const edge of incoming) {
      inputs[edge.targetHandle ?? DEFAULT_HANDLE] = traverse(edge.source)
    }
    return inputs
  }

  function traverse(nodeId) {
    const varName = toVarName(nodeId)
    if (visited.has(nodeId)) return varName // already compiled — and guards against cycles
    visited.add(nodeId)

    const node = nodesById.get(nodeId)
    if (!node) return '0.0' // dangling edge (source node was deleted)

    // Depth-first: every input this node depends on gets compiled — and its
    // line pushed onto `lines` — before this node's own line is pushed.
    const inputs = resolveInputs(nodeId)

    try {
      lines.push(codegenNode(node, varName, inputs, uniforms))
      return varName
    } catch {
      lines.push(`// skipped unsupported node "${node.type}" (${nodeId})`)
      return '0.0'
    }
  }

  const rootNode = nodesById.get(rootId)
  const rootInputs = resolveInputs(rootId)
  const axis = rootNode?.data.axis ?? 'y'
  const displacement = rootInputs.displacement ?? '0.0'

  lines.push('vec3 transformed = position;')
  lines.push(`transformed.${axis} += ${displacement};`)
  lines.push('gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);')

  const uniformBlock = [...uniforms].join('\n')
  const body = lines.map((l) => `  ${l}`).join('\n')

  return [uniformBlock, uniformBlock ? '' : null, 'void main() {', body, '}']
    .filter((part) => part !== null)
    .join('\n')
}
