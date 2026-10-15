<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ideas } from '@/data/ideas'

const route = useRoute()
const idea = computed(() => ideas.find(i => i.id === route.params.id))

const estadoBadge = (e: string) =>
  e === 'nueva' ? 'badge-blue' : e === 'en-curso' ? 'badge-amber' : 'badge-green'
</script>

<template>
  <div class="page">
    <div v-if="!idea" class="card" style="text-align:center;padding:60px">
      <h2>Idea no encontrada</h2>
      <p style="color:var(--text-2)">El id {{ route.params.id }} no existe.</p>
      <br />
      <RouterLink to="/ideas" class="btn btn-primary">Volver a ideas</RouterLink>
    </div>

    <div v-else>
      <div class="page-header">
        <div class="page-eyebrow">Detalle · réplica Detalle-Semana · #{{ idea.id }}</div>
        <h1 class="page-title">{{ idea.titulo }}</h1>
        <p class="page-subtitle">{{ idea.resumen }}</p>
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-header">
          <div class="card-title">Ficha</div>
          <RouterLink to="/ideas" class="btn btn-ghost">← Volver</RouterLink>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
          <span class="badge badge-blue">{{ idea.categoria }}</span>
          <span class="badge" :class="estadoBadge(idea.estado)">{{ idea.estado }}</span>
          <span class="badge badge-green mono">{{ idea.fecha }}</span>
        </div>
        <p style="color:var(--text-1)">{{ idea.detalle }}</p>
      </div>
    </div>
  </div>
</template>
