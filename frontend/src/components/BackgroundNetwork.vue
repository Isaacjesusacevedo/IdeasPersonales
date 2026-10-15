<script setup lang="ts">
// Red decorativa de ideas: nodos + enlaces generados una vez con PRNG de
// semilla fija. Puramente visual (aria-hidden, sin eventos).
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Node { x: number; y: number; r: number; c: string; pulse: boolean; d: string }
interface Edge { x1: number; y1: number; x2: number; y2: number; c: string }

const W = 1600
const H = 900
const N = 45
const LINK_DIST = 250

const rand = mulberry32(20261015)
const nodes: Node[] = []
for (let i = 0; i < N; i++) {
  const pick = rand()
  nodes.push({
    x: 40 + rand() * (W - 80),
    y: 40 + rand() * (H - 80),
    r: 1.6 + rand() * 2.2,
    c: pick < 0.45 ? '#7c3aed' : pick < 0.8 ? '#2dd4bf' : '#8b94ff',
    pulse: false,
    d: (3 + rand() * 4).toFixed(2)
  })
}
// 4 nodos con pulso lento, bien separados
for (const k of [3, 16, 29, 40]) nodes[k % N].pulse = true

const edges: Edge[] = []
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const dx = nodes[i].x - nodes[j].x
    const dy = nodes[i].y - nodes[j].y
    if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) {
      edges.push({
        x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y,
        c: rand() < 0.5 ? '#7c3aed' : '#2dd4bf'
      })
    }
  }
}
</script>

<template>
  <svg class="bg-net" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <g stroke-width="1">
      <line v-for="(e, i) in edges" :key="'e' + i"
        :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" :stroke="e.c" />
    </g>
    <g>
      <circle v-for="(n, i) in nodes" :key="'n' + i"
        :cx="n.x" :cy="n.y" :r="n.r" :fill="n.c"
        :class="{ 'net-pulse': n.pulse }" :style="n.pulse ? { animationDuration: n.d + 's' } : undefined" />
    </g>
  </svg>
</template>
