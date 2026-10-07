import { useEffect, useRef, type RefObject } from "react";

/**
 * Edit these values to tune the effect.
 * Sizes are radii in CSS px; durations in ms; forces are per 60fps frame.
 */
const PARTICLE_CONFIG = {
  /** Particle budget per breakpoint (the sampler adapts cell size to hit it). */
  count: { mobile: 4000, tablet: 7000, desktop: 12000 },
  breakpoints: { tablet: 768, desktop: 1200 },

  minSize: 0.8,
  maxSize: 9,
  /** Dot radius as a fraction of the pixel cell it represents (≥0.71 leaves no gaps). */
  sizeFill: 0.74,
  /** Dots shrink to this fraction of their size while far from home. */
  flightSize: 0.45,

  /** Speed: how long each act of the intro lasts. */
  holdDuration: 450,
  disperseDuration: 1200,
  floatDuration: 600,
  formationDuration: 2200,

  scatterSpeed: 9.5,
  friction: 0.962,
  swirl: 0.035,
  spring: 0.024,
  damping: 0.86,

  /** Cursor interaction. */
  mouseRadius: 120,
  mouseStrength: 0.4,

  /** Idle drift amplitude (px) once the photo is rebuilt. */
  idleMovement: 0.35,
  idleSpeed: 0.0011,

  /** Luminance std-dev above which a cell is split into 4 finer dots. */
  detailThreshold: 13,
  alphaThreshold: 0.06,
  maxDpr: 2,
  /** Opacity of the untouched photo before it breaks apart. */
  backgroundOpacity: 1,
};

type Mask = { solid: number; clear: number };

type Props = {
  imageRef: RefObject<HTMLImageElement>;
  containerRef: RefObject<HTMLElement>;
  interactionRef: RefObject<HTMLElement>;
  mask: Mask;
  onActiveChange: (active: boolean) => void;
};

type Geometry = { w: number; h: number; left: number; top: number; imgW: number; imgH: number };

type Seed = { x: number; y: number; cell: number; r: number; g: number; b: number; a: number };

type Field = {
  n: number;
  x: Float32Array;
  y: Float32Array;
  tx: Float32Array;
  ty: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  r: Float32Array;
  cell: Float32Array;
  release: Float32Array;
  ret: Float32Array;
  phase: Float32Array;
  swirl: Float32Array;
  color: Uint8Array;
};

type Renderer = {
  setField: (f: Field) => void;
  resize: (w: number, h: number, dpr: number) => void;
  draw: (f: Field, size: Float32Array) => void;
  dispose: () => void;
};

const MAX_SAMPLE_PIXELS = 650_000;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const measure = (img: HTMLImageElement, container: HTMLElement): Geometry => {
  const c = container.getBoundingClientRect();
  const i = img.getBoundingClientRect();
  const scale = c.width / container.offsetWidth || 1;
  return {
    w: container.offsetWidth,
    h: container.offsetHeight,
    left: (i.left - c.left) / scale,
    top: (i.top - c.top) / scale,
    imgW: i.width / scale,
    imgH: i.height / scale,
  };
};

const budgetFor = (width: number) => {
  const { count, breakpoints } = PARTICLE_CONFIG;
  if (width >= breakpoints.desktop) return count.desktop;
  if (width >= breakpoints.tablet) return count.tablet;
  return count.mobile;
};

