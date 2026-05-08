export const fragmentShaderVariantB = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uTint;

  /* Geometric ripple rings centered at a point with decay */
  float rings(vec2 uv, vec2 center, float t, float speed, float freq, float decay) {
    float d = distance(uv, center);
    float wave = sin(d * freq - t * speed);
    return wave * exp(-d * decay);
  }

  /* Simple hash */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 res  = uResolution;
    float ar  = res.x / res.y;
    vec2 uv   = vec2(vUv.x * ar, vUv.y);
    vec2 mouse = vec2(uMouse.x * ar, uMouse.y);

    /* ── Background: deep ink-to-navy gradient ── */
    float grad = smoothstep(0.0, 1.0, vUv.y);
    vec3 ink   = vec3(0.040, 0.040, 0.043);        /* #0A0A0B */
    vec3 navy  = uTint * 0.72;                      /* brand-700 shifted dark */
    vec3 base  = mix(ink, navy, grad * 0.55);

    /* ── Slow ambient ring sources ── */
    float r1 = rings(uv, vec2(ar * 0.22, 0.30), uTime, 0.60, 9.0, 3.5);
    float r2 = rings(uv, vec2(ar * 0.78, 0.70), uTime, 0.45, 7.0, 2.8);
    float ambient = (r1 + r2) * 0.5;               /* –1 → +1 */

    /* ── Cursor ripple: fast burst, tight decay ── */
    float d = distance(uv, mouse);
    float cursor = sin(d * 26.0 - uTime * 7.0) * exp(-d * 10.0);

    /* ── Colour layers ── */
    /* brand-300 highlight (#99BAF4) used at crest of cursor wave */
    vec3 brand300  = vec3(0.600, 0.729, 0.957);
    /* brand-600 for ambient ring crests */
    vec3 brand600  = uTint;

    /* Ambient rings lift colour slightly */
    float ambientPos = clamp(ambient * 0.5, 0.0, 1.0);
    vec3 col = mix(base, brand600, ambientPos * 0.28);

    /* Cursor adds bright-crest highlights */
    float cursorPos = clamp(cursor, 0.0, 1.0);
    col = mix(col, brand300, cursorPos * 0.45);

    /* ── Subtle radial vignette (darkens corners) ── */
    float vign = 1.0 - dot((vUv - 0.5) * 1.6, (vUv - 0.5) * 1.6);
    col *= 0.78 + 0.22 * clamp(vign, 0.0, 1.0);

    /* ── Micro grain ── */
    float grain = (hash(vUv + fract(uTime * 0.041)) - 0.5) * 0.018;
    col += grain;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;
