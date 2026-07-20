uniform float u_time;

void main() {
    vec3 pos = position;
    float sway = sin(u_time * 2.0) * 0.3;
    float heightFactor = (pos.y + 1.0) * 0.5; // 0 at the bottom, 1 at the top
    pos.x += sway * heightFactor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
