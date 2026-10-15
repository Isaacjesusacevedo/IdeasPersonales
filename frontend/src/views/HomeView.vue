<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { secciones, notas, notasPorSeccion } from '@/data/vault'
import ConceptCloud from '@/components/ConceptCloud.vue'

const router = useRouter()
const total = computed(() => notas.length)
const porSeccion = computed(() => secciones.map(s => ({ ...s, n: notasPorSeccion(s.id).length })))
const destacadas = computed(() =>
  ['sis-consilium', 'bro-consolidado', 'oxi-indice', 'men-indice-sesgos']
    .map(id => notas.find(n => n.id === id)!)
    .filter(Boolean)
)
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
  const pick = notas[Math.floor(Math.random() * notas.length)]
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
        <div class="page-eyebrow">Ideas Personales · Obsidian Vault</div>
        <h1 class="hero-title">Todo lo que pienso, <span class="grad-text">en un solo lugar</span></h1>
        <p class="hero-sub">{{ total }} notas organizadas en {{ secciones.length }} secciones: decisiones, proyectos, universo narrativo, modelos mentales y apuntes técnicos.</p>
        <div class="hero-actions">
          <RouterLink to="/n/sis-consilium" class="btn btn-primary">Empezar por Consilium</RouterLink>
          <RouterLink to="/explorar" class="btn btn-ghost">Explorar secciones</RouterLink>
        </div>
        <div class="hero-rule" aria-hidden="true"></div>
      </div>
      <ConceptCloud :hero-max="24" :mobile-max="16" :alto="300" />
    </header>

    <div class="stat-grid" role="list">
      <div class="stat-card" role="listitem">
        <div class="stat-label">Notas integradas</div>
        <div class="stat-value">{{ total }}</div>
        <div class="stat-sub">Vault completo navegable</div>
        <div class="stat-bar" aria-hidden="true"></div>
      </div>
      <div class="stat-card" role="listitem">
        <div class="stat-label">Proyectos vivos</div>
        <div class="stat-value">2</div>
        <div class="stat-sub">Brownies + Oxida</div>
        <div class="stat-bar" aria-hidden="true"></div>
      </div>
      <div class="stat-card" role="listitem">
        <div class="stat-label">Secciones</div>
        <div class="stat-value">{{ secciones.length }}</div>
        <div class="stat-sub">Yo · Sistema · Mente…</div>
        <div class="stat-bar" aria-hidden="true"></div>
      </div>
      <div class="stat-card" role="listitem">
        <div class="stat-label">Sistema núcleo</div>
        <div class="stat-value">3</div>
        <div class="stat-sub">Consilium · Decisorium · Plan</div>
        <div class="stat-bar" aria-hidden="true"></div>
      </div>
    </div>

    <div class="card lift" style="margin-bottom:16px">
      <div class="card-header"><div class="card-title">Secciones del vault</div><RouterLink to="/buscar" class="btn btn-ghost">Buscar →</RouterLink></div>
      <div class="grid-2">
        <RouterLink
          v-for="s in porSeccion"
          :key="s.id"
          :to="`/s/${s.id}`"
          class="card"
          :class="s.acento === 'teal' ? 'card--teal' : ''">
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

    <div class="card">
      <div class="card-header">
        <div class="card-title">Descubrí</div>
        <button class="btn btn-ghost btn-sm" @click="sorpresa">Sorprendeme</button>
      </div>
      <div class="grid-3">
        <RouterLink v-for="n in descubrir" :key="n.id" :to="`/n/${n.id}`" class="card">
          <span class="pill">{{ n.categoria }}</span>
          <h3 style="margin:8px 0;font-size:15px">{{ n.titulo }}</h3>
          <p class="clamp-3" style="color:var(--text-muted);font-size:13px">{{ n.resumen }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
