uniform float u_time;

void main() {
    vec3 pos = position;
    vec3 spherePos = normalize(pos) * 1.3; // same direction, pulled onto a sphere
    float t = sin(u_time) * 0.5 + 0.5; // oscillates 0..1
    vec3 morphed = mix(pos, spherePos, t);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(morphed, 1.0);
}
