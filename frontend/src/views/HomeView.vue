<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { secciones, notas, notasPorSeccion } from '@/data/vault'
import { useVisited } from '@/composables/useVisited'

const IdeaFlowMini = defineAsyncComponent(() => import('@/components/IdeaFlow.vue'))

const { isVisited, recent, unvisited } = useVisited()
const router = useRouter()
const total = computed(() => notas.length)
const porSeccion = computed(() => secciones.map(s => ({ ...s, n: notasPorSeccion(s.id).length })))
// La última card ocupa el resto de su fila si las de 1 columna son impares
const esUltimoImpar = (id: string) => {
  const simples = porSeccion.value.filter(s => s.n < 15)
  return simples.length % 2 === 1 && simples[simples.length - 1]?.id === id
}
const destacadas = computed(() =>
  ['sis-consilium', 'bro-consolidado', 'oxi-indice', 'men-indice-sesgos']
    .map(id => notas.find(n => n.id === id)!)
    .filter(Boolean)
)
const segui = computed(() => recent(3))
const sinLeer = computed(() => unvisited(notas, 3))
// 3 notas distintas por carga para el bloque Descubrí
const descubrir = computed(() => {
  const pool = [...notas]
  const out = []
  while (out.length < 3 && pool.length) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
  }
  return out
})
const sorpresa = () => {
  const pick = unvisited(notas, 1)[0] ?? notas[Math.floor(Math.random() * notas.length)]
  if (pick) router.push(`/n/${pick.id}`)
}
const badgeDe = (seccion: string) => {
  const a = secciones.find(s => s.id === seccion)?.acento ?? 'purple'
  return a === 'teal' ? 'badge-teal' : a === 'mix' ? 'badge-muted' : 'badge-purple'
}
</script>

<template>
  <div class="page">
    <header class="hero hero-grid">
      <div>
        <div class="page-eyebrow">Ideas Personales</div>
        <h1 class="hero-title">Mis ideas, <span class="grad-text">conectadas</span>.</h1>
        <p class="hero-sub">{{ total }} notas sobre cómo pienso, decido y construyo: decisiones, proyectos, universo narrativo, modelos mentales y apuntes técnicos. Seguí los caminos entre ellas.</p>
        <div class="hero-actions">
          <RouterLink to="/n/sis-consilium" class="btn btn-primary">Empezar por Consilium</RouterLink>
          <RouterLink to="/explorar" class="btn btn-ghost">Abrir el mapa →</RouterLink>
        </div>
        <div class="hero-rule" aria-hidden="true"></div>
      </div>
      <div class="card mapa-mini">
        <div class="card-header">
          <div class="card-title">Mapa de ideas</div>
          <RouterLink to="/explorar" class="btn btn-ghost btn-sm">Abrir el mapa →</RouterLink>
        </div>
        <Suspense>
          <IdeaFlowMini :mini="true" />
          <template #fallback><div class="mapa-ph" aria-hidden="true"></div></template>
        </Suspense>
      </div>
    </header>

    <div class="stat-grid" role="list">
      <div class="stat-card" role="listitem">
        <div class="stat-label">Notas</div>
        <div class="stat-value">{{ total }}</div>
        <div class="stat-sub">Todas conectadas</div>
        <div class="stat-bar" aria-hidden="true"></div>
      </div>
      <div class="stat-card" role="listitem">
        <div class="stat-label">Proyectos</div>
        <div class="stat-value">2</div>
        <div class="stat-sub">Brownies + Oxida</div>
        <div class="stat-bar" aria-hidden="true"></div>
      </div>
      <div class="stat-card" role="listitem">
        <div class="stat-label">Temas</div>
        <div class="stat-value">{{ secciones.length }}</div>
        <div class="stat-sub">De Yo a Ideas sueltas</div>
        <div class="stat-bar" aria-hidden="true"></div>
      </div>
      <div class="stat-card" role="listitem">
        <div class="stat-label">Núcleo</div>
        <div class="stat-value">3</div>
        <div class="stat-sub">Consilium · Decisorium · Plan</div>
        <div class="stat-bar" aria-hidden="true"></div>
      </div>
    </div>

    <div class="card lift" style="margin-bottom:16px">
      <div class="card-header"><div class="card-title">Mis temas</div><RouterLink to="/explorar" class="btn btn-ghost">Ver en el mapa →</RouterLink></div>
      <div class="bento">
        <RouterLink
          v-for="(s, idx) in porSeccion"
          :key="s.id"
          :to="`/s/${s.id}`"
          v-reveal="(idx % 4) * 70"
          class="card"
          :class="[{ 'card--teal': s.acento === 'teal', 'bento-wide': s.n >= 15, 'bento-fill': esUltimoImpar(s.id) }]">
          <div class="mono" style="font-size:11px;color:var(--teal)">{{ s.n }} notas · {{ s.subtitulo }}</div>
          <h3 style="margin:6px 0;display:flex;align-items:center">{{ s.nombre }}
            <svg class="sec-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </h3>
          <p style="color:var(--text-muted);font-size:13px">{{ s.descripcion }}</p>
        </RouterLink>
      </div>
    </div>

    <div class="card" style="margin-bottom:16px">
      <div class="card-title" style="margin-bottom:12px">Empieza por aquí</div>
      <div class="table-wrap"><table><thead><tr><th>Nota</th><th>Sección</th><th>Resumen</th></tr></thead>
      <tbody><tr v-for="n in destacadas" :key="n.id">
        <td><RouterLink :to="`/n/${n.id}`" class="row-link">{{ n.titulo }}</RouterLink></td>
        <td><span class="badge" :class="badgeDe(n.seccion)">{{ n.seccion }}</span></td>
        <td>{{ n.resumen }}</td>
      </tr></tbody></table></div>
    </div>

    <div v-if="segui.length" class="card" style="margin-bottom:16px">
      <div class="card-title" style="margin-bottom:12px">Seguí donde quedaste</div>
      <div class="grid-3">
        <RouterLink v-for="n in segui" :key="n.id" :to="`/n/${n.id}`" class="card">
          <span class="pill" style="display:inline-flex;align-items:center;gap:6px">
            <span class="visited-dot" aria-hidden="true"></span>{{ n.categoria }}
          </span>
          <h3 style="margin:8px 0;font-size:15px">{{ n.titulo }}</h3>
          <p class="clamp-3" style="color:var(--text-muted);font-size:13px">{{ n.resumen }}</p>
        </RouterLink>
      </div>
    </div>

    <div v-if="sinLeer.length" class="card" style="margin-bottom:16px">
      <div class="card-title" style="margin-bottom:12px">Sin leer</div>
      <div class="grid-3">
        <RouterLink v-for="n in sinLeer" :key="n.id" :to="`/n/${n.id}`" class="card">
          <span class="pill">{{ n.categoria }}</span>
          <h3 style="margin:8px 0;font-size:15px">{{ n.titulo }}</h3>
          <p class="clamp-3" style="color:var(--text-muted);font-size:13px">{{ n.resumen }}</p>
        </RouterLink>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Descubrí</div>
        <button class="btn btn-ghost btn-sm" @click="sorpresa">Sorprendeme</button>
      </div>
      <div class="grid-3">
        <RouterLink v-for="(n, idx) in descubrir" :key="n.id" :to="`/n/${n.id}`" v-reveal="idx * 70" class="card">
          <span class="pill">{{ n.categoria }}</span>
          <h3 style="margin:8px 0;font-size:15px">{{ n.titulo }}</h3>
          <p class="clamp-3" style="color:var(--text-muted);font-size:13px">{{ n.resumen }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
