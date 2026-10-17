<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { VueFlow, useVueFlow, MarkerType, Position, Handle, type Edge as FlowEdge } from '@vue-flow/core'
import { notasPorSeccion, notaPorId, secciones, type VaultNote } from '@/data/vault'
import '@vue-flow/core/dist/style.css'

const props = withDefaults(defineProps<{
  mini?: boolean
  temaInicial?: string | null
  tagFiltro?: string | null
  resaltarIds?: string[] | null
  busqueda?: string
  foco?: string | null
}>(), {
  mini: false, temaInicial: null, tagFiltro: null, resaltarIds: null, busqueda: '', foco: null
})

const route = useRoute()
const router = useRouter()
const { fitView } = useVueFlow()

const reducida = ref(false)
const abiertos = ref<string[]>([])
const limite = ref<Record<string, number>>({})
const hoverNota = ref<string | null>(null)
const tip = ref<{ x: number; y: number; texto: string } | null>(null)

const LIMITE = 12
const X_NIVEL = [0, 280, 590]
const H_NODO = 52
const PASO_Y = H_NODO + 12

const colorTema = (sec: string) => {
  const a = secciones.find(s => s.id === sec)?.acento ?? 'purple'
  return a === 'teal' ? '#2dd4bf' : a === 'mix' ? '#9aa3ff' : '#a78bfa'
}

interface N { id: string; type: string; position: { x: number; y: number }; data: Record<string, unknown> }
type E = FlowEdge

const notasDe = (sec: string): VaultNote[] => {
  let ns = notasPorSeccion(sec)
  if (props.tagFiltro) ns = ns.filter(n => (n.tags ?? []).includes(props.tagFiltro!))
  return ns
}

// Coincidencias de búsqueda o tag: atenúan el resto y abren sus ramas
const coincidencias = computed<Set<string> | null>(() => {
  const ids = new Set<string>(props.resaltarIds ?? [])
  if (props.tagFiltro) {
    for (const s of secciones) for (const n of notasDe(s.id)) ids.add(n.id)
  }
  const b = props.busqueda.trim().toLowerCase()
  if (b) {
    for (const s of secciones) {
      for (const n of notasDe(s.id)) {
        if ((n.titulo + ' ' + n.resumen + ' ' + n.categoria).toLowerCase().includes(b)) ids.add(n.id)
      }
    }
  }
  return ids.size ? ids : null
})

const nodes = ref<N[]>([])
const edges = ref<E[]>([])

function construir() {
  const ns: N[] = [{ id: 'root', type: 'root', position: { x: 0, y: 0 }, data: {} }]
  const es: E[] = []
  // y por reparto de hojas
  let cursor = 0
  const temaY: Record<string, number> = {}
  const hojas: { id: string; type: string; x: number; y: number; data: Record<string, unknown> }[] = []
  for (const s of secciones) {
    const abierto = abiertos.value.includes(s.id)
    if (props.mini || !abierto) {
      temaY[s.id] = cursor
      cursor += PASO_Y
      continue
    }
    const todas = notasDe(s.id)
    const vis = todas.slice(0, limite.value[s.id] ?? LIMITE)
    const inicio = cursor
    for (const n of vis) {
      hojas.push({
        id: `n-${n.id}`, type: 'nota', x: X_NIVEL[2], y: cursor,
        data: { noteId: n.id, titulo: n.titulo, categoria: n.categoria, color: colorTema(s.id) }
      })
      cursor += PASO_Y
    }
    if (todas.length > vis.length) {
      hojas.push({
        id: `m-${s.id}`, type: 'mas', x: X_NIVEL[2], y: cursor,
        data: { sec: s.id, restantes: todas.length - vis.length, color: colorTema(s.id) }
      })
      cursor += PASO_Y
    }
    temaY[s.id] = inicio + (cursor - inicio - 12) / 2 - H_NODO / 2
  }
  const ys = secciones.map(s => temaY[s.id])
  const yRoot = (Math.min(...ys) + Math.max(...ys)) / 2
  ns[0].position = { x: X_NIVEL[0], y: yRoot }
  for (const s of secciones) {
    const c = colorTema(s.id)
    ns.push({
      id: `t-${s.id}`, type: 'tema', position: { x: X_NIVEL[1], y: temaY[s.id] },
      data: { sec: s.id, nombre: s.nombre, n: notasDe(s.id).length, color: c, abierto: abiertos.value.includes(s.id) }
    })
    es.push({
      id: `e-root-${s.id}`, source: 'root', target: `t-${s.id}`,
      animated: !reducida.value && !!rutaHover.value && rutaHover.value[0] === s.id,
      style: { stroke: c, strokeOpacity: 0.55, strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: c, width: 14, height: 14 }
    })
  }
  for (const h of hojas) {
    ns.push({ id: h.id, type: h.type, position: { x: h.x, y: h.y }, data: h.data })
    const sec = h.type === 'mas' ? String(h.data.sec) : notaPorId(String(h.data.noteId))?.seccion ?? ''
    const c = colorTema(sec)
    es.push({
      id: `e-${h.id}`, source: `t-${sec}`, target: h.id,
      animated: !reducida.value && !!rutaHover.value && rutaHover.value[1] === h.id,
      style: { stroke: c, strokeOpacity: 0.55, strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: c, width: 14, height: 14 }
    })
  }
  // Líneas punteadas a relacionadas visibles
  if (hoverNota.value) {
    const n = notaPorId(hoverNota.value)
    const visibles = new Set(ns.map(x => x.id))
    for (const r of n?.relaciones ?? []) {
      if (visibles.has(`n-${r}`)) {
        es.push({
          id: `r-${hoverNota.value}-${r}`, source: `n-${hoverNota.value}`, target: `n-${r}`,
          style: { stroke: '#e8ebf7', strokeOpacity: 0.5, strokeWidth: 1, strokeDasharray: '4 4' }
        })
      }
    }
  }
  animarHacia(ns)
  edges.value = es
}

