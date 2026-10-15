<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ideas } from '@/data/ideas'

const total = computed(() => ideas.length)
const nuevas = computed(() => ideas.filter(i => i.estado === 'nueva').length)
const enCurso = computed(() => ideas.filter(i => i.estado === 'en-curso').length)
const hechas = computed(() => ideas.filter(i => i.estado === 'hecha').length)

const estadoBadge = (e: string) =>
  e === 'nueva' ? 'badge-blue' : e === 'en-curso' ? 'badge-amber' : 'badge-green'

const recientes = computed(() => [...ideas].slice(0, 3))
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Ideas Personales · réplica La Industrial</div>
      <h1 class="page-title">Dashboard de Ideas</h1>
      <p class="page-subtitle">Lee tus ideas siempre que necesites — misma esencia visual: sidebar 220px, Syne + DM Sans + Mono, cards y tablas.</p>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Total ideas</div>
        <div class="stat-value">{{ total }}</div>
        <div class="stat-sub">Archivo vivo en IDEAS.md</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-label">En curso</div>
        <div class="stat-value">{{ enCurso }}</div>
        <div class="stat-sub">Prioridad inmediata</div>
      </div>
      <div class="stat-card green">
        <div class="stat-label">Hechas</div>
        <div class="stat-value">{{ hechas }}</div>
        <div class="stat-sub">Ya concretadas</div>
      </div>
      <div class="stat-card red">
        <div class="stat-label">Nuevas</div>
        <div class="stat-value">{{ nuevas }}</div>
        <div class="stat-sub">Por revisar</div>
      </div>
    </div>

    <div class="card" style="margin-bottom:16px">
      <div class="card-header">
        <div class="card-title">Recientes</div>
        <RouterLink to="/ideas" class="btn btn-ghost">Ver todas →</RouterLink>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Título</th><th>Categoría</th><th>Estado</th><th class="num">Fecha</th></tr>
          </thead>
          <tbody>
            <tr v-for="idea in recientes" :key="idea.id">
              <td><RouterLink :to="`/ideas/${idea.id}`" style="color:var(--accent-bright);text-decoration:none">{{ idea.titulo }}</RouterLink></td>
              <td><span class="badge badge-blue">{{ idea.categoria }}</span></td>
              <td><span class="badge" :class="estadoBadge(idea.estado)">{{ idea.estado }}</span></td>
              <td class="num mono">{{ idea.fecha }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:12px">Backend (cuando lo necesites)</div>
      <p style="color:var(--text-2);font-size:14px">
        Hoy es <span class="mono">solo lectura visual</span> sin API.
        Si luego quieres CRUD real, replicamos el N-Tier de La Industrial:
        <span class="mono">API → BR → AD + SQL Server + JWT</span> con endpoints
        <span class="mono">GET/POST/PUT/DELETE /api/ideas</span>.
      </p>
    </div>
  </div>
</template>
