<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { tagIndex, notasPorTag } from '@/data/vault-index'
import { secciones, notasPorSeccion, notaPorId } from '@/data/vault'

const IdeaFlow = defineAsyncComponent(() => import('@/components/IdeaFlow.vue'))
const GraphView = defineAsyncComponent(() => import('@/components/GraphView.vue'))

const route = useRoute()
const router = useRouter()

type Vista = 'mapa' | 'lista' | 'red'
const esMovil = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

const vista = ref<Vista>(
  route.query.vista === 'lista' || route.query.vista === 'red' || route.query.vista === 'mapa'
    ? (route.query.vista as Vista)
    : esMovil() ? 'lista' : 'mapa'
)
const tema = ref<string | null>((route.query.tema as string) ?? null)
const tag = ref<string | null>((route.query.tag as string) ?? null)
const foco = ref<string | null>((route.query.foco as string) ?? null)
const q = ref('')
const abiertos = ref<string[]>([])

watch(
  () => route.query,
  v => {
    if (v.vista === 'mapa' || v.vista === 'lista' || v.vista === 'red') vista.value = v.vista
    tema.value = (v.tema as string) ?? null
    tag.value = (v.tag as string) ?? null
    foco.value = (v.foco as string) ?? null
    if (v.foco) {
      const n = notaPorId(v.foco as string)
      if (n) { tema.value = n.seccion; vista.value = 'mapa' }
    }
  }
)

const ir = (v: Vista) => {
  vista.value = v
  router.replace({ query: { ...route.query, vista: v } })
}

const topTags = computed(() =>
  Object.entries(tagIndex)
    .map(([t, ns]) => ({ tag: t, n: ns.length }))
    .sort((a, b) => b.n - a.n || (a.tag < b.tag ? -1 : 1))
    .slice(0, 12)
)
const todas = computed(() => Object.keys(tagIndex).sort())
const verTodas = ref(false)
const chips = computed<string[]>(() =>
  verTodas.value ? todas.value : topTags.value.map(x => x.tag)
)

const setTag = (t: string | null) => {
  tag.value = t
  router.replace({ query: { ...route.query, tag: t ?? undefined } })
}

// Ids que coinciden con la búsqueda (para resaltar en el mapa)
const resaltarIds = computed<string[] | null>(() => {
  const out: string[] = []
  if (foco.value) out.push(foco.value)
  const b = q.value.trim().toLowerCase()
  if (b) {
    for (const s of secciones) {
      for (const n of notasPorSeccion(s.id)) {
        if ((n.titulo + ' ' + n.resumen + ' ' + n.categoria).toLowerCase().includes(b)) out.push(n.id)
      }
    }
  }
  return out.length ? out : null
})

const toggleTemaLista = (id: string) => {
  abiertos.value = abiertos.value.includes(id)
    ? abiertos.value.filter(x => x !== id)
    : [...abiertos.value, id]
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Caminos entre notas</div>
      <h1 class="page-title">Mapa de <span class="grad-text">ideas</span></h1>
      <p class="page-subtitle">De la raíz a los temas y a las notas. Tocá un tema para abrirlo.</p>
    </div>

    <input v-model="q" class="cmd-input" placeholder="Buscar en el mapa…" aria-label="Buscar en el mapa" style="margin-bottom:12px;max-width:340px" />

    <div class="tag-row" style="margin-top:0;margin-bottom:14px" role="group" aria-label="Filtrar por etiqueta">
      <button class="pill filtro-chip" :class="{ active: !tag }" @click="setTag(null)">Todas</button>
      <button v-for="t in chips" :key="t"
        class="pill filtro-chip" :class="{ active: tag === t }"
        @click="setTag(tag === t ? null : t)">
        #{{ t }}
      </button>
      <button class="pill filtro-chip" @click="verTodas = !verTodas">{{ verTodas ? 'ver menos' : 'ver todas' }}</button>
    </div>

    <div class="tabs" role="tablist" aria-label="Vista de exploración">
      <button class="tab" :class="{ active: vista === 'mapa' }" role="tab" :aria-selected="vista === 'mapa'" @click="ir('mapa')">Mapa</button>
      <button class="tab" :class="{ active: vista === 'lista' }" role="tab" :aria-selected="vista === 'lista'" @click="ir('lista')">Lista</button>
      <button class="tab" :class="{ active: vista === 'red' }" role="tab" :aria-selected="vista === 'red'" @click="ir('red')">Red</button>
    </div>

    <div v-if="vista === 'mapa'" class="card mapa-marco">
      <IdeaFlow :tema-inicial="tema" :tag-filtro="tag" :resaltar-ids="resaltarIds" :busqueda="q" :foco="foco" />
      <div class="mapa-acciones">
        <span class="id-mono">Pan y zoom con el ratón · clic en un tema para abrirlo</span>
      </div>
    </div>

    <div v-else-if="vista === 'lista'" class="card">
      <div class="card-title" style="margin-bottom:12px">Árbol de temas</div>
      <div class="arbol">
        <div v-for="s in secciones" :key="s.id" class="arbol-tema">
          <button class="arbol-btn" :aria-expanded="abiertos.includes(s.id)" @click="toggleTemaLista(s.id)">
            <span class="sec-dot" :class="`sec-dot--${s.acento ?? 'purple'}`" aria-hidden="true"></span>
            <strong>{{ s.nombre }}</strong>
            <span class="id-mono">{{ notasPorSeccion(s.id).length }} notas</span>
            <span class="arbol-flecha" aria-hidden="true">{{ abiertos.includes(s.id) ? '▾' : '▸' }}</span>
          </button>
          <div v-if="abiertos.includes(s.id)" class="arbol-notas">
            <RouterLink v-for="n in notasPorSeccion(s.id)" :key="n.id" :to="`/n/${n.id}`" class="arbol-nota">
              <span>{{ n.titulo }}</span>
              <span class="id-mono">{{ n.categoria }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card">
      <GraphView />
    </div>
  </div>
</template>
