uniform float u_time;

float hash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
}

void main() {
    vec3 pos = position;
    float n = hash(pos + u_time * 0.3) * 2.0 - 1.0; // pseudo-random per vertex, shifts each frame
    pos += normal * n * 0.05;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
