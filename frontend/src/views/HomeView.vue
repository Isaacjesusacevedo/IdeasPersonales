<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { secciones, notas, notasPorSeccion } from '@/data/vault'

const total = computed(() => notas.length)
const porSeccion = computed(() => secciones.map(s => ({ ...s, n: notasPorSeccion(s.id).length })))
const destacadas = computed(() =>
  ['sis-consilium', 'bro-consolidado', 'oxi-indice', 'men-indice-sesgos']
    .map(id => notas.find(n => n.id === id)!)
    .filter(Boolean)
)
const badgeDe = (seccion: string) => {
  const a = secciones.find(s => s.id === seccion)?.acento ?? 'purple'
  return a === 'teal' ? 'badge-teal' : a === 'mix' ? 'badge-muted' : 'badge-purple'
}
</script>

<template>
  <div class="page">
    <header class="hero">
      <div class="page-eyebrow">Ideas Personales · Obsidian Vault</div>
      <h1 class="hero-title">Todo lo que pienso, <span class="grad-text">en un solo lugar</span></h1>
      <p class="hero-sub">{{ total }} notas organizadas en {{ secciones.length }} secciones: decisiones, proyectos, universo narrativo, modelos mentales y apuntes técnicos.</p>
      <div class="hero-actions">
        <RouterLink to="/n/sis-consilium" class="btn btn-primary">Empezar por Consilium</RouterLink>
        <RouterLink to="/buscar" class="btn btn-ghost">Explorar secciones</RouterLink>
      </div>
      <div class="hero-rule" aria-hidden="true"></div>
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

    <div class="card">
      <div class="card-title" style="margin-bottom:12px">Empieza por aquí</div>
      <div class="table-wrap"><table><thead><tr><th>Nota</th><th>Sección</th><th>Resumen</th></tr></thead>
      <tbody><tr v-for="n in destacadas" :key="n.id">
        <td><RouterLink :to="`/n/${n.id}`" class="row-link">{{ n.titulo }}</RouterLink></td>
        <td><span class="badge" :class="badgeDe(n.seccion)">{{ n.seccion }}</span></td>
        <td>{{ n.resumen }}</td>
      </tr></tbody></table></div>
    </div>
  </div>
</template>
