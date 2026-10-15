<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { secciones } from '@/data/vault'
import { buildGraph, sembrar, tick, COLOR_POR_SECCION, type GNode, type GEdge } from '@/graph'

const router = useRouter()
const caja = ref<HTMLDivElement | null>(null)
const svg = ref<SVGSVGElement | null>(null)
const W = ref(900)
const H = 560

const solo = ref<string | null>(null)
const buscar = ref('')
const comoLista = ref(false)
const hover = ref<string | null>(null)
const foco = ref<string | null>(null)
const k = ref(1)
const tx = ref(0)
const ty = ref(0)

let nodes: GNode[] = []
let edges: GEdge[] = []
let alpha = 1
let raf = 0
let vivo = false
const reducida = ref(false)

const acentoDe = (id: string) => secciones.find(s => s.id === id)?.acento ?? 'purple'

const porId = new Map<string, number>()
const vecinosDe = (id: string): Set<string> => {
  const out = new Set<string>([id])
  const i = porId.get(id)
  if (i === undefined) return out
  for (const e of edges) {
    if (e.a === i) out.add(nodes[e.b].id)
    if (e.b === i) out.add(nodes[e.a].id)
  }
  return out
}
const vecindad = computed(() => (hover.value || foco.value ? vecinosDe(hover.value ?? foco.value!) : null))

const atenuado = (id: string) => {
  if (solo.value) {
    const n = nodes[porId.get(id) ?? -1]
    if (n && n.seccion !== solo.value && !vecindad.value?.has(id)) return true
  }
  if (vecindad.value) return !vecindad.value.has(id)
  return false
}

function armar() {
  const g = buildGraph(solo.value, acentoDe)
  nodes = g.nodes
  edges = g.edges
  porId.clear()
  nodes.forEach((n, i) => porId.set(n.id, i))
  sembrar(nodes, W.value, H)
  alpha = 1
  pintar()
}

function pintar() {
  const els = svg.value
  if (!els) return
  const cs = els.querySelectorAll<SVGCircleElement>('circle[data-i]')
  const ls = els.querySelectorAll<SVGLineElement>('line[data-e]')
  cs.forEach(c => {
    const n = nodes[Number(c.dataset.i)]
    if (n) { c.setAttribute('cx', n.x.toFixed(1)); c.setAttribute('cy', n.y.toFixed(1)) }
  })
  ls.forEach(l => {
    const e = edges[Number(l.dataset.e)]
    if (e) {
      l.setAttribute('x1', nodes[e.a].x.toFixed(1)); l.setAttribute('y1', nodes[e.a].y.toFixed(1))
      l.setAttribute('x2', nodes[e.b].x.toFixed(1)); l.setAttribute('y2', nodes[e.b].y.toFixed(1))
    }
  })
}

function loop() {
  if (!vivo) return
  tick(nodes, edges, W.value / 2, H / 2, alpha)
  alpha *= 0.985
  pintar()
  if (alpha >= 0.01) raf = requestAnimationFrame(loop)
}

function iniciar() {
  detener()
  if (reducida.value) {
    let a = 1
    for (let i = 0; i < 300 && a >= 0.01; i++) {
      tick(nodes, edges, W.value / 2, H / 2, a)
      a *= 0.985
    }
    pintar()
    return
  }
  vivo = true
  alpha = Math.max(alpha, 0.4)
  raf = requestAnimationFrame(loop)
}

function detener() {
  vivo = false
  cancelAnimationFrame(raf)
}

// — Interacción: arrastrar nodos, pan, zoom, pinch —
const punteros = new Map<number, { x: number; y: number }>()
let arrastre: { nodo: number; movio: boolean } | { fondo: boolean; movio: boolean } | null = null
let distPinch = 0

const aMundo = (sx: number, sy: number) => {
  const r = svg.value!.getBoundingClientRect()
  return { x: (sx - r.left - tx.value) / k.value, y: (sy - r.top - ty.value) / k.value }
}

const onDown = (e: PointerEvent, nodo: number | null) => {
  ;(e.target as Element).setPointerCapture?.(e.pointerId)
  punteros.set(e.pointerId, { x: e.clientX, y: e.clientY })
  if (punteros.size === 2) {
    const [a, b] = [...punteros.values()]
    distPinch = Math.hypot(a.x - b.x, a.y - b.y)
    arrastre = null
    return
  }
  arrastre = nodo === null ? { fondo: true, movio: false } : { nodo, movio: false }
}

const onMove = (e: PointerEvent) => {
  const p = punteros.get(e.pointerId)
  if (!p) return
  const dx = e.clientX - p.x
  const dy = e.clientY - p.y
  p.x = e.clientX
  p.y = e.clientY
  if (punteros.size === 2) {
    const [a, b] = [...punteros.values()]
    const d = Math.hypot(a.x - b.x, a.y - b.y)
    if (distPinch > 0) {
      const nk = Math.min(3, Math.max(0.4, k.value * (d / distPinch)))
      k.value = nk
    }
    distPinch = d
    return
  }
  if (!arrastre) return
  if (Math.abs(dx) + Math.abs(dy) > 1) arrastre.movio = true
  if ('fondo' in arrastre) {
    tx.value += dx
    ty.value += dy
  } else {
    const m = aMundo(e.clientX, e.clientY)
    nodes[arrastre.nodo].x = m.x
    nodes[arrastre.nodo].y = m.y
    alpha = 0.5
    iniciar()
    pintar()
  }
}

