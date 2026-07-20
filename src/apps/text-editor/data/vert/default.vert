uniform float u_time;

void main() {
    vec3 transformed = position;
    transformed.z += sin(transformed.x * 3.0 + u_time) * 0.15;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
