<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { secciones } from '@/data/vault'
import { buildLocal, sembrar, tick, COLOR_POR_SECCION } from '@/graph'

const props = defineProps<{ id: string }>()
const router = useRouter()
const caja = ref<HTMLDivElement | null>(null)
const svg = ref<SVGSVGElement | null>(null)
const W = ref(300)
const H = 240
const hover = ref<string | null>(null)

let nodes = buildLocal(props.id).nodes
let edges = buildLocal(props.id).edges
let centro = 0
let alpha = 1
let raf = 0
let vivo = false

const acento = (sec: string) => secciones.find(s => s.id === sec)?.acento ?? 'purple'

function armar() {
  const g = buildLocal(props.id)
  nodes = g.nodes
  edges = g.edges
  centro = g.centro
  sembrar(nodes, W.value, H, 21)
  alpha = 1
  pintar()
}

function pintar() {
  const els = svg.value
  if (!els) return
  els.querySelectorAll<SVGCircleElement>('circle[data-i]').forEach(c => {
    const n = nodes[Number(c.dataset.i)]
    if (n) { c.setAttribute('cx', n.x.toFixed(1)); c.setAttribute('cy', n.y.toFixed(1)) }
  })
  els.querySelectorAll<SVGLineElement>('line[data-e]').forEach(l => {
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
  alpha *= 0.97
  pintar()
  if (alpha >= 0.01) raf = requestAnimationFrame(loop)
}

function iniciar() {
  detener()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let a = 1
    for (let i = 0; i < 300 && a >= 0.01; i++) { tick(nodes, edges, W.value / 2, H / 2, a); a *= 0.97 }
    pintar()
    return
  }
  vivo = true
  raf = requestAnimationFrame(loop)
}

function detener() {
  vivo = false
  cancelAnimationFrame(raf)
}

watch(() => props.id, () => { armar(); iniciar() })

onMounted(() => {
  if (caja.value) W.value = Math.max(240, caja.value.clientWidth)
  armar()
  iniciar()
})
onUnmounted(detener)
</script>

<template>
  <div ref="caja" class="grafo-local">
    <div class="toc-title" style="margin-bottom:6px">Vecindad · {{ nodes.length - 1 }} conexiones</div>
    <svg ref="svg" :width="W" :height="H" role="img" :aria-label="`Grafo local de la nota`">
      <line v-for="(e, i) in edges" :key="'e' + i" :data-e="i"
        :x1="nodes[e.a].x" :y1="nodes[e.a].y" :x2="nodes[e.b].x" :y2="nodes[e.b].y"
        stroke="rgba(139,148,255,.3)" stroke-width="1" />
      <g v-for="(n, i) in nodes" :key="n.id">
        <circle :data-i="i" :cx="n.x" :cy="n.y"
          :r="i === centro ? 9 : 5.5"
          :fill="COLOR_POR_SECCION[acento(n.seccion)]"
          :stroke="i === centro ? '#fff' : 'none'" :stroke-width="i === centro ? 1.5 : 0"
          :opacity="hover && hover !== n.id ? 0.35 : 0.92"
          style="cursor:pointer"
          @click="router.push(`/n/${n.id}`)"
          @pointerenter="hover = n.id" @pointerleave="hover = null">
          <title>{{ n.titulo }}</title>
        </circle>
        <text v-if="i === centro || hover === n.id" :x="n.x + 12" :y="n.y + 4" class="grafo-label">{{ n.titulo }}</text>
      </g>
    </svg>
  </div>
</template>
