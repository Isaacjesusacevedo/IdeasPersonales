<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { buscarNotas, resaltar, tagIndex, todasLasTags, type Frag } from '@/data/vault-index'
import { secciones } from '@/data/vault'

const route = useRoute()
const router = useRouter()

const q = ref((route.query.q as string) ?? '')
const fSeccion = ref((route.query.seccion as string) ?? '')
const fTipo = ref((route.query.tipo as string) ?? '')
const fTag = ref((route.query.tag as string) ?? '')
const orden = ref((route.query.orden as string) === 'az' ? 'az' : 'rel')

const tipos = ['articulo', 'ficha', 'coleccion', 'proyecto', 'indice']
const sugeridas = computed(() =>
  Object.entries(tagIndex)
    .map(([tag, ns]) => ({ tag, n: ns.length }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 5)
)

const sincronizar = () => {
  const query: Record<string, string> = {}
  if (q.value.trim()) query.q = q.value.trim()
  if (fSeccion.value) query.seccion = fSeccion.value
  if (fTipo.value) query.tipo = fTipo.value
  if (fTag.value) query.tag = fTag.value
  if (orden.value === 'az') query.orden = 'az'
  router.replace({ query })
}

let t: number | undefined
const programaSync = () => {
  window.clearTimeout(t)
  t = window.setTimeout(sincronizar, 350)
}
watch([q, fSeccion, fTipo, fTag, orden], programaSync)
watch(
  () => route.query,
  v => {
    q.value = (v.q as string) ?? ''
    fSeccion.value = (v.seccion as string) ?? ''
    fTipo.value = (v.tipo as string) ?? ''
    fTag.value = (v.tag as string) ?? ''
    orden.value = (v.orden as string) === 'az' ? 'az' : 'rel'
  }
)

const resultados = computed(() => {
  let hits = buscarNotas(q.value)
  if (fSeccion.value) hits = hits.filter(h => h.nota.seccion === fSeccion.value)
  if (fTipo.value) hits = hits.filter(h => (h.nota.tipo ?? 'articulo') === fTipo.value)
  if (fTag.value) hits = hits.filter(h => (h.nota.tags ?? []).includes(fTag.value))
  if (orden.value === 'az') hits = [...hits].sort((a, b) => (a.nota.titulo < b.nota.titulo ? -1 : 1))
  return hits.slice(0, 80)
})

const frags = (texto: string): Frag[] => resaltar(texto, q.value)
const badgeDe = (seccion: string) => {
  const a = secciones.find(s => s.id === seccion)?.acento ?? 'purple'
  return a === 'teal' ? 'badge-teal' : a === 'mix' ? 'badge-muted' : 'badge-purple'
}
const limpiar = () => {
  q.value = ''
  fSeccion.value = ''
  fTipo.value = ''
  fTag.value = ''
  orden.value = 'rel'
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Búsqueda local · sin backend</div>
        <h1 class="page-title">Buscar en <span class="grad-text">mis notas</span></h1>
      <p class="page-subtitle">{{ resultados.length }} resultados{{ q.trim() ? ` para "${q.trim()}"` : '' }}</p>
    </div>

    <input v-model="q" class="cmd-input cmd-input--big" placeholder="Ej: DAVA, brownie, sesgo, Luciano…" aria-label="Buscar en mis notas" style="margin-bottom:12px" />

    <div class="filtros" role="group" aria-label="Filtros">
      <div class="filtro-grupo">
        <span class="id-mono">Tema</span>
        <button v-for="s in secciones" :key="s.id" class="pill filtro-chip" :class="{ active: fSeccion === s.id }" :aria-pressed="fSeccion === s.id" @click="fSeccion = fSeccion === s.id ? '' : s.id">{{ s.nombre }}</button>
      </div>
      <div class="filtro-grupo">
        <span class="id-mono">Tipo</span>
        <button v-for="t in tipos" :key="t" class="pill filtro-chip" :class="{ active: fTipo === t }" :aria-pressed="fTipo === t" @click="fTipo = fTipo === t ? '' : t">{{ t }}</button>
      </div>
      <div class="filtro-grupo">
        <span class="id-mono">Etiqueta</span>
        <input v-model="fTag" list="tags-todas" class="form-input" placeholder="Filtrar por etiqueta…" aria-label="Filtrar por etiqueta" style="max-width:220px" />
        <datalist id="tags-todas">
          <option v-for="t in todasLasTags()" :key="t" :value="t" />
        </datalist>
        <span v-if="fTag" class="pill active">#{{ fTag }} <button @click="fTag = ''" aria-label="Quitar filtro de etiqueta" style="background:none;border:none;color:inherit;cursor:pointer">✕</button></span>
      </div>
      <div class="filtro-grupo">
        <span class="id-mono">Orden</span>
        <button class="pill filtro-chip" :class="{ active: orden === 'rel' }" @click="orden = 'rel'">Relevancia</button>
        <button class="pill filtro-chip" :class="{ active: orden === 'az' }" @click="orden = 'az'">A–Z</button>
        <button class="btn btn-ghost btn-sm" @click="limpiar">Limpiar</button>
      </div>
    </div>

    <div v-if="!resultados.length" class="card empty">
      <h3>Sin resultados</h3>
      <p>Probá con otra palabra o con una de estas etiquetas:</p>
      <div class="tag-row" style="justify-content:center">
        <button v-for="s in sugeridas" :key="s.tag" class="pill" @click="fTag = s.tag; q = ''">#{{ s.tag }}</button>
      </div>
    </div>
    <div v-else class="table-wrap"><table><thead><tr><th>Nota</th><th>Tema</th><th>Resumen</th></tr></thead>
    <tbody><tr v-for="h in resultados" :key="h.nota.id">
      <td>
        <RouterLink :to="`/n/${h.nota.id}`" class="row-link"><template v-for="(f, j) in frags(h.nota.titulo)" :key="j"><mark v-if="f.mark">{{ f.texto }}</mark><template v-else>{{ f.texto }}</template></template></RouterLink>
        <div class="id-mono">{{ h.nota.id }} · {{ h.nota.tipo ?? 'articulo' }}</div>
      </td>
      <td><span class="badge" :class="badgeDe(h.nota.seccion)">{{ h.nota.seccion }}</span></td>
      <td><template v-for="(f, j) in frags(h.nota.resumen)" :key="j"><mark v-if="f.mark">{{ f.texto }}</mark><template v-else>{{ f.texto }}</template></template></td>
    </tr></tbody></table></div>
  </div>
</template>
