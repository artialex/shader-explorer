uniform float u_time;

void main() {
    vec3 pos = position;

    // 0 at the pole, 1 at the free end
    float strength = uv.x;

    // Main wave
    float wave =
        sin(uv.x * 5.0 - u_time * 2.5) * 0.12
            + sin(uv.x * 12.0 - u_time * 5.0) * 0.04;

    // Small flutter
    wave += sin(uv.y * 18. + u_time * 8.) * 0.02;

    // Fade movement toward the pole
    wave *= strength * strength;

    // Bend in the Z direction
    pos.z += wave;

    // Slight horizontal stretch/compression
    pos.x += wave * .1;

    // Slight vertical ripple
    pos.y += wave * .05;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