const onUp = (e: PointerEvent, nodo: number | null) => {
  punteros.delete(e.pointerId)
  if (arrastre && 'nodo' in arrastre && !arrastre.movio && nodo !== null) {
    router.push(`/n/${nodes[nodo].id}`)
  }
  arrastre = null
}

const onWheel = (e: WheelEvent) => {
  e.preventDefault()
  const nk = Math.min(3, Math.max(0.4, k.value * (e.deltaY < 0 ? 1.1 : 0.9)))
  k.value = nk
}

const zoomBtn = (f: number) => { k.value = Math.min(3, Math.max(0.4, k.value * f)) }
const centrar = () => { tx.value = 0; ty.value = 0; k.value = 1 }

const irANodo = () => {
  const t = buscar.value.trim().toLowerCase()
  if (!t) return
  const n = nodes.find(x => x.titulo.toLowerCase().includes(t))
  if (!n) return
  foco.value = n.id
  tx.value = W.value / 2 - n.x * k.value
  ty.value = H / 2 - n.y * k.value
}

const verEtiqueta = (n: GNode) => n.grado >= 4 || hover.value === n.id || foco.value === n.id || k.value >= 1.3

watch(solo, () => { foco.value = null; hover.value = null; armar(); iniciar() })

const onVis = () => {
  if (document.hidden) detener()
  else if (alpha >= 0.01) iniciar()
}

onMounted(() => {
  reducida.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (caja.value) W.value = Math.max(320, caja.value.clientWidth)
  armar()
  iniciar()
  svg.value?.addEventListener('wheel', onWheel, { passive: false })
  document.addEventListener('visibilitychange', onVis)
})
onUnmounted(() => {
  detener()
  svg.value?.removeEventListener('wheel', onWheel)
  document.removeEventListener('visibilitychange', onVis)
})
</script>

<template>
  <div>
    <div class="grafo-bar">
      <form @submit.prevent="irANodo" class="grafo-busca" role="search">
        <input v-model="buscar" placeholder="Buscar nodo…" aria-label="Buscar nodo en el grafo" />
        <button class="btn btn-ghost btn-sm" type="submit">Enfocar</button>
      </form>
      <div class="grafo-btns">
        <button class="icon-btn" @click="zoomBtn(1.25)" aria-label="Acercar">+</button>
        <button class="icon-btn" @click="zoomBtn(0.8)" aria-label="Alejar">−</button>
        <button class="icon-btn" @click="centrar" aria-label="Centrar vista">◎</button>
        <button class="btn btn-ghost btn-sm" @click="comoLista = !comoLista">{{ comoLista ? 'Ver grafo' : 'Ver como lista' }}</button>
      </div>
    </div>

    <div v-if="comoLista" class="card">
      <div class="card-title" style="margin-bottom:10px">Nodos ({{ nodes.length }})</div>
      <div class="tag-row" style="margin-top:0">
        <RouterLink v-for="n in [...nodes].sort((a, b) => b.grado - a.grado)" :key="n.id" :to="`/n/${n.id}`" class="pill">→ {{ n.titulo }}</RouterLink>
      </div>
    </div>

    <div v-else ref="caja" class="grafo-caja">
      <svg ref="svg" :width="W" :height="H" role="img" aria-label="Grafo de notas del vault"
        @pointerdown="onDown($event, null)" @pointermove="onMove" @pointerup="onUp($event, null)" @pointercancel="onUp($event, null)">
        <g :transform="`translate(${tx},${ty}) scale(${k})`">
          <line v-for="(e, i) in edges" :key="'e' + i" :data-e="i"
            :x1="nodes[e.a].x" :y1="nodes[e.a].y" :x2="nodes[e.b].x" :y2="nodes[e.b].y"
            stroke="rgba(139,148,255,.25)" stroke-width="1"
            :opacity="vecindad && !(vecindad.has(nodes[e.a].id) && vecindad.has(nodes[e.b].id)) ? 0.08 : 1" />
          <g v-for="(n, i) in nodes" :key="n.id">
            <circle :data-i="i" :cx="n.x" :cy="n.y" :r="Math.min(16, 5 + n.grado * 1.1)"
              :fill="COLOR_POR_SECCION[secciones.find(s => s.id === n.seccion)?.acento ?? 'purple']"
              :opacity="atenuado(n.id) ? 0.12 : 0.9"
              style="cursor:grab"
              @pointerdown.stop="onDown($event, i)" @pointerup.stop="onUp($event, i)"
              @pointerenter="hover = n.id" @pointerleave="hover = null" />
            <text v-if="verEtiqueta(n)" :x="n.x + 10" :y="n.y + 4" class="grafo-label" :opacity="atenuado(n.id) ? 0.15 : 1">{{ n.titulo }}</text>
          </g>
        </g>
      </svg>
    </div>

    <div class="grafo-leyenda" role="group" aria-label="Filtrar por sección">
      <button v-for="s in secciones" :key="s.id" class="pill" :class="{ active: solo === s.id }"
        @click="solo = solo === s.id ? null : s.id"
        :aria-pressed="solo === s.id">
        <span class="sec-dot" :class="`sec-dot--${s.acento ?? 'purple'}`"></span>&nbsp;{{ s.nombre }}
      </button>
      <span class="id-mono">{{ nodes.length }} nodos · {{ edges.length }} aristas</span>
    </div>
  </div>
</template>
