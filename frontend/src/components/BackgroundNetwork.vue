<script setup lang="ts">
// Líneas de flujo: 45 curvas Bézier diagonales + nodos. Puramente visual
// (aria-hidden, sin eventos). Ocultas en <768px por CSS.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Curva { d: string; o: string; dur: string }
interface Punto { x: number; y: number; r: number; pulso: boolean; dur: string }

const W = 1600
const H = 900
const rand = mulberry32(30415)

const curvas: Curva[] = []
for (let i = 0; i < 45; i++) {
  const y0 = -60 + (i / 44) * (H + 120) + (rand() - 0.5) * 90
  const y1 = y0 + (rand() - 0.5) * 420
  const cx1 = W * (0.25 + rand() * 0.2)
  const cx2 = W * (0.55 + rand() * 0.2)
  curvas.push({
    d: `M -120 ${y0.toFixed(0)} C ${cx1.toFixed(0)} ${(y0 + (rand() - 0.5) * 160).toFixed(0)}, ${cx2.toFixed(0)} ${(y1 + (rand() - 0.5) * 160).toFixed(0)}, ${W + 120} ${y1.toFixed(0)}`,
    o: (0.1 + rand() * 0.04).toFixed(2),
    dur: (30 + rand() * 30).toFixed(0)
  })
}

// 7 nodos sobre curvas (índices fijos, 3 con pulso)
const puntos: Punto[] = []
const fijos = [4, 11, 19, 26, 33, 39, 43]
for (let j = 0; j < fijos.length; j++) {
  const t = rand()
  puntos.push({
    x: 120 + rand() * (W - 240),
    y: 80 + rand() * (H - 160),
    r: 2 + rand() * 1.6,
    pulso: t < 0.45,
    dur: (4 + rand() * 4).toFixed(1)
  })
}
</script>

<template>
  <svg class="bg-net" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="flowGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="900">
        <stop offset="0" stop-color="#7c3aed" />
        <stop offset="1" stop-color="#2dd4bf" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#flowGrad)" stroke-width="1.2">
      <path v-for="(c, i) in curvas" :key="'c' + i"
        :d="c.d" :opacity="c.o" class="flujo" :style="{ animationDuration: c.dur + 's' }" />
    </g>
    <g>
      <circle v-for="(p, i) in puntos" :key="'p' + i"
        :cx="p.x.toFixed(0)" :cy="p.y.toFixed(0)" :r="p.r.toFixed(1)" fill="#a78bfa"
        :class="{ 'net-pulse': p.pulso }" :style="p.pulso ? { animationDuration: p.dur + 's' } : undefined" />
    </g>
  </svg>
</template>