const posAnteriores = new Map<string, { x: number; y: number }>()
let raf = 0

function animarHacia(nuevos: N[]) {
  cancelAnimationFrame(raf)
  const prev = new Map<string, { x: number; y: number }>()
  for (const n of nodes.value) prev.set(n.id, { ...n.position })
  nodes.value = nuevos
  if (reducida.value) return
  const t0 = performance.now()
  const DUR = 300
  const paso = (t: number) => {
    const k = Math.min(1, (t - t0) / DUR)
    const e = 1 - Math.pow(1 - k, 3)
    for (const n of nodes.value) {
      const p = prev.get(n.id) ?? posAnteriores.get(n.id)
      if (!p) continue
      const dest = nuevos.find(m => m.id === n.id)
      if (!dest) continue
      n.position = { x: p.x + (dest.position.x - p.x) * e, y: p.y + (dest.position.y - p.y) * e }
    }
    if (k < 1) raf = requestAnimationFrame(paso)
  }
  raf = requestAnimationFrame(paso)
  for (const n of nuevos) posAnteriores.set(n.id, { ...n.position })
}

// Ruta resaltada en hover: [tema, idNodoNota?]
const rutaHover = computed<[string, string | null] | null>(() => {
  if (!hoverNota.value) return null
  const n = notaPorId(hoverNota.value)
  if (!n) return null
  return [n.seccion, `n-${n.id}`]
})

function toggleTema(sec: string) {
  if (props.mini) {
    router.push({ path: '/explorar', query: { ...route.query, vista: 'mapa', tema: sec } })
    return
  }
  // acordeón: abrir uno cierra el resto
  abiertos.value = abiertos.value.includes(sec) ? [] : [sec]
  nextTickFit()
}

function expandirTodo() {
  abiertos.value = secciones.map(s => s.id)
  nextTickFit()
}
function colapsarTodo() {
  abiertos.value = []
  nextTickFit()
}
function masNotas(sec: string) {
  limite.value = { ...limite.value, [sec]: (limite.value[sec] ?? LIMITE) + 50 }
  construir()
}

function nextTickFit() {
  construir()
  nextTick(() => {
    try { fitView({ padding: 0.12, duration: reducida.value ? 0 : 300 }) } catch { /* aún no listo */ }
  })
}

const onHoverNota = (id: string | null, e?: PointerEvent) => {
  hoverNota.value = id
  if (id && e) {
    const cont = (e.currentTarget as HTMLElement).closest('.mapa-caja')?.getBoundingClientRect()
    const n = notaPorId(id)
    tip.value = {
      x: cont ? e.clientX - cont.left : e.clientX,
      y: cont ? e.clientY - cont.top : e.clientY,
      texto: n?.resumen ?? ''
    }
  } else {
    tip.value = null
  }
  construir()
}

