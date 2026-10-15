<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { secciones, notas, notasPorSeccion } from '@/data/vault'

const total = computed(() => notas.length)
const porSeccion = computed(() => secciones.map(s => ({ ...s, n: notasPorSeccion(s.id).length })))
const destacadas = computed(() => ['sis-consilium', 'bro-consolidado', 'oxi-indice', 'men-indice-sesgos'].map(id => notas.find(n => n.id === id)!).filter(Boolean))
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Obsidian Vault → Web · estilo La Industrial</div>
      <h1 class="page-title">Dashboard de Ideas</h1>
      <p class="page-subtitle">76 notas de Obsidian organizadas en {{ secciones.length }} secciones navegables. Todo estático, listo para GitHub Pages.</p>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Notas integradas</div>
        <div class="stat-value">{{ total }}</div>
        <div class="stat-sub">Vault completo resumido</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-label">Proyectos vivos</div>
        <div class="stat-value">2</div>
        <div class="stat-sub">Brownies + Oxida</div>
      </div>
      <div class="stat-card green">
        <div class="stat-label">Secciones</div>
        <div class="stat-value">{{ secciones.length }}</div>
        <div class="stat-sub">Yo · Sistema · Mente…</div>
      </div>
      <div class="stat-card red">
        <div class="stat-label">Sistema núcleo</div>
        <div class="stat-value">3</div>
        <div class="stat-sub">Consilium · Decisorium · Plan</div>
      </div>
    </div>

    <div class="card" style="margin-bottom:16px">
      <div class="card-header"><div class="card-title">Secciones del vault</div><RouterLink to="/buscar" class="btn btn-ghost">Buscar →</RouterLink></div>
      <div class="grid-2">
        <RouterLink v-for="s in porSeccion" :key="s.id" :to="`/s/${s.id}`" class="card" style="text-decoration:none;padding:18px">
          <div class="mono" style="font-size:11px;color:var(--accent)">{{ s.n }} notas · {{ s.subtitulo }}</div>
          <h3 style="margin:6px 0">{{ s.nombre }}</h3>
          <p style="color:var(--text-2);font-size:13px">{{ s.descripcion }}</p>
        </RouterLink>
      </div>
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:12px">Empieza por aquí</div>
      <div class="table-wrap"><table><thead><tr><th>Nota</th><th>Sección</th><th>Resumen</th></tr></thead>
      <tbody><tr v-for="n in destacadas" :key="n.id">
        <td><RouterLink :to="`/n/${n.id}`" style="color:var(--accent-bright);text-decoration:none;font-weight:600">{{ n.titulo }}</RouterLink></td>
        <td><span class="badge badge-blue">{{ n.seccion }}</span></td>
        <td>{{ n.resumen }}</td>
      </tr></tbody></table></div>
    </div>
  </div>
</template>
