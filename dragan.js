// dragan.js (fixed build) — no syntax errors, defensive null checks
const $ = (s) => document.querySelector(s);

function tick() {
  const d = new Date();
  const el = $("#clock");
  if (!el) return;
  el.textContent =
    String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}
tick();
setInterval(tick, 1000);

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

function pingLock() {
  const r = $("#reticle");
  if (!r) return;
  r.classList.remove("on");
  void r.offsetWidth;
  r.classList.add("on");
}

/* ===== HEARTBEAT (fear-linked) ===== */
let hb = 0;
let lastBeat = performance.now();
let beatPhase = 0;
function setHB(target) {
  hb = lerp(hb, target, 0.15);
  document.documentElement.style.setProperty("--hb", hb.toFixed(3));
}

/* ===== State machine so overload isn't permanent ===== */
const corePanel = $("#corePanel");
let surgeState = "high"; // "cool" | "high" | "over"
let stateUntil = performance.now() + 2600;

function pulseCorrupt(el, ms = 420) {
  if (!el) return;
  el.classList.add("on");
  setTimeout(() => el.classList.remove("on"), ms);
}

let fxPulse = 0;
function microFxKick(str = 1) {
  fxPulse = Math.max(fxPulse, 0.18 * str + Math.random() * 0.18);
}

/* Umbra dynamics */
let baseTrust = 8742;
let threat = 93;
let control = 78;

/* Radar values order: DUR, OVP, SPD, PRD, CTL, THR */
let vals = [92, 90, 88, 85, control, threat];
const baseCore = [92, 90, 88, 85];

/* ===== OVERLOAD CAP ===== */
const MAXN = 140; // allow past 100
const OVR = 100;

function enterOverload() {
  surgeState = "over";
  stateUntil = performance.now() + (900 + Math.random() * 900);
  pulseCorrupt(corePanel, 520);
  microFxKick(1.2);

  for (let i = 0; i < 4; i++) {
    vals[i] = clamp(vals[i] + (18 + Math.random() * 28), 55, MAXN);
  }
  baseTrust += 120 + Math.floor(Math.random() * 220);
}

function setStateNext() {
  const now = performance.now();
  if (now < stateUntil) return;

  if (surgeState === "cool") {
    surgeState = "high";
    stateUntil = now + (2200 + Math.random() * 1600);
  } else if (surgeState === "high") {
    if (Math.random() < 0.35) enterOverload();
    else {
      surgeState = "cool";
      stateUntil = now + (1600 + Math.random() * 1200);
    }
  } else {
    surgeState = "high";
    stateUntil = now + (2400 + Math.random() * 1800);
  }
}

/* ===== Fear Value + heartbeat feed ===== */
let fear = baseTrust;

setInterval(() => {
  const syncEl = $("#sync");
  if (syncEl) syncEl.textContent = (96 + Math.floor(4 * Math.random())) + "%";

  fear = baseTrust + Math.floor((Math.random() - 0.5) * 160);
  const trustEl = $("#trust");
  if (trustEl) trustEl.textContent = String(fear);

  const t = clamp((fear - 8500) / 900, 0, 1);
  setHB(t);

  threat = 88 + Math.floor(12 * Math.random());
  control = 76 + Math.floor(10 * Math.random());
  vals[4] = control;
  vals[5] = threat;

  if (Math.random() < 0.65) pingLock();

  if (surgeState === "over" || (surgeState === "high" && Math.random() < 0.28)) {
    pulseCorrupt(corePanel, surgeState === "over" ? 520 : 360);
    microFxKick(surgeState === "over" ? 1.0 : 0.45);
  }
}, 950);

/* ===== Radar render ===== */
const radarCanvas = $("#radar");
const radarCtx = radarCanvas ? radarCanvas.getContext("2d") : null;
const labels = ["DUR", "OVP", "SPD", "PRD", "CTL", "THR"];

