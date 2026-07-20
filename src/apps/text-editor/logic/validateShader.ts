// Quick client-side sanity check: compiles the given shader source in a
// throwaway WebGL2 context targeting GLSL ES 3.00, using the same "#version
// 300 es" header, built-in prefix, and attribute/varying compatibility
// macros Three's ShaderMaterial injects for glslVersion={GLSL3}. That's what
// PreviewCanvas actually renders with, so a failure here means the real
// <shaderMaterial> would fail too — which lets the playground show a GLSL
// error instead of the preview silently going blank.
//
// Note this does NOT shim `gl_FragColor`: Three only adds that macro when
// glslVersion is left unset. Since PreviewCanvas passes glslVersion={GLSL3}
// explicitly, fragment shaders must declare their own `out vec4` and write
// to that instead.
const GLSL3_VERSION_HEADER = '#version 300 es\n'

const VERTEX_BUILTIN_PREFIX = [
  '#define attribute in',
  '#define varying out',
  '#define texture2D texture',
  'precision highp float;',
  'uniform mat4 modelMatrix;',
  'uniform mat4 modelViewMatrix;',
  'uniform mat4 projectionMatrix;',
  'uniform mat4 viewMatrix;',
  'uniform mat3 normalMatrix;',
  'uniform vec3 cameraPosition;',
  'in vec3 position;',
  'in vec3 normal;',
  'in vec2 uv;',
  '',
].join('\n')

const FRAGMENT_BUILTIN_PREFIX = [
  'precision highp float;',
  'uniform mat4 viewMatrix;',
  'uniform vec3 cameraPosition;',
  '',
].join('\n')

let ctx: WebGL2RenderingContext | null | undefined

function getValidationContext(): WebGL2RenderingContext | null {
  if (ctx === undefined) {
    ctx = document.createElement('canvas').getContext('webgl2')
  }
  return ctx
}

export type ValidationResult = { ok: true } | { ok: false; error: string }

function compile(gl: WebGL2RenderingContext, type: number, source: string): ValidationResult {
  const shader = gl.createShader(type)
  if (!shader) return { ok: true }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  const log = ok ? '' : (gl.getShaderInfoLog(shader) ?? 'Unknown compile error')
  gl.deleteShader(shader)

  return ok ? { ok: true } : { ok: false, error: log }
}

export function validateVertexShader(source: string): ValidationResult {
  const gl = getValidationContext()
  if (!gl) return { ok: true } // no WebGL available to check with — don't block typing
  return compile(gl, gl.VERTEX_SHADER, GLSL3_VERSION_HEADER + VERTEX_BUILTIN_PREFIX + source)
}

export function validateFragmentShader(source: string): ValidationResult {
  const gl = getValidationContext()
  if (!gl) return { ok: true } // no WebGL available to check with — don't block typing
  return compile(gl, gl.FRAGMENT_SHADER, GLSL3_VERSION_HEADER + FRAGMENT_BUILTIN_PREFIX + source)
}
