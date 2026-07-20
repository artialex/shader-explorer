in vec2 v_uv;
out vec4 fragColor;

void main() {
    fragColor = vec4(v_uv.x + 0.45, v_uv.y - 0.1, 0.9, 1.0);
}