function drawRadar() {
  if (!radarCanvas || !radarCtx) return;

  const c = radarCanvas, ctx = radarCtx;
  const w = c.width, h = c.height;
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  const R = Math.min(w, h) * 0.42;
  const n = vals.length;

  for (let g = 1; g <= 4; g++) {
    const r = R * (g / 4);
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + i * (Math.PI * 2 / n);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.save();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(184,107,255,.18)";
    ctx.strokeStyle = "rgba(184,107,255,.16)";
    ctx.lineWidth = 2.4;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,.16)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }

  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + i * (Math.PI * 2 / n);
    const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
    ctx.beginPath();
    ctx.moveTo(cx, cy); ctx.lineTo(x, y);
    ctx.save();
    ctx.lineCap = "round";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(245,245,255,.10)";
    ctx.strokeStyle = "rgba(245,245,255,.12)";
    ctx.lineWidth = 2.0;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(184,107,255,.12)";
    ctx.lineWidth = 1.0;
    ctx.stroke();
    ctx.restore();

    ctx.font = "900 10px Orbitron,sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.72)";
    const lx = cx + Math.cos(a) * (R + 10);
    const ly = cy + Math.sin(a) * (R + 10);
    ctx.fillText(labels[i], lx - 10, ly + 4);
  }

  function poly() {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + i * (Math.PI * 2 / n);
      const rr = R * (clamp(vals[i], 0, 100) / 100);
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.shadowBlur = 26;
  ctx.shadowColor = "rgba(184,107,255,.55)";
  poly();
  ctx.strokeStyle = "rgba(184,107,255,.75)";
  ctx.lineWidth = 4.0;
  ctx.stroke();
  ctx.shadowBlur = 34;
  ctx.shadowColor = "rgba(255,255,255,.18)";
  poly();
  ctx.strokeStyle = "rgba(255,255,255,.55)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();

  poly();
  ctx.fillStyle = "rgba(138,45,255,.14)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(184,107,255,.70)";
  ctx.fill();
}

/* ===== Hex UI updates ===== */
function setHex(i, v) {
  v = clamp(v, 0, MAXN);

  const pct = $("#p" + i);
  const micro = $("#m" + i);
  const glow = $("#hx" + i);
  const needle = $("#hn" + i);
  const fill = $("#hf" + i);

  const showPct = Math.round(clamp(v, 0, 100));
  if (pct) pct.textContent = showPct + "%";
  if (micro) micro.style.width = clamp(v, 0, 100) + "%";

  if (glow) {
    const total = 210, filled = total * (clamp(v, 0, 100) / 100);
    glow.style.strokeDasharray = String(total);
    glow.style.strokeDashoffset = String(total - filled);
  }

  const deg = -125 + (clamp(v, 0, MAXN) / MAXN) * 250;
  if (needle) needle.setAttribute("transform", `rotate(${deg} 32 32)`);

  if (fill) {
    const s = 0.2 + 0.8 * (clamp(v, 0, 100) / 100);
    fill.style.opacity = (0.10 + 0.28 * (clamp(v, 0, 100) / 100)).toFixed(3);
    fill.setAttribute("transform", `translate(32 32) scale(${s}) translate(-32 -32)`);
  }

  const statEl = document.querySelectorAll(".hexStat")[i];
  if (statEl) statEl.dataset.over = v > OVR ? "1" : "0";
}

/* ===== Impact memory (ghost) ===== */
let ghosts = [92, 90, 88, 85];
function ghostHit(i, v) {
  if (v > ghosts[i] + 6) {
    ghosts[i] = v;
    const g = $("#g" + i);
    if (g) {
      g.textContent = String(Math.round(v));
      g.classList.remove("on");
      void g.offsetWidth;
      g.classList.add("on");
      setTimeout(() => g.classList.remove("on"), 520);
    }
  } else {
    ghosts[i] = lerp(ghosts[i], v, 0.03);
  }
}