/** Samples the photo into seeds: finer cells where there is detail, coarser where it is flat. */
const sample = (img: HTMLImageElement, g: Geometry, mask: Mask, budget: number): Seed[] => {
  const visLeft = Math.max(0, g.left);
  const visTop = Math.max(0, g.top);
  const visRight = Math.min(g.w, g.left + g.imgW);
  const visBottom = Math.min(g.h, g.top + g.imgH * mask.clear);
  const visW = visRight - visLeft;
  const visH = visBottom - visTop;
  if (visW <= 1 || visH <= 1) return [];

  const s = Math.min(1, Math.sqrt(MAX_SAMPLE_PIXELS / (visW * visH)));
  const cw = Math.max(1, Math.round(visW * s));
  const ch = Math.max(1, Math.round(visH * s));
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  const srcScale = img.naturalWidth / g.imgW;
  ctx.drawImage(
    img,
    (visLeft - g.left) * srcScale,
    (visTop - g.top) * srcScale,
    visW * srcScale,
    visH * srcScale,
    0,
    0,
    cw,
    ch,
  );
  const data = ctx.getImageData(0, 0, cw, ch).data;

  const lum = new Float32Array(cw * ch);
  const alpha = new Float32Array(cw * ch);
  let opaque = 0;
  for (let y = 0; y < ch; y++) {
    const yRel = (visTop + y / s - g.top) / g.imgH;
    const m = Math.min(1, Math.max(0, (mask.clear - yRel) / (mask.clear - mask.solid)));
    for (let x = 0; x < cw; x++) {
      const i = y * cw + x;
      const a = (data[i * 4 + 3] / 255) * m;
      alpha[i] = a;
      lum[i] = 0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2];
      if (a > PARTICLE_CONFIG.alphaThreshold) opaque++;
    }
  }

  const build = (h: number) => {
    const nx = Math.ceil(cw / h);
    const ny = Math.ceil(ch / h);
    const len = nx * ny;
    const sa = new Float32Array(len);
    const sr = new Float32Array(len);
    const sg = new Float32Array(len);
    const sb = new Float32Array(len);
    const sl = new Float32Array(len);
    const sl2 = new Float32Array(len);
    const sn = new Float32Array(len);
    for (let y = 0; y < ch; y++) {
      const row = Math.floor(y / h) * nx;
      for (let x = 0; x < cw; x++) {
        const i = y * cw + x;
        const c = row + Math.floor(x / h);
        const a = alpha[i];
        sa[c] += a;
        sr[c] += data[i * 4] * a;
        sg[c] += data[i * 4 + 1] * a;
        sb[c] += data[i * 4 + 2] * a;
        sl[c] += lum[i] * a;
        sl2[c] += lum[i] * lum[i] * a;
        sn[c] += 1;
      }
    }

    const seeds: Seed[] = [];
    const emit = (cells: number[], size: number, cx: number, cy: number) => {
      let a = 0, r = 0, gg = 0, b = 0, n = 0;
      for (const c of cells) {
        a += sa[c]; r += sr[c]; gg += sg[c]; b += sb[c]; n += sn[c];
      }
      const cover = n ? a / n : 0;
      if (cover < PARTICLE_CONFIG.alphaThreshold || a <= 0) return;
      const jitter = size * 0.12;
      seeds.push({
        x: visLeft + (cx + (Math.random() - 0.5) * jitter) / s,
        y: visTop + (cy + (Math.random() - 0.5) * jitter) / s,
        cell: size / s,
        r: r / a,
        g: gg / a,
        b: b / a,
        a: Math.min(1, cover),
      });
    };

    for (let by = 0; by < ny; by += 2) {
      for (let bx = 0; bx < nx; bx += 2) {
        const quad: number[] = [];
        for (let dy = 0; dy < 2; dy++)
          for (let dx = 0; dx < 2; dx++)
            if (bx + dx < nx && by + dy < ny) quad.push((by + dy) * nx + bx + dx);
        let a = 0, l = 0, l2 = 0, minCover = 1, maxCover = 0;
        for (const c of quad) {
          a += sa[c]; l += sl[c]; l2 += sl2[c];
          const cover = sn[c] ? sa[c] / sn[c] : 0;
          minCover = Math.min(minCover, cover);
          maxCover = Math.max(maxCover, cover);
        }
        if (maxCover < PARTICLE_CONFIG.alphaThreshold) continue;
        const mean = a ? l / a : 0;
        const std = a ? Math.sqrt(Math.max(0, l2 / a - mean * mean)) : 0;
        const isEdge = minCover < PARTICLE_CONFIG.alphaThreshold;
        if (std > PARTICLE_CONFIG.detailThreshold || isEdge) {
          for (const c of quad) {
            const qx = c % nx, qy = Math.floor(c / nx);
            emit([c], h, (qx + 0.5) * h, (qy + 0.5) * h);
          }
        } else {
          emit(quad, h * 2, (bx + 1) * h, (by + 1) * h);
        }
      }
    }
    return seeds;
  };

  let h = Math.max(1, Math.sqrt(opaque / budget) * 0.75);
  let seeds = build(h);
  for (let i = 0; i < 6; i++) {
    const ratio = seeds.length / budget;
    if (ratio > 0.92 && ratio < 1.08) break;
    h = Math.max(1, h * Math.sqrt(ratio));
    seeds = build(h);
  }
  return seeds;
};

