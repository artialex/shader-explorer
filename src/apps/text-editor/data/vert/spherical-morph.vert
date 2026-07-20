uniform float u_time;

void main() {
    float stretch = 1.0 + sin(u_time * 3.0) * 0.25;
    vec3 pos = position * vec3(1.0 / sqrt(stretch), stretch, 1.0 / sqrt(stretch));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
