uniform float u_time;

void main() {
    vec3 pos = position;

    // Two-stage heartbeat
    float t = fract(u_time * 0.8);

    float beat1 = exp(-80.0 * pow(t - 0.12, 2.0));
    float beat2 = exp(-120.0 * pow(t - 0.28, 2.0));

    float pulse = (beat1 + beat2) * 0.08;

    // Scale from local origin
    pos *= 1.0 + pulse;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
