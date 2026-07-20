uniform float u_time;

void main() {
    float gridStep = 0.15 + sin(u_time) * 0.05;
    vec3 pos = floor(position / gridStep) * gridStep;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
