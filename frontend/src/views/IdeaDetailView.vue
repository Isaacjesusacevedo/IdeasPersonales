<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { notaPorId } from '@/data/vault'

const route = useRoute()
const id = computed(() => {
  const raw = route.params.id as string
  if (raw.startsWith('idea-')) return raw
  return `idea-${raw}`
})
const nota = computed(() => notaPorId(id.value))
</script>

<template>
  <div class="page">
    <div v-if="!nota" class="card notfound">
      <div class="page-eyebrow">Idea · no encontrada</div>
      <h2>Esa idea no existe</h2>
      <br /><RouterLink to="/ideas" class="btn btn-primary">Volver a ideas</RouterLink>
    </div>
    <div v-else class="nota">
      <div class="page-header">
        <div class="page-eyebrow">Idea · {{ nota.categoria }}</div>
        <h1 class="page-title">{{ nota.titulo }}</h1>
        <p class="lead">{{ nota.resumen }}</p>
      </div>
      <div class="card lift">
        <div class="card-header"><div class="card-title">Detalle</div><RouterLink to="/ideas" class="btn btn-ghost">← Ideas</RouterLink></div>
        <ul class="puntos">
          <li v-for="(p, i) in nota.puntos" :key="i">{{ p }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
