export const fragmentShaderVariantA = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform vec3  uTint;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

    float t = uTime * 0.04;

    vec2 c1 = vec2(0.30 * aspect * cos(t * 0.7), 0.30 * sin(t * 0.5));
    vec2 c2 = vec2(0.40 * aspect * sin(t * 0.9 + 1.2), 0.35 * cos(t * 0.6 + 0.5));

    float g1 = smoothstep(0.60, 0.00, length(p - c1));
    float g2 = smoothstep(0.55, 0.00, length(p - c2));

    vec2 mouseP = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5);
    float gm = smoothstep(0.40, 0.00, length(p - mouseP)) * 0.45;

    float intensity = max(max(g1 * 0.55, g2 * 0.45), gm);

    vec3 surface = vec3(0.984, 0.984, 0.976);
    vec3 col = mix(surface, uTint, intensity * 0.55);

    float n = noise(uv * 800.0) * 0.015 - 0.0075;
    col += n;

    gl_FragColor = vec4(col, 1.0);
  }
`;
