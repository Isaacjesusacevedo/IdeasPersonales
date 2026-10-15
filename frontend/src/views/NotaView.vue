<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { notaPorId, secciones } from '@/data/vault'

const route = useRoute()
const nota = computed(() => notaPorId(route.params.id as string))
const seccionNombre = computed(() => secciones.find(s => s.id === nota.value?.seccion)?.nombre ?? '')
</script>

<template>
  <div class="page">
    <div v-if="!nota" class="card" style="text-align:center;padding:60px">
      <h2>Nota no encontrada</h2><br /><RouterLink to="/" class="btn btn-primary">Volver</RouterLink>
    </div>
    <div v-else>
      <div class="page-header">
        <div class="page-eyebrow">{{ seccionNombre }} · {{ nota.categoria }} · {{ nota.origen }}</div>
        <h1 class="page-title">{{ nota.titulo }}</h1>
        <p class="page-subtitle">{{ nota.resumen }}</p>
      </div>
      <div class="card" style="margin-bottom:16px">
        <div class="card-header"><div class="card-title">Contenido</div><RouterLink :to="`/s/${nota.seccion}`" class="btn btn-ghost">← {{ seccionNombre }}</RouterLink></div>
        <ul style="padding-left:20px;display:flex;flex-direction:column;gap:10px;color:var(--text-1)">
          <li v-for="(p, i) in nota.puntos" :key="i">{{ p }}</li>
        </ul>
      </div>
      <div v-if="nota.relaciones.length" class="card">
        <div class="card-title" style="margin-bottom:12px">Relaciones conservadas del vault</div>
        <RouterLink v-for="r in nota.relaciones" :key="r" :to="`/n/${r}`" class="pill rel-link">→ {{ r }}</RouterLink>
      </div>
    </div>
  </div>
</template>