const createField = (seeds: Seed[]): Field => {
  const n = seeds.length;
  const f: Field = {
    n,
    x: new Float32Array(n),
    y: new Float32Array(n),
    tx: new Float32Array(n),
    ty: new Float32Array(n),
    vx: new Float32Array(n),
    vy: new Float32Array(n),
    r: new Float32Array(n),
    cell: new Float32Array(n),
    release: new Float32Array(n),
    ret: new Float32Array(n),
    phase: new Float32Array(n),
    swirl: new Float32Array(n),
    color: new Uint8Array(n * 4),
  };

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of seeds) {
    minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
  }
  // Focal point ≈ the face: horizontal centre, upper third of the figure.
  const fx = (minX + maxX) / 2;
  const fy = minY + (maxY - minY) * 0.35;
  const maxDist = Math.hypot(Math.max(fx - minX, maxX - fx), Math.max(fy - minY, maxY - fy)) || 1;
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const { disperseDuration, formationDuration, sizeFill, minSize, maxSize } = PARTICLE_CONFIG;

  for (let i = 0; i < n; i++) {
    const p = seeds[i];
    f.tx[i] = f.x[i] = p.x;
    f.ty[i] = f.y[i] = p.y;
    f.cell[i] = p.cell;
    f.r[i] = Math.min(maxSize, Math.max(minSize, p.cell * sizeFill));
    f.phase[i] = Math.random() * Math.PI * 2;
    f.swirl[i] = (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.6);
    f.color[i * 4] = p.r;
    f.color[i * 4 + 1] = p.g;
    f.color[i * 4 + 2] = p.b;
    f.color[i * 4 + 3] = p.a * 255;

    // Break-up sweeps diagonally from the top-right with organic jitter.
    const sweep = ((p.x - minX) / spanX) * -0.45 + ((p.y - minY) / spanY) * 0.55 + 0.45;
    f.release[i] = (sweep * 0.7 + Math.random() * 0.3) * disperseDuration * 0.65;

    // Rebuild starts at the face and grows outwards; stragglers arrive late.
    const d = Math.hypot(p.x - fx, p.y - fy) / maxDist;
    const straggler = Math.random() < 0.06 ? Math.random() * 0.25 : 0;
    f.ret[i] = (d * 0.6 + Math.random() * 0.18 + straggler) * formationDuration * 0.7;
  }
  return f;
};

const VERT = `
attribute vec2 a_pos;
attribute float a_size;
attribute vec4 a_color;
uniform vec2 u_res;
uniform float u_dpr;
varying vec4 v_color;
void main() {
  vec2 clip = a_pos / u_res * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = a_size * 2.0 * u_dpr;
  v_color = a_color;
}`;

const FRAG = `
precision mediump float;
varying vec4 v_color;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = v_color.a * smoothstep(0.5, 0.45, d);
  if (a <= 0.0) discard;
  gl_FragColor = vec4(v_color.rgb * a, a);
}`;

const createGLRenderer = (canvas: HTMLCanvasElement): Renderer | null => {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
  if (!gl) return null;
  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const aPos = gl.getAttribLocation(prog, "a_pos");
  const aSize = gl.getAttribLocation(prog, "a_size");
  const aColor = gl.getAttribLocation(prog, "a_color");
  const uRes = gl.getUniformLocation(prog, "u_res");
  const uDpr = gl.getUniformLocation(prog, "u_dpr");
  const posBuf = gl.createBuffer();
  const sizeBuf = gl.createBuffer();
  const colorBuf = gl.createBuffer();
  let pos = new Float32Array(0);

  return {
    setField: (f) => {
      pos = new Float32Array(f.n * 2);
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf);
      gl.bufferData(gl.ARRAY_BUFFER, f.color, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aColor);
      gl.vertexAttribPointer(aColor, 4, gl.UNSIGNED_BYTE, true, 0, 0);
    },
    resize: (w, h, dpr) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uDpr, dpr);
    },
    draw: (f, size) => {
      for (let i = 0; i < f.n; i++) {
        pos[i * 2] = f.x[i];
        pos[i * 2 + 1] = f.y[i];
      }
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
      gl.bufferData(gl.ARRAY_BUFFER, size, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aSize);
      gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, f.n);
    },
    dispose: () => {
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(sizeBuf);
      gl.deleteBuffer(colorBuf);
      gl.deleteProgram(prog);
    },
  };
};

/** Fallback when WebGL is unavailable: same dots through the 2D API. */
const create2DRenderer = (canvas: HTMLCanvasElement): Renderer | null => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let fills: string[] = [];
  let w = 0;
  let h = 0;
  return {
    setField: (f) => {
      fills = Array.from({ length: f.n }, (_, i) => {
        const c = f.color;
        return `rgba(${c[i * 4]},${c[i * 4 + 1]},${c[i * 4 + 2]},${(c[i * 4 + 3] / 255).toFixed(3)})`;
      });
    },
    resize: (cw, ch, dpr) => {
      w = cw;
      h = ch;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    },
    draw: (f, size) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < f.n; i++) {
        if (size[i] <= 0) continue;
        ctx.fillStyle = fills[i];
        ctx.beginPath();
        ctx.arc(f.x[i], f.y[i], size[i], 0, Math.PI * 2);
        ctx.fill();
      }
    },
    dispose: () => undefined,
  };
};

