uniform float u_time;

void main() {
    vec3 pos = position;
    pos.z += sin((pos.x + pos.y) * 3.0 + u_time) * 0.15;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
