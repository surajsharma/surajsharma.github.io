// CRT_CURVE:    Screen curvature. 0.0 = flat, 0.04 = strong bend.
#define CRT_CURVE     0.0
//
// BRIGHTNESS:   Overall brightness multiplier.
#define BRIGHTNESS    1.3
//
// DISTORTION:   Wobble, jitter, tracking band, frame jump, static burst.
//               0.0 = clean signal, 1.0 = normal, 2.0 = heavy.
#define DISTORTION    2.0
//
// TAPE_WEAR:    Grain, noise, dropout, head-switch, warm shift.
//               0.0 = pristine tape, 1.0 = normal, 2.0 = trashed.
#define TAPE_WEAR     2.0
//
// COLOR_BLEED:  Chroma smearing. 0.0 = perfect color, 1.0 = normal, 2.0 = heavy.
#define COLOR_BLEED   2.0
//
// VIGNETTE:     Corner darkening. 0.0 = none, 0.3 = light, 0.8 = heavy.
#define VIGNETTE      0.25
//
// STATIC:       Persistent white static flecks. 0.0 = none, 0.5 = subtle, 1.0 = normal.
#define STATIC        0.1
//
// =========================================

float hash(vec2 p) {
    p = fract(p * vec2(443.8975, 397.2973));
    float h = dot(p, p + vec2(19.19, 19.19));
    p = p + vec2(h, h);
    return fract(p.x * p.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;

    // CRT barrel distortion
    vec2 cc = uv - vec2(0.5, 0.5);
    float cr = dot(cc, cc) * CRT_CURVE;
    vec2 wuv = clamp(uv + cc * vec2(cr, cr), 0.0, 1.0);

    // --- Signal distortion ---

    wuv.x += (sin(wuv.y * 40.0 + iTime * 0.5) * 0.000375
            + sin(wuv.y * 80.0 + iTime * 0.2) * 0.0001875
            + (hash(vec2(floor(fragCoord.y), floor(iTime * 20.0))) - 0.5) * 0.0006) * DISTORTION;

    // Tracking band
    float tracking_y = fract(iTime * 0.04);
    float band = smoothstep(0.05, 0.0, min(abs(wuv.y - tracking_y), 1.0 - abs(wuv.y - tracking_y)));
    float h_offset = band * (hash(vec2(floor(fragCoord.y), floor(iTime * 20.0))) - 0.5) * 0.006 * DISTORTION;

    // Static burst (5s window every ~30s)
    float burst_cycle = floor(iTime / 30.0);
    float burst_start = hash(vec2(burst_cycle, 88.0)) * 25.0;
    float burst_time = mod(iTime, 30.0);
    bool burst_active = burst_time > burst_start && burst_time < burst_start + 5.0;

    // Frame jump (burst-only)
    float jump_seed = floor(iTime * 2.0);
    float jump_offset = burst_active ? (hash(vec2(jump_seed, 11.3)) - 0.5) * 0.08 * DISTORTION : 0.0;

    vec2 sample_uv = fract(wuv + vec2(h_offset, jump_offset));

    // --- Color sampling (5 texture fetches) ---

    float aberr = (0.0003 + band * 0.0015) * COLOR_BLEED;
    vec3 color;
    color.r = texture(iChannel0, sample_uv + vec2(aberr, 0.0)).r;
    color.g = texture(iChannel0, sample_uv).g;
    color.b = texture(iChannel0, sample_uv - vec2(aberr, 0.0)).b;

    // Rightward-only neighborhood (VHS only smears right)
    float px = 1.0 / iResolution.x;
    vec3 s_r1 = texture(iChannel0, sample_uv + vec2(px, 0.0)).rgb;
    vec3 s_r2 = texture(iChannel0, sample_uv + vec2(px * 3.0, 0.0)).rgb;

    // Color bleed
    vec3 nb = s_r1 * vec3(0.4, 0.4, 0.4) + s_r2 * vec3(0.6, 0.6, 0.6);
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    float nbLuma = dot(nb, vec3(0.299, 0.587, 0.114));
    color = vec3(luma, luma, luma) + mix(color - vec3(luma, luma, luma), nb - vec3(nbLuma, nbLuma, nbLuma), 0.5 * COLOR_BLEED);

    // --- Tape artifacts ---

    if (burst_active) {
        float bm = smoothstep(0.7, 0.95, wuv.y);
        if (bm > 0.0) {
            float t = fract(iTime * 43.0);
            float pull = (hash(vec2(floor(fragCoord.y), t * 100.0)) - 0.5) * 0.02 * DISTORTION;
            vec2 sc = vec2(floor((fragCoord.x + pull * iResolution.x) / 10.0), fragCoord.y);
            color = mix(color, vec3(1.0), step(0.93, fract(sin(dot(sc, vec2(12.9898 + t, 78.233 + t))) * 43758.5453)) * bm * 0.4 * DISTORTION);
        }
    }

    if (jump_offset == 0.0 && wuv.y > 0.97) {
        float hs = smoothstep(0.98, 1.0, wuv.y);
        float f = hs * (hash(vec2(fragCoord.x, floor(iTime * 15.0))) * 2.0 - 1.0) * 0.15 * TAPE_WEAR;
        color = color + vec3(f, f, f);
    }

    float dr = floor(fragCoord.y / 3.0);
    float dt = floor(iTime * 10.0);
    if (hash(vec2(dr, dt)) > 1.0 - 0.003 * TAPE_WEAR) {
        float dx = hash(vec2(dr, dt + 1.0));
        if (wuv.x > dx && wuv.x < dx + hash(vec2(dr, dt + 2.0)) * 0.15)
            color = mix(color, vec3(1.0), 0.05 * TAPE_WEAR);
    }

    // --- Post-processing ---

    color = color * vec3(BRIGHTNESS, BRIGHTNESS, BRIGHTNESS);

    float tg = fract(iTime);
    float cn1 = hash(fragCoord.xy + vec2(tg * 100.0, tg * 100.0)) - 0.5;
    float cn2 = hash(fragCoord.xy + vec2(tg * 200.0, tg * 200.0)) - 0.5;
    float gl = dot(color, vec3(0.299, 0.587, 0.114));
    float grain = 0.15 * TAPE_WEAR;
    color = color + (color - vec3(gl, gl, gl)) * (vec3(cn1, cn2, -cn1) * vec3(grain, grain, grain));

    float extra = cn1 * 0.05 * TAPE_WEAR;
    color = color + vec3(extra, extra, extra);

    color = color * mix(vec3(1.0), vec3(1.03, 1.01, 0.96), TAPE_WEAR);

    vec2 vig = uv * (1.0 - uv);
    float vigAmt = mix(1.0, clamp((jump_offset != 0.0) ? vig.x * 4.0 : vig.x * vig.y * 15.0, 0.0, 1.0), VIGNETTE);
    color = color * vec3(vigAmt, vigAmt, vigAmt);

    float st = fract(iTime * 20.0);
    color = mix(color, vec3(1.0), step(1.0 - 0.001 * STATIC, hash(vec2(floor(fragCoord.x / 10.0), floor(fragCoord.y / 2.0) + st * 500.0) + vec2(st * 77.0, st * 77.0))) * 0.15 * STATIC);

    // Preserve the background alpha channel (which carries the window
    // background-opacity) instead of forcing alpha to 1.0, so that the
    // window background transparency configured via `background-opacity`
    // is kept while the custom shader is applied.
    // Render at partial alpha so the underlying page background shows through.
    vec4 final_color = vec4(0.0, 0.0, 0.0, 1.0);
    final_color.rgb = color.rgb;
    final_color.a = texture(iChannel0, uv).a * 0.1;
    fragColor = final_color;
}