const HeroParticles = ({ imageRef, containerRef, interactionRef, mask, onActiveChange }: Props) => {
  const photoCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const photoCanvas = photoCanvasRef.current;
    const img = imageRef.current;
    const container = containerRef.current;
    const area = interactionRef.current;
    if (!canvas || !photoCanvas || !img || !container || !area) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const renderer = createGLRenderer(canvas) ?? create2DRenderer(canvas);
    const photoCtx = photoCanvas.getContext("2d");
    if (!renderer || !photoCtx) return;

    const cfg = PARTICLE_CONFIG;
    let field: Field | null = null;
    let geom: Geometry | null = null;
    let sizes = new Float32Array(0);
    let released = new Uint8Array(0);
    let photoVisible = false;
    let dpr = 1;
    let start = 0;
    let introDone = false;
    let raf = 0;
    let last = 0;
    let lastDraw = 0;
    let visible = true;
    let disposed = false;
    let resizeTimer = 0;
    const mouse = { x: 0, y: 0, active: false };

    const timeline = {
      disperseEnd: cfg.holdDuration + cfg.disperseDuration,
      returnStart: cfg.holdDuration + cfg.disperseDuration + cfg.floatDuration,
      end: cfg.holdDuration + cfg.disperseDuration + cfg.floatDuration + cfg.formationDuration * 1.35,
    };

    const paintPhoto = (g: Geometry) => {
      photoCanvas.width = canvas.width;
      photoCanvas.height = canvas.height;
      photoCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      photoCtx.drawImage(img, g.left, g.top, g.imgW, g.imgH);
      const grad = photoCtx.createLinearGradient(0, g.top, 0, g.top + g.imgH);
      grad.addColorStop(mask.solid, "rgba(0,0,0,1)");
      grad.addColorStop(mask.clear, "rgba(0,0,0,0)");
      photoCtx.globalCompositeOperation = "destination-in";
      photoCtx.fillStyle = grad;
      photoCtx.fillRect(0, 0, g.w, g.h);
      photoCtx.globalCompositeOperation = "source-over";
      photoCanvas.style.opacity = String(cfg.backgroundOpacity);
      photoVisible = true;
    };

    const hidePhoto = () => {
      photoVisible = false;
      photoCanvas.style.opacity = "0";
      photoCanvas.width = photoCanvas.height = 0;
    };

    const setup = (replay: boolean) => {
      geom = measure(img, container);
      dpr = Math.min(window.devicePixelRatio || 1, geom.w < cfg.breakpoints.tablet ? 1.5 : cfg.maxDpr);
      canvas.width = Math.round(geom.w * dpr);
      canvas.height = Math.round(geom.h * dpr);
      renderer.resize(geom.w, geom.h, dpr);

      const seeds = sample(img, geom, mask, budgetFor(window.innerWidth));
      if (!seeds.length) return false;
      field = createField(seeds);
      renderer.setField(field);
      sizes = new Float32Array(field.n);
      released = new Uint8Array(field.n);

      if (replay) {
        introDone = false;
        paintPhoto(geom);
        start = performance.now();
      } else {
        introDone = true;
        released.fill(1);
        hidePhoto();
      }
      return true;
    };

    const step = (now: number) => {
      raf = 0;
      if (disposed || !visible || !field || !geom) return;
      const f = field;
      const t = now - start;
      const dt = Math.min(3, (now - (last || now)) / 16.667) || 1;
      last = now;

      // Idle with no pointer: 30fps is plenty for the micro drift.
      if (introDone && !mouse.active && now - lastDraw < 32) {
        raf = requestAnimationFrame(step);
        return;
      }
      lastDraw = now;

      const friction = Math.pow(cfg.friction, dt);
      const damping = Math.pow(cfg.damping, dt);
      const R = cfg.mouseRadius;
      const R2 = R * R;
      const cx = geom.left + geom.imgW / 2;
      const cy = geom.top + geom.imgH * 0.3;
      const shrink = 1 - cfg.flightSize;

      for (let i = 0; i < f.n; i++) {
        if (!released[i]) {
          if (introDone || t < cfg.holdDuration + f.release[i]) {
            sizes[i] = introDone ? f.r[i] : 0;
            if (!introDone) continue;
          } else {
            released[i] = 1;
            if (photoVisible) {
              const c = f.cell[i];
              photoCtx.clearRect(f.tx[i] - c / 2 - 0.5, f.ty[i] - c / 2 - 0.5, c + 1, c + 1);
            }
            const ang = Math.atan2(f.ty[i] - cy, f.tx[i] - cx) + (Math.random() - 0.5) * 2.2;
            const speed = cfg.scatterSpeed * (0.25 + Math.random() * 0.9);
            f.vx[i] = Math.cos(ang) * speed + 1.2;
            f.vy[i] = Math.sin(ang) * speed - 0.8;
          }
        }

        if (introDone || t >= timeline.returnStart + f.ret[i]) {
          const ramp = introDone ? 1 : easeOutCubic(Math.min(1, (t - timeline.returnStart - f.ret[i]) / 900));
          const k = cfg.spring * ramp;
          let ox = 0;
          let oy = 0;
          if (introDone) {
            ox = Math.sin(now * cfg.idleSpeed + f.phase[i]) * cfg.idleMovement;
            oy = Math.cos(now * cfg.idleSpeed * 0.9 + f.phase[i]) * cfg.idleMovement;
          }
          f.vx[i] = (f.vx[i] + (f.tx[i] + ox - f.x[i]) * k * dt) * damping;
          f.vy[i] = (f.vy[i] + (f.ty[i] + oy - f.y[i]) * k * dt) * damping;
        } else {
          // Free flight: curl around the velocity + a slow breathing drift.
          const sw = cfg.swirl * f.swirl[i];
          const vx = f.vx[i];
          f.vx[i] = (vx - f.vy[i] * sw * dt) * friction + Math.sin(now * 0.0012 + f.phase[i]) * 0.025 * dt;
          f.vy[i] = (f.vy[i] + vx * sw * dt) * friction + Math.cos(now * 0.001 + f.phase[i]) * 0.025 * dt;
        }

        if (mouse.active) {
          const dx = f.x[i] - mouse.x;
          const dy = f.y[i] - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / R) * (1 - d / R) * cfg.mouseStrength * 2.2 * dt;
            f.vx[i] += (dx / d) * force;
            f.vy[i] += (dy / d) * force;
          }
        }

        f.x[i] += f.vx[i] * dt;
        f.y[i] += f.vy[i] * dt;

        const far = Math.min(1, (Math.abs(f.x[i] - f.tx[i]) + Math.abs(f.y[i] - f.ty[i])) / 90);
        sizes[i] = f.r[i] * (1 - far * shrink);
      }

      if (photoVisible && t > timeline.disperseEnd) {
        const fade = Math.max(0, 1 - (t - timeline.disperseEnd) / 300);
        photoCanvas.style.opacity = String(cfg.backgroundOpacity * fade);
        if (fade === 0) hidePhoto();
      }

      renderer.draw(f, sizes);

      if (!introDone && t > timeline.end) introDone = true;
      raf = requestAnimationFrame(step);
    };

    const run = () => {
      if (!raf && visible && !disposed) {
        last = 0;
        raf = requestAnimationFrame(step);
      }
    };

    const boot = async () => {
      try {
        if (!img.complete) await img.decode();
        if (disposed) return;
        if (setup(true)) {
          onActiveChange(true);
          run();
        }
      } catch {
        onActiveChange(false);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) run();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(container);

    let lastW = container.offsetWidth;
    let lastH = container.offsetHeight;
    const ro = new ResizeObserver(() => {
      if (container.offsetWidth === lastW && container.offsetHeight === lastH) return;
      lastW = container.offsetWidth;
      lastH = container.offsetHeight;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (disposed || !field) return;
        setup(!introDone);
        run();
      }, 200);
    });
    ro.observe(container);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scale = rect.width / (geom?.w || rect.width) || 1;
      mouse.x = (e.clientX - rect.left) / scale;
      mouse.y = (e.clientY - rect.top) / scale;
      mouse.active = true;
      run();
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onLeave();
    };
    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave);
    area.addEventListener("pointerup", onUp);
    area.addEventListener("pointercancel", onLeave);

    boot();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      area.removeEventListener("pointerup", onUp);
      area.removeEventListener("pointercancel", onLeave);
      renderer.dispose();
      onActiveChange(false);
    };
  }, [imageRef, containerRef, interactionRef, mask, onActiveChange]);

  return (
    <>
      <canvas
        ref={photoCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
    </>
  );
};

export default HeroParticles;