watch(() => props.foco, v => {
  if (!v) return
  const n = notaPorId(v)
  if (n && !props.mini) { abiertos.value = [n.seccion]; construir() }
  nextTick(() => { try { fitView({ nodes: [`n-${v}`], padding: 0.35, duration: reducida.value ? 0 : 400 }) } catch { /* */ } })
})
watch(() => props.temaInicial, v => {
  if (v && !props.mini) {
    abiertos.value = [v]
    construir()
  }
})
watch([() => props.tagFiltro, () => props.busqueda, () => props.resaltarIds], () => {
  // abre ramas con coincidencias
  if (props.mini) return
  const c = coincidencias.value
  if (!c) return
  const temas = new Set<string>()
  for (const id of c) {
    const n = notaPorId(id)
    if (n) temas.add(n.seccion)
  }
  if (temas.size) abiertos.value = [...temas]
  construir()
})

onMounted(() => {
  reducida.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (props.temaInicial && !props.mini) abiertos.value = [props.temaInicial]
  // tag abre sus ramas
  if (props.tagFiltro && !props.mini) {
    const temas = new Set<string>()
    for (const s of secciones) if (notasDe(s.id).length) temas.add(s.id)
    if (temas.size) abiertos.value = [...temas]
  }
  construir()
  if (props.foco) {
    const n = notaPorId(props.foco)
    if (n && !props.mini) abiertos.value = [n.seccion]
    construir()
    nextTick(() => {
      try { fitView({ nodes: [`n-${props.foco}`], padding: 0.35, duration: reducida.value ? 0 : 400 }) } catch { /* */ }
    })
  }
})
</script>

<template>
  <div class="mapa-caja" :class="{ mini }">
    <VueFlow
      :nodes="nodes" :edges="edges"
      :nodes-draggable="false" :nodes-connectable="false"
      :min-zoom="0.4" :max-zoom="1.6"
      :zoom-on-scroll="!mini" :zoom-on-pinch="!mini" :pan-on-drag="!mini"
      :zoom-on-double-click="false" :prevent-scrolling="false"
      :fit-view-on-init="true" :fit-view-on-init-options="{ padding: 0.15 }">
      <template #node-root>
        <button class="flownode flow-root" aria-label="Mis ideas, raíz del mapa" @click="router.push('/')">
          <span class="flow-hex" aria-hidden="true">IP</span>
          <span class="flow-t">Mis ideas</span>
        </button>
        <Handle type="source" :position="Position.Right" class="flow-handle" />
      </template>
      <template #node-tema="p">
        <button class="flownode" :style="{ borderColor: String(p.data.color) }"
          :aria-expanded="abiertos.includes(String(p.data.sec))"
          :aria-label="`Tema ${p.data.nombre}, ${p.data.n} notas`"
          @click="toggleTema(String(p.data.sec))">
          <span class="flow-dot" :style="{ background: String(p.data.color) }" aria-hidden="true"></span>
          <span>
            <span class="flow-t">{{ p.data.nombre }}</span>
            <span class="flow-s mono">{{ p.data.n }} notas</span>
          </span>
        </button>
        <Handle type="target" :position="Position.Left" class="flow-handle" />
        <Handle type="source" :position="Position.Right" class="flow-handle" />
      </template>
      <template #node-nota="p">
        <RouterLink :to="`/n/${p.data.noteId}`" class="flownode"
          :style="{ borderColor: String(p.data.color) }"
          :aria-label="`Nota ${p.data.titulo}`"
          @pointerenter="onHoverNota(String(p.data.noteId), $event)"
          @pointerleave="onHoverNota(null)"
          @focus="onHoverNota(String(p.data.noteId))"
          @blur="onHoverNota(null)">
          <span class="flow-t flow-t--sm">{{ p.data.titulo }}</span>
          <span class="flow-s mono">{{ p.data.categoria }}</span>
        </RouterLink>
        <Handle type="target" :position="Position.Left" class="flow-handle" />
      </template>
      <template #node-mas="p">
        <button class="flownode flow-mas" :aria-label="`Mostrar más notas del tema`"
          @click="masNotas(String(p.data.sec))">
          <span class="flow-t">+{{ p.data.restantes }} más</span>
        </button>
        <Handle type="target" :position="Position.Left" class="flow-handle" />
      </template>
      <slot />
    </VueFlow>
    <div v-if="tip" class="flow-tip" :style="{ left: tip.x + 12 + 'px', top: tip.y - 10 + 'px' }">{{ tip.texto }}</div>
  </div>
</template>
