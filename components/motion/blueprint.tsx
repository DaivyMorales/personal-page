"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

/**
 * Faint AI and maths line art in the page margins, like notes on engineering paper: a neural
 * net with pulses, an attention map, loss and activation plots, gradient descent, word vectors
 * and the formulas behind them. Each piece draws itself in and drifts slightly with the scroll.
 */

// Deterministic pseudo-random numbers (mulberry32). Integer-only maths gives identical results
// on the server and in every browser, so the art hydrates without mismatches.
const rand = (seed: number) => {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const round = (n: number) => Math.round(n * 1000) / 1000;

const draw = {
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] as const },
};

function Axes({ w, h, x = "x", y = "y" }: { w: number; h: number; x?: string; y?: string }) {
  return (
    <g>
      <motion.path d={`M20 ${h - 20} H${w - 10} M20 ${h - 20} V10`} {...draw} />
      <path d={`M${w - 16} ${h - 24} L${w - 10} ${h - 20} L${w - 16} ${h - 16} M16 16 L20 10 L24 16`} />
      <text x={w - 14} y={h - 6} className="bp-label" textAnchor="end">{x}</text>
      <text x={26} y={16} className="bp-label">{y}</text>
    </g>
  );
}

function NeuralNet() {
  const layers = [3, 5, 5, 2];
  const xs = [20, 95, 170, 245];
  const nodes = layers.map((n, li) => Array.from({ length: n }, (_, i) => ({ x: xs[li], y: 110 + (i - (n - 1) / 2) * 38 })));
  const edges = nodes.slice(0, -1).flatMap((layer, li) => layer.flatMap((a) => nodes[li + 1].map((b) => ({ a, b }))));
  return (
    <svg viewBox="0 0 265 220" width="265" height="220">
      {edges.map(({ a, b }, i) => (
        <motion.path key={i} d={`M${a.x} ${a.y} L${b.x} ${b.y}`} {...draw} transition={{ ...draw.transition, delay: i * 0.01 }} />
      ))}
      {/* Signals travelling forward through a few connections. */}
      {edges.filter((_, i) => i % 7 === 0).map(({ a, b }, i) => (
        <path key={`p${i}`} d={`M${a.x} ${a.y} L${b.x} ${b.y}`} className="bp-pulse" style={{ animationDelay: `${(i * 0.6) % 4}s` }} />
      ))}
      {nodes.flat().map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="5" className="bp-node" />
      ))}
    </svg>
  );
}

function Attention() {
  const n = 7;
  return (
    <svg viewBox="0 0 220 230" width="220" height="230">
      {Array.from({ length: n * n }, (_, k) => {
        const i = Math.floor(k / n);
        const j = k % n;
        // Strong diagonal plus a few long-range links, like a real attention map.
        const v = Math.max(i === j ? 0.9 : 0, rand(k) ** 3, Math.abs(i - j) === 3 ? 0.45 : 0);
        return <rect key={k} x={30 + j * 25} y={20 + i * 25} width="22" height="22" rx="2" fill="currentColor" fillOpacity={round(0.08 + v * 0.75)} stroke="none" />;
      })}
      {["the", "model", "reads", "every", "token", "in", "context"].map((w, i) => (
        <text key={w} x={26} y={35 + i * 25} className="bp-label" textAnchor="end">{w}</text>
      ))}
    </svg>
  );
}

