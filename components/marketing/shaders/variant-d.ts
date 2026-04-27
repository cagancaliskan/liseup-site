export const fragmentShaderVariantD = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uTint;

  void main() {
    float ar   = uResolution.x / uResolution.y;
    vec2 uv    = vec2(vUv.x * ar, vUv.y);
    vec2 mouse = vec2(uMouse.x * ar, uMouse.y);

    /* ── Grid geometry ── */
    float cellSzX = 0.068 * ar;
    float cellSzY = 0.068;
    vec2 cellSz   = vec2(cellSzX, cellSzY);

    /* Cell index and center in aspect-correct space */
    vec2 cell       = floor(uv / cellSz);
    vec2 cellCenter = (cell + 0.5) * cellSz;

    /* Local [0,1] position inside cell for grid-line drawing */
    vec2 local = fract(uv / cellSz);

    /* ── Base: institutional warm-white surface ── */
    vec3 surface0 = vec3(0.984, 0.984, 0.976);

    /* ── Grid lines: rule-tone overlay ── */
    float lw  = 0.030;                              /* line width as fraction of cell */
    float hLn = step(local.x, lw) + step(1.0 - lw, local.x);
    float vLn = step(local.y, lw) + step(1.0 - lw, local.y);
    float onLine = clamp(hLn + vLn, 0.0, 1.0);

    /* Rule line: ink at ~7% opacity */
    vec3 col = mix(surface0, vec3(0.040, 0.040, 0.043), onLine * 0.072);

    /* ── Cursor cell glow ── */
    /* Per-cell: how close is the cursor to this cell's center? */
    float d = distance(mouse, cellCenter);

    /* Gaussian bloom radius: about 3–4 cells */
    float sigma = cellSzX * 3.2;
    float glow  = exp(-d * d / (sigma * sigma));

    /* brand-600 (#2C5CC8 ≈ uTint) tinted cell fill, additive on surface */
    col = mix(col, uTint, glow * 0.30 * (1.0 - onLine));

    /* Brighter node at exact grid intersections near cursor */
    float node     = (1.0 - smoothstep(0.0, lw * 2.0, local.x)) *
                     (1.0 - smoothstep(0.0, lw * 2.0, local.y));
    float nodeGlow = glow * node * 0.55;
    col = mix(col, vec3(0.780, 0.870, 1.0), nodeGlow);   /* light-blue node dot */

    /* ── Slow breathing: very subtle brightness pulse over time ── */
    float pulse = 0.012 * sin(uTime * 0.55 + d * 3.0);
    col += pulse * uTint;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;
