<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { secciones, notasPorSeccion } from '@/data/vault'

const route = useRoute()
const seccion = computed(() => secciones.find(s => s.id === route.params.seccion))
const lista = computed(() => notasPorSeccion(route.params.seccion as string))
</script>

<template>
  <div class="page">
    <div v-if="!seccion" class="card" style="text-align:center;padding:60px">
      <h2>Sección no encontrada</h2><br /><RouterLink to="/" class="btn btn-primary">Volver</RouterLink>
    </div>
    <div v-else>
      <div class="page-header">
        <div class="page-eyebrow">{{ seccion.subtitulo }} · {{ lista.length }} notas</div>
        <h1 class="page-title">{{ seccion.nombre }}</h1>
        <p class="page-subtitle">{{ seccion.descripcion }}</p>
      </div>
      <div class="grid-2">
        <RouterLink v-for="n in lista" :key="n.id" :to="`/n/${n.id}`" class="card" style="text-decoration:none;padding:18px">
          <span class="pill">{{ n.categoria }}</span>
          <h3 style="margin:6px 0;font-size:16px">{{ n.titulo }}</h3>
          <p style="color:var(--text-2);font-size:13px">{{ n.resumen }}</p>
          <div class="mono" style="font-size:11px;color:var(--text-3);margin-top:8px">{{ n.origen }}</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
