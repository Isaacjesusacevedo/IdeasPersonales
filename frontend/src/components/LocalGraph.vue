<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { notaPorId, secciones } from '@/data/vault'
import { aristas } from '@/data/vault-index'
import { useNotePreview } from '@/composables/useNotePreview'
import { radioNodo, COLOR_POR_SECCION } from '@/graph'

const props = defineProps<{ id: string }>()
const { scheduleShow, scheduleHide } = useNotePreview()
const router = useRouter()

const caja = ref<HTMLDivElement | null>(null)
const W = ref(320)
const H = 260
const hover = ref<string | null>(null)

interface LNode {
  id: string
  titulo: string
  seccion: string
  x: number
  y: number
  r: number
  color: string
  esCentro: boolean
  esDesborde: boolean
  desbordeN: number
  angle: number
}

const seccionIndex = (id: string) => secciones.findIndex(s => s.id === id)

const vecinosTodos = computed(() => {
  const ids = new Set<string>()
  for (const [a, b] of aristas()) {
    if (a === props.id) ids.add(b)
    if (b === props.id) ids.add(a)
  }
  const list = [...ids].map(id => notaPorId(id)).filter(Boolean) as { id: string; titulo: string; seccion: string }[]
  list.sort((a, b) => {
    const ia = seccionIndex(a.seccion)
    const ib = seccionIndex(b.seccion)
    if (ia !== ib) return ia - ib
    return a.titulo.localeCompare(b.titulo)
  })
  return list
})

const gradoDe = (id: string) => aristas().filter(([a, b]) => a === id || b === id).length

const maxVecinos = 12
const desborde = computed(() => Math.max(0, vecinosTodos.value.length - maxVecinos))
const vecinos = computed(() => vecinosTodos.value.slice(0, maxVecinos))

const nodes = ref<LNode[]>([])
const edges = ref<{ a: number; b: number }[]>([])
const centerLines = ref<string[]>([])

function trunc(s: string, n = 20) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s
}

function armar() {
  const center = notaPorId(props.id)
  if (!center) return
  const width = Math.max(240, caja.value?.clientWidth ?? 320)
  W.value = width
  const cx = width / 2
  const cy = H / 2

  const degs = new Map<string, number>()
  for (const n of vecinos.value) degs.set(n.id, gradoDe(n.id))
  const maxNodeR = Math.max(12, ...vecinos.value.map(n => radioNodo(degs.get(n.id) ?? 1)))
  const maxLabel = Math.max(40, ...vecinos.value.map(n => trunc(n.titulo).length * 6.2 + 4))
  const spaceX = cx - 28 - maxNodeR - 4 - maxLabel
  const spaceY = cy - 28 - maxNodeR - 4 - 12
  let R = Math.max(24, Math.min(spaceX, spaceY))
  // asegurar separación mínima entre nodos del círculo
  const sepR = ((maxNodeR * 2 + 14) * vecinos.value.length) / (2 * Math.PI)
  if (sepR > R) R = Math.max(24, Math.min(spaceX, spaceY))

  const list = [...vecinos.value]
  const tieneDesborde = desborde.value > 0
  const total = list.length + (tieneDesborde ? 1 : 0)

  const out: LNode[] = []
  // centro
  out.push({
    id: center.id,
    titulo: center.titulo,
    seccion: center.seccion,
    x: cx,
    y: cy,
    r: 13,
    color: COLOR_POR_SECCION[secciones.find(s => s.id === center.seccion)?.acento ?? 'purple'],
    esCentro: true,
    esDesborde: false,
    desbordeN: 0,
    angle: 0
  })

  list.forEach((n, i) => {
    const angle = (i / Math.max(1, total)) * Math.PI * 2 - Math.PI / 2
    out.push({
      id: n.id,
      titulo: n.titulo,
      seccion: n.seccion,
      x: cx + Math.cos(angle) * R,
      y: cy + Math.sin(angle) * R,
      r: radioNodo(degs.get(n.id) ?? 1),
      color: COLOR_POR_SECCION[secciones.find(s => s.id === n.seccion)?.acento ?? 'purple'],
      esCentro: false,
      esDesborde: false,
      desbordeN: 0,
      angle
    })
  })

  if (tieneDesborde) {
    const i = list.length
    const angle = (i / Math.max(1, total)) * Math.PI * 2 - Math.PI / 2
    out.push({
      id: '__overflow__',
      titulo: `+${desborde.value}`,
      seccion: center.seccion,
      x: cx + Math.cos(angle) * R,
      y: cy + Math.sin(angle) * R,
      r: 11,
      color: 'var(--text-muted)',
      esCentro: false,
      esDesborde: true,
      desbordeN: desborde.value,
      angle
    })
  }

  nodes.value = out

  // aristas entre nodos presentes
  const idx = new Map(out.map((n, i) => [n.id, i]))
  const es = []
  for (const [a, b] of aristas()) {
    if (!idx.has(a) || !idx.has(b)) continue
    if (a === '__overflow__' || b === '__overflow__') continue
    es.push({ a: idx.get(a)!, b: idx.get(b)! })
  }
  edges.value = es

  // líneas del centro
  const t = center.titulo
  if (t.length <= 16) centerLines.value = [t]
  else {
    const mid = Math.floor(t.length / 2)
    let cut = t.lastIndexOf(' ', mid)
    if (cut < 4) cut = t.indexOf(' ', mid)
    if (cut < 0) centerLines.value = [t.slice(0, 15) + '…', t.slice(15)]
    else centerLines.value = [t.slice(0, cut), t.slice(cut + 1)]
  }
}