/* main breathe loop */
function breathe() {
  setStateNext();

  for (let i = 0; i < 4; i++) {
    const base = baseCore[i];
    const noise = (Math.sin(Date.now() / 900 + i * 1.7) * 0.35) + ((Math.random() - 0.5) * 0.22);

    let target = base;
    if (surgeState === "cool") target = base - (4 + Math.random() * 3);
    else if (surgeState === "high") target = base + (0.8 + Math.random() * 2.2);
    else target = base + (18 + Math.random() * 28);

    vals[i] = lerp(vals[i], target + noise, surgeState === "over" ? 0.12 : 0.06);
    vals[i] = clamp(vals[i], 55, MAXN);
  }

  for (let i = 0; i < 4; i++) {
    const el = $("#v" + i);
    if (el) el.textContent = String(Math.round(vals[i]));
    ghostHit(i, vals[i]);
    setHex(i, vals[i]);
  }

  drawRadar();

  const now = performance.now();
  const bpm = 72 + hb * 22;
  const beatMs = 60000 / bpm;
  const t = (now - lastBeat) / beatMs;
  if (t >= 1) { lastBeat = now; beatPhase = 0; }
  beatPhase = clamp(t, 0, 1);

  const dub = Math.max(0, 1 - Math.abs((beatPhase - 0.18) / 0.12));
  const dub2 = Math.max(0, 1 - Math.abs((beatPhase - 0.46) / 0.10)) * 0.55;
  const pulse = clamp((dub + dub2) * hb, 0, 1);
  document.documentElement.style.setProperty("--hb", (hb * 0.65 + pulse * 0.9).toFixed(3));

  const heatTarget = (surgeState === "cool") ? 0.05 : (surgeState === "high" ? 0.35 : 1);
  const curHeat = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--heat")) || 0;
  document.documentElement.style.setProperty("--heat", lerp(curHeat, heatTarget, 0.08).toFixed(3));

  fxPulse = Math.max(0, fxPulse - 0.028);
  document.documentElement.style.setProperty("--fx", fxPulse.toFixed(3));

  requestAnimationFrame(breathe);
}
breathe();

/* ===== EMBERS (purple/white particles) ===== */
(() => {
  const board = $("#board");
  const canvas = $("#embers");
  if (!board || !canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  let w = 1, h = 1, dpr = 1;
  let parts = [];
  const N = 46;

  function resize() {
    const r = board.getBoundingClientRect();
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = Math.max(1, Math.floor(r.width * dpr));
    h = Math.max(1, Math.floor(r.height * dpr));
    canvas.width = w; canvas.height = h;
  }
  function spawn() {
    return {
      x: Math.random() * w,
      y: h + Math.random() * h * 0.2,
      vx: (Math.random() - 0.5) * 0.10 * dpr,
      vy: -(0.18 + Math.random() * 0.42) * dpr,
      r: (0.8 + Math.random() * 2.2) * dpr,
      a: 0.10 + Math.random() * 0.55,
      t: Math.random() * Math.PI * 2,
      c: Math.random() < 0.55 ? "white" : "violet",
    };
  }
  function init() { parts = new Array(N).fill(0).map(spawn); }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createRadialGradient(w * 0.55, h * 0.35, 0, w * 0.55, h * 0.35, Math.max(w, h) * 0.7);
    g.addColorStop(0, "rgba(184,107,255,.06)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const fx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fx")) || 0;

    for (const p of parts) {
      p.t += 0.02;
      p.x += p.vx + Math.sin(p.t) * 0.10 * dpr;
      p.y += p.vy;
      p.a -= 0.0012;

      if (fx > 0) {
        p.y += -(fx * 0.55) * dpr;
        p.a += fx * 0.0015;
      }

      if (p.y < -40 * dpr || p.a <= 0 || p.x < -50 * dpr || p.x > w + 50 * dpr) {
        Object.assign(p, spawn());
        continue;
      }

      const col = (p.c === "white")
        ? `rgba(245,245,255,${p.a})`
        : `rgba(184,107,255,${p.a})`;

      ctx.beginPath();
      ctx.fillStyle = col;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.2 * dpr;
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 22, p.y - p.vy * 18);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(draw);
  }

  resize();
  init();
  requestAnimationFrame(draw);
  window.addEventListener("resize", () => { resize(); init(); }, { passive: true });
})();