function Sigmoid() {
  const pts = Array.from({ length: 61 }, (_, i) => {
    const x = -6 + i * 0.2;
    return `${i ? "L" : "M"}${(140 + x * 19).toFixed(1)} ${(160 - 140 / (1 + Math.exp(-x))).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 270 180" width="270" height="180">
      <Axes w={270} h={180} x="x" y="σ(x)" />
      <path d="M20 20 H260" className="bp-dash" />
      <motion.path d={pts} strokeWidth="1.5" {...draw} />
    </svg>
  );
}

function Loss() {
  const pts = Array.from({ length: 48 }, (_, i) => {
    const y = 18 + 120 * Math.exp(-i / 9) + (rand(i) - 0.5) * 10 * Math.exp(-i / 20);
    return { x: 24 + i * 5, y: 160 - y };
  });
  return (
    <svg viewBox="0 0 270 180" width="270" height="180">
      <Axes w={270} h={180} x="epoch" y="loss" />
      <motion.path d={pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y.toFixed(1)}`).join(" ")} strokeWidth="1.5" {...draw} />
      {pts.filter((_, i) => i % 6 === 0).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.2" fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}

function Gaussian() {
  const pts = Array.from({ length: 81 }, (_, i) => {
    const x = -4 + i * 0.1;
    return `${i ? "L" : "M"}${(135 + x * 28).toFixed(1)} ${(160 - 130 * Math.exp(-(x * x) / 2)).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 270 180" width="270" height="180">
      <path d="M15 160 H255" />
      <motion.path d={pts} strokeWidth="1.5" {...draw} />
      {[-1, 1].map((s) => (
        <path key={s} d={`M${135 + s * 28} 160 V${160 - 130 * Math.exp(-0.5)}`} className="bp-dash" />
      ))}
      <path d="M135 160 V30" className="bp-dash" />
      <text x="135" y="175" className="bp-label" textAnchor="middle">μ</text>
      <text x="163" y="175" className="bp-label" textAnchor="middle">+σ</text>
      <text x="107" y="175" className="bp-label" textAnchor="middle">−σ</text>
    </svg>
  );
}

function Descent() {
  const steps = Array.from({ length: 14 }, (_, i) => {
    const r = 1 - i / 14;
    const a = i * 1.15;
    return { x: 140 + Math.cos(a) * 105 * r * r, y: 100 + Math.sin(a) * 62 * r * r };
  });
  return (
    <svg viewBox="0 0 280 200" width="280" height="200">
      {[1, 0.78, 0.58, 0.4, 0.24, 0.1].map((k, i) => (
        <motion.ellipse key={i} cx="140" cy="100" rx={125 * k} ry={80 * k} {...draw} transition={{ ...draw.transition, delay: i * 0.12 }} />
      ))}
      <motion.path d={steps.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")} strokeWidth="1.5" {...draw} transition={{ ...draw.transition, delay: 0.6 }} />
      {steps.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.4" fill="currentColor" stroke="none" />
      ))}
      <text x="140" y="196" className="bp-label" textAnchor="middle">θ ← θ − η∇L(θ)</text>
    </svg>
  );
}

function Vectors() {
  const v = [
    { x: 200, y: 50, w: "king" },
    { x: 215, y: 115, w: "queen" },
    { x: 120, y: 70, w: "man" },
    { x: 135, y: 135, w: "woman" },
  ];
  return (
    <svg viewBox="0 0 260 200" width="260" height="200">
      <defs>
        <marker id="bp-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8" fill="none" stroke="currentColor" />
        </marker>
      </defs>
      <Axes w={260} h={200} x="dim 1" y="dim 2" />
      {v.map((p) => (
        <g key={p.w}>
          <motion.path d={`M20 180 L${p.x} ${p.y}`} markerEnd="url(#bp-arrow)" {...draw} />
          <text x={p.x + 6} y={p.y - 4} className="bp-label">{p.w}</text>
        </g>
      ))}
      <path d="M200 50 L120 70 M215 115 L135 135" className="bp-dash" />
    </svg>
  );
}

function Transformer() {
  const blocks = ["Softmax", "Linear", "Add & Norm", "Feed Forward", "Add & Norm", "Multi-Head Attention", "Embedding"];
  return (
    <svg viewBox="0 0 220 330" width="220" height="330">
      {blocks.map((b, i) => (
        <g key={i}>
          <motion.rect x="25" y={10 + i * 45} width="170" height="30" rx="5" {...draw} transition={{ ...draw.transition, delay: i * 0.08 }} />
          <text x="110" y={29 + i * 45} className="bp-label" textAnchor="middle">{b}</text>
          {i < blocks.length - 1 && <path d={`M110 ${55 + i * 45} V${40 + i * 45} M106 ${45 + i * 45} L110 ${40 + i * 45} L114 ${45 + i * 45}`} />}
        </g>
      ))}
      {/* Residual connections. */}
      <path d="M195 290 H210 V235 H195 M195 200 H210 V145 H195" className="bp-dash" />
    </svg>
  );
}

function Formula({ children, size = 22 }: { children: string; size?: number }) {
  return (
    <motion.p
      className="bp-formula"
      style={{ fontSize: size }}
      initial={{ opacity: 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 1.6 }}
    >
      {children}
    </motion.p>
  );
}

type Piece = { top: string; left: string; drift: number; rotate?: number; el: React.ReactNode };

// Positions are fractions of the page height and width; most sit in the right-hand margin.
const pieces: Piece[] = [
  { top: "13%", left: "79%", drift: -80, el: <NeuralNet /> },
  { top: "17%", left: "2%", drift: 60, el: <Formula size={20}>{"softmax(zᵢ) = eᶻⁱ ⁄ Σⱼ eᶻʲ"}</Formula> },
  { top: "22%", left: "76.5%", drift: 40, el: <Formula size={19}>{"Attention(Q, K, V) = softmax(QKᵀ ⁄ √dₖ) V"}</Formula> },
  { top: "27%", left: "80%", drift: -60, el: <Attention /> },
  { top: "36%", left: "79%", drift: 70, el: <Loss /> },
  { top: "42%", left: "78%", drift: -40, el: <Formula size={22}>{"∂L⁄∂w = ∂L⁄∂ŷ · ∂ŷ⁄∂w"}</Formula> },
  { top: "46%", left: "79%", drift: -50, el: <Sigmoid /> },
  { top: "53%", left: "80%", drift: 50, el: <Transformer /> },
  { top: "60%", left: "78%", drift: -70, el: <Formula size={22}>{"L = − Σᵢ yᵢ log ŷᵢ"}</Formula> },
  { top: "64%", left: "79%", drift: 60, el: <Vectors /> },
  { top: "72%", left: "2%", drift: 40, el: <Formula size={20}>{"P(A | B) = P(B | A) P(A) ⁄ P(B)"}</Formula> },
  { top: "74%", left: "78%", drift: -50, el: <Descent /> },
  { top: "84%", left: "80%", drift: 50, el: <Gaussian /> },
  { top: "90%", left: "79%", drift: -30, el: <Formula size={22}>{"ReLU(x) = max(0, x)"}</Formula> },
];

function Drift({ piece, progress }: { piece: Piece; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : piece.drift]);
  return (
    <motion.div className="bp-piece" style={{ top: piece.top, left: piece.left, y, rotate: piece.rotate }}>
      {piece.el}
    </motion.div>
  );
}

export function Blueprint() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="bp" aria-hidden="true">
      {pieces.map((p, i) => (
        <Drift key={i} piece={p} progress={scrollYProgress} />
      ))}
    </div>
  );
}
