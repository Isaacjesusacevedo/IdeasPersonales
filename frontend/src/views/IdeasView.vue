<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ideas } from '@/data/ideas'

const estadoBadge = (e: string) =>
  e === 'nueva' ? 'badge-blue' : e === 'en-curso' ? 'badge-amber' : 'badge-green'
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Listado · estilo Semanas / Productos</div>
      <h1 class="page-title">Mis Ideas</h1>
      <p class="page-subtitle">Tabla réplica Industrial: thead mono uppercase, hover surface, badges por estado.</p>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>#</th><th>Título</th><th>Categoría</th><th>Estado</th><th>Resumen</th><th class="num">Fecha</th></tr>
        </thead>
        <tbody>
          <tr v-for="idea in ideas" :key="idea.id">
            <td class="num mono">{{ idea.id }}</td>
            <td><RouterLink :to="`/ideas/${idea.id}`" style="color:var(--text-0);font-weight:600;text-decoration:none">{{ idea.titulo }}</RouterLink></td>
            <td><span class="badge badge-blue">{{ idea.categoria }}</span></td>
            <td><span class="badge" :class="estadoBadge(idea.estado)">{{ idea.estado }}</span></td>
            <td style="max-width:320px">{{ idea.resumen }}</td>
            <td class="num mono">{{ idea.fecha }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