/* ===== DNA canvas + sequencer line ===== */
(() => {
  const canvas = document.getElementById("dnaCanvas");
  if (!canvas) return;

  const c2 = canvas.getContext("2d", { alpha: true });
  let w = 0, h = 0, dpr = 1;

  function resize() {
    const box = canvas.getBoundingClientRect();
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = Math.max(1, Math.floor(box.width * dpr));
    h = Math.max(1, Math.floor(box.height * dpr));
    canvas.width = w; canvas.height = h;
  }

  const white = [245, 245, 255];
  const violet = [184, 107, 255];
  const rgba = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

  function strokePass(color, phaseOffset, mode, time, mid, amp, freq, speed) {
    c2.beginPath();
    let started = false;
    for (let x = 0; x <= w; x += 2 * dpr) {
      const ph = x * freq + time * speed + phaseOffset;
      const y = mid + amp * Math.sin(ph);
      const z = (Math.cos(ph) + 1) / 2;
      const y3 = y + (z - 0.5) * amp * 0.35;
      const isFront = z > 0.55;
      const take = (mode === "front") ? isFront : !isFront;

      if (take) {
        started ? c2.lineTo(x, y3) : (c2.moveTo(x, y3), started = true);
      } else if (started) {
        const a = (mode === "front") ? 0.92 : 0.28;
        const lw = (mode === "front") ? 3.4 * dpr : 1.9 * dpr;
        c2.strokeStyle = rgba(color, a);
        c2.lineWidth = lw;
        c2.lineCap = "round";
        c2.lineJoin = "round";
        c2.shadowBlur = (mode === "front") ? 10 * dpr : 0;
        c2.shadowColor = (mode === "front") ? rgba(violet, 0.32) : "transparent";
        c2.stroke();
        c2.beginPath();
        started = false;
      }
    }
    if (started) {
      const a = (mode === "front") ? 0.92 : 0.28;
      const lw = (mode === "front") ? 3.4 * dpr : 1.9 * dpr;
      c2.strokeStyle = rgba(color, a);
      c2.lineWidth = lw;
      c2.lineCap = "round";
      c2.lineJoin = "round";
      c2.shadowBlur = (mode === "front") ? 10 * dpr : 0;
      c2.shadowColor = (mode === "front") ? rgba(violet, 0.32) : "transparent";
      c2.stroke();
    }
    c2.shadowBlur = 0;
  }

  function draw(t) {
    const time = 0.001 * t;
    c2.clearRect(0, 0, w, h);

    const mid = 0.5 * h, amp = 0.22 * h;
    const freq = 2 * Math.PI / (0.33 * w);
    const speed = 2.6;
    const baseStep = Math.max(18 * dpr, w / 16);

    const bg = c2.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "rgba(255,255,255,.06)");
    bg.addColorStop(1, "rgba(255,255,255,.02)");
    c2.fillStyle = bg;
    c2.fillRect(0, 0, w, h);

    for (let x = -baseStep; x <= w + baseStep; x += baseStep) {
      const ph = x * freq + time * speed;
      const y1 = mid + amp * Math.sin(ph);
      const y2 = mid + amp * Math.sin(ph + Math.PI);
      const z = (Math.cos(ph) + 1) / 2;
      const front = z > 0.5;
      const y1p = y1 + (z - 0.5) * amp * 0.35;
      const y2p = y2 - (z - 0.5) * amp * 0.35;

      c2.strokeStyle = front ? "rgba(245,245,255,.70)" : "rgba(245,245,255,.22)";
      c2.lineWidth = front ? 1.6 * dpr : 1.0 * dpr;
      c2.beginPath();
      c2.moveTo(x, y1p); c2.lineTo(x, y2p);
      c2.stroke();

      c2.fillStyle = front ? "rgba(184,107,255,.40)" : "rgba(245,245,255,.14)";
      c2.beginPath(); c2.arc(x, y1p, front ? 2 * dpr : 1.4 * dpr, 0, 2 * Math.PI); c2.fill();
      c2.beginPath(); c2.arc(x, y2p, front ? 2 * dpr : 1.4 * dpr, 0, 2 * Math.PI); c2.fill();
    }

    strokePass(violet, 0, "back", time, mid, amp, freq, speed);
    strokePass(white, Math.PI, "back", time, mid, amp, freq, speed);
    strokePass(violet, 0, "front", time, mid, amp, freq, speed);
    strokePass(white, Math.PI, "front", time, mid, amp, freq, speed);

    requestAnimationFrame(draw);
  }

  resize();
  requestAnimationFrame(draw);
  window.addEventListener("resize", resize, { passive: true });
})();

(() => {
  const dnaSeqLine = $("#dnaSeqLine");
  if (!dnaSeqLine) return;

  const bases = ["A", "C", "G", "T"];
  let seq = new Array(64).fill(0).map(() => bases[(Math.random() * 4) | 0]);

  function rollBase() {
    const p = (surgeState === "cool") ? 0.05 : (surgeState === "high" ? 0.12 : 0.28);
    const mutate = Math.random() < p;
    const b = bases[(Math.random() * 4) | 0];
    return mutate ? `<b>${b}</b>` : b;
  }

  setInterval(() => {
    seq.shift();
    seq.push(bases[(Math.random() * 4) | 0]);
    dnaSeqLine.innerHTML = seq.map(() => rollBase()).join(" ");
  }, 160);
})();