function acentoDe(n: LNode) {
  return secciones.find(s => s.id === n.seccion)?.acento ?? 'purple'
}

const onNodeClick = (n: LNode, e: MouseEvent) => {
  if (n.esDesborde) {
    const el = document.getElementById('menciones')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  if (e.shiftKey || e.ctrlKey || e.metaKey) {
    // peek se implementa en Paso 4
    router.push(`/n/${n.id}`)
    return
  }
  router.push(`/n/${n.id}`)
}

const anchorFor = (n: LNode) => {
  const c = Math.cos(n.angle)
  if (c > 0.25) return 'start'
  if (c < -0.25) return 'end'
  return 'middle'
}

const labelPos = (n: LNode) => {
  const r = n.r + 6
  const x = n.x + Math.cos(n.angle) * r
  const y = n.y + Math.sin(n.angle) * r + 4
  return { x, y }
}

watch(() => props.id, () => armar())
onMounted(() => {
  armar()
})
</script>

<template>
  <div ref="caja" class="grafo-local">
    <div class="toc-title" style="margin-bottom:6px">Conexiones · {{ vecinosTodos.length }}</div>
    <svg :width="W" :height="H" :viewBox="`0 0 ${W} ${H}`" role="img" :aria-label="`Grafo local de la nota`">
      <line
        v-for="(e, i) in edges" :key="'e' + i"
        :x1="nodes[e.a].x" :y1="nodes[e.a].y"
        :x2="nodes[e.b].x" :y2="nodes[e.b].y"
        stroke="rgba(139,148,255,.25)" stroke-width="1"
        :opacity="hover && !(nodes[e.a].id === hover || nodes[e.b].id === hover) ? 0.25 : 0.9"
      />
      <g v-for="(n, i) in nodes" :key="n.id">
        <circle
          :cx="n.x" :cy="n.y" :r="n.r"
          :fill="n.color"
          :stroke="n.esCentro ? '#fff' : 'none'"
          :stroke-width="n.esCentro ? 1.5 : 0"
          :opacity="hover && hover !== n.id ? 0.3 : (n.esCentro ? 1 : 0.92)"
          style="cursor:pointer"
          @click="onNodeClick(n, $event)"
          @pointerenter="hover = n.id; if (!n.esDesborde && n.id !== '__overflow__') scheduleShow(n.id, $event.currentTarget as HTMLElement)"
          @pointerleave="hover = null; scheduleHide()"
          @focus="hover = n.id; if (!n.esDesborde) scheduleShow(n.id, $event.currentTarget as HTMLElement)"
          @blur="hover = null; scheduleHide()"
        >
          <title>{{ n.titulo }}</title>
        </circle>
        <text
          v-if="!n.esCentro"
          :x="labelPos(n).x" :y="labelPos(n).y"
          class="grafo-label"
          :text-anchor="anchorFor(n)"
          :opacity="hover && hover !== n.id ? 0.35 : 0.95"
        >
          <title>{{ n.titulo }}</title>
          {{ trunc(n.titulo) }}
        </text>
        <template v-if="n.esCentro">
          <text
            v-for="(ln, li) in centerLines" :key="li"
            :x="n.x" :y="n.y + (li - (centerLines.length - 1) / 2) * 12"
            text-anchor="middle" class="grafo-label" style="font-weight:600"
          >
            <title>{{ n.titulo }}</title>
            {{ ln }}
          </text>
        </template>
      </g>
    </svg>
    <ul class="sr-only">
      <li v-for="n in vecinos" :key="n.id">{{ n.titulo }}</li>
    </ul>
    <div style="margin-top:8px">
      <button class="btn btn-ghost btn-sm" @click="router.push(`/explorar?foco=${props.id}`)">Ver en el mapa</button>
    </div>
  </div>
</template>

<style scoped>
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
