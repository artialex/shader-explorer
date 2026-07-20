uniform float u_time;

void main() {
    vec3 pos = position;

    float strength = 2.0;
    float angle = pos.y * strength * sin(u_time);

    float s = sin(angle);
    float c = cos(angle);

    mat2 rotation = mat2(c, -s, s, c);

    pos.xz = rotation * pos.xz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
