<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { notasPorSeccion } from '@/data/vault'
const lista = notasPorSeccion('ideas')
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Lectura rápida · sincronizado con IDEAS.md</div>
      <h1 class="page-title">Ideas sueltas</h1>
      <p class="page-subtitle">Capturas del día a día. El Vault completo vive en las 6 secciones del sidebar.</p>
    </div>
    <div class="table-wrap"><table><thead><tr><th>Título</th><th>Categoría</th><th>Resumen</th></tr></thead>
    <tbody><tr v-for="n in lista" :key="n.id">
      <td><RouterLink :to="`/n/${n.id}`" style="color:var(--text-0);font-weight:600;text-decoration:none">{{ n.titulo }}</RouterLink></td>
      <td><span class="badge badge-blue">{{ n.categoria }}</span></td>
      <td>{{ n.resumen }}</td>
    </tr></tbody></table></div>
  </div>
</template>
