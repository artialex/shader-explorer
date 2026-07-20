uniform float u_time;

void main() {
    vec3 pos = position;
    float dist = length(pos.xy);
    float falloff = 1.0 - smoothstep(0., 1.5, dist);
    pos.z += sin(dist * 8.0 - u_time * 3.0) * 0.15 * falloff;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
