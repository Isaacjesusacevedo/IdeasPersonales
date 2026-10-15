<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { notasPorSeccion } from '@/data/vault'
const lista = notasPorSeccion('ideas')
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Lectura rápida · sincronizado con IDEAS.md</div>
      <h1 class="page-title">Ideas <span class="grad-text">sueltas</span></h1>
      <p class="page-subtitle">Capturas del día a día. Todas mis notas viven en los temas del sidebar.</p>
    </div>
    <div class="table-wrap"><table><thead><tr><th>Título</th><th>Categoría</th><th>Resumen</th></tr></thead>
    <tbody><tr v-for="n in lista" :key="n.id">
      <td><RouterLink :to="`/n/${n.id}`" class="row-link">{{ n.titulo }}</RouterLink></td>
      <td><span class="badge badge-teal">{{ n.categoria }}</span></td>
      <td>{{ n.resumen }}</td>
    </tr></tbody></table></div>
  </div>
</template>
