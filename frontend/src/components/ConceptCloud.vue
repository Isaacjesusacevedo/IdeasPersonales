<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { tagIndex, notasPorTag } from '@/data/vault-index'
import { secciones } from '@/data/vault'

const props = withDefaults(defineProps<{ max?: number; heroMax?: number; mobileMax?: number; alto?: number }>(), {
  max: 40, heroMax: 24, mobileMax: 16, alto: 440
})
const router = useRouter()
const caja = ref<HTMLDivElement | null>(null)
const ancho = ref(0)

interface Burbuja { tag: string; count: number; color: string; x: number; y: number; d: number; fs: number; dur: string; delay: string }

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const candidatas = computed(() =>
  Object.entries(tagIndex)
    .map(([tag, ns]) => ({ tag, count: ns.length }))
    .sort((a, b) => b.count - a.count || (a.tag < b.tag ? -1 : 1))
)

const colorDe = (tag: string) => {
  const porSec: Record<string, number> = {}
  for (const n of notasPorTag(tag)) porSec[n.seccion] = (porSec[n.seccion] ?? 0) + 1
  const top = Object.entries(porSec).sort((a, b) => b[1] - a[1])[0]?.[0]
  const s = secciones.find(x => x.id === top)
  return s?.acento ?? 'purple'
}

const burbujas = computed<Burbuja[]>(() => {
  const W = ancho.value
  if (!W) return []
  const H = props.alto
  const movil = W < 560
  const limite = movil ? props.mobileMax : props.heroMax < props.max && H <= 320 ? props.heroMax : props.max
  const items = candidatas.value.slice(0, limite)
  if (!items.length) return []
  const counts = items.map(i => i.count)
  const min = Math.min(...counts)
  const max = Math.max(...counts)
  const talla = (c: number) => {
    const base = movil ? [44, 96] : [56, 132]
    if (max === min) return (base[0] + base[1]) / 2
    return base[0] + ((c - min) / (max - min)) * (base[1] - base[0])
  }
  const rand = mulberry32(77)
  const puestas: { x: number; y: number; r: number }[] = []
  const cx = W / 2
  const cy = H / 2
  return items.map((it, idx) => {
    const d = talla(it.count)
    const r = d / 2
    let x = cx - r
    let y = cy - r
    if (idx > 0) {
      const paso = 6 + rand() * 6
      let ok = false
      for (let a = 0; a < 60 && !ok; a++) {
        const rad = ((a * paso) / (2 * Math.PI)) * 26
        const px = cx + rad * Math.cos(a * 0.55 + idx) - r
        const py = cy + rad * Math.sin(a * 0.55 + idx) * 0.72 - r
        // chequeo de solape entre centros:
        ok = px >= 0 && py >= 0 && px + d <= W && py + d <= H &&
          puestas.every(p => Math.hypot(px + r - p.x, py + r - p.y) > d / 2 + p.r + 4)
        if (ok) { x = px; y = py }
      }
      if (!ok) { x = Math.max(0, Math.min(W - d, cx - r)); y = Math.max(0, Math.min(H - d, cy - r)) }
    }
    puestas.push({ x: x + r, y: y + r, r })
    return {
      tag: it.tag, count: it.count, color: colorDe(it.tag), x, y, d,
      fs: Math.max(11, Math.round(d / 6.5)),
      dur: (5 + rand() * 4).toFixed(2) + 's',
      delay: (-rand() * 6).toFixed(2) + 's'
    }
  })
})

let ro: ResizeObserver | null = null
let t: number | undefined
const medir = () => {
  window.clearTimeout(t)
  t = window.setTimeout(() => {
    if (caja.value) ancho.value = caja.value.clientWidth
  }, 150)
}

onMounted(() => {
  if (caja.value) ancho.value = caja.value.clientWidth
  if (caja.value && 'ResizeObserver' in window) {
    ro = new ResizeObserver(medir)
    ro.observe(caja.value)
  } else {
    window.addEventListener('resize', medir)
  }
})
onUnmounted(() => {
  ro?.disconnect()
  window.removeEventListener('resize', medir)
  window.clearTimeout(t)
})
</script>

<template>
  <div ref="caja" class="nube" :style="{ height: alto + 'px' }" role="group" aria-label="Nube de conceptos">
    <button
      v-for="b in burbujas"
      :key="b.tag"
      class="burbuja"
      :class="`burbuja--${b.color}`"
      :style="{ left: b.x + 'px', top: b.y + 'px', width: b.d + 'px', height: b.d + 'px', fontSize: b.fs + 'px', animationDuration: b.dur, animationDelay: b.delay }"
      :aria-label="`Etiqueta ${b.tag}, ${b.count} notas`"
      :title="`${b.tag} · ${b.count} notas`"
      @click="router.push(`/t/${b.tag}`)">
      <span class="burbuja-tag">#{{ b.tag }}</span>
      <span class="burbuja-n">{{ b.count }} notas</span>
    </button>
  </div>
</template>
