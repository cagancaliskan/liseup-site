export const fragmentShaderVariantC = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uTint;

  /* Smooth Gaussian blob, soft organic edges */
  float blob(vec2 uv, vec2 center, float sigma) {
    vec2 d = uv - center;
    return exp(-dot(d, d) / (sigma * sigma));
  }

  /* Value noise for organic warp */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),           hash(i + vec2(1, 0)), u.x),
      mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x),
      u.y
    );
  }

  void main() {
    float ar  = uResolution.x / uResolution.y;
    vec2 uv   = vec2(vUv.x * ar, vUv.y);
    vec2 mouse = vec2(uMouse.x * ar, uMouse.y);

    float t = uTime * 0.28;

    /* ── Primary blob drifts organically ── */
    vec2 n  = vec2(noise(vec2(t * 0.4, 0.3)), noise(vec2(0.7, t * 0.35)));
    vec2 b1 = vec2(ar * 0.42, 0.50) + (n - 0.5) * vec2(ar * 0.18, 0.22);

    /* ── Magnetic pull: cursor drags blob center ── */
    float magnetSigma = 0.55 * ar;
    float attract = exp(-dot(mouse - b1, mouse - b1) / (magnetSigma * magnetSigma));
    b1 = mix(b1, mouse, attract * 0.42);

    /* ── Secondary accent blob (slower, smaller, offset) ── */
    vec2 n2 = vec2(noise(vec2(t * 0.25 + 4.1, 1.2)), noise(vec2(2.9, t * 0.32 + 0.8)));
    vec2 b2  = vec2(ar * 0.68, 0.38) + (n2 - 0.5) * vec2(ar * 0.14, 0.18);

    /* ── Blob intensities ── */
    float f1 = blob(uv, b1, 0.38 * ar);   /* large primary */
    float f2 = blob(uv, b2, 0.22 * ar);   /* smaller accent */

    /* ── Colour palette ── */
    /* surface-0 warm canvas */
    vec3 surface0 = vec3(0.984, 0.984, 0.976);

    /* brand-400 (#6A9FEB) base tint */
    vec3 blobBase = uTint;                                 /* (0.416, 0.620, 0.921) */

    /* Warm-violet hue shift for the accent blob */
    vec3 blobWarm = mix(uTint, vec3(0.55, 0.52, 1.0), 0.28);

    /* ── Compose ── */
    vec3 col = surface0;
    col = mix(col, blobBase, f1 * 0.44);   /* primary blob, soft opacity */
    col = mix(col, blobWarm, f2 * 0.32);   /* accent blob, warmer tint */

    /* ── Subtle grain for softness ── */
    float grain = (hash(vUv + fract(uTime * 0.031)) - 0.5) * 0.014;
    col += grain;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;
