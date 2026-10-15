<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { secciones, notasPorSeccion } from '@/data/vault'

const route = useRoute()
const filtro = ref('')
const seccion = computed(() => secciones.find(s => s.id === route.params.seccion))
const lista = computed(() => {
  const todas = notasPorSeccion(route.params.seccion as string)
  const t = filtro.value.trim().toLowerCase()
  if (!t) return todas
  return todas.filter(n =>
    (n.titulo + ' ' + n.resumen + ' ' + n.categoria + ' ' + n.puntos.join(' ')).toLowerCase().includes(t)
  )
})
</script>

<template>
  <div class="page">
    <div v-if="!seccion" class="card" style="text-align:center;padding:60px">
      <h2>Sección no encontrada</h2><br /><RouterLink to="/" class="btn btn-primary">Volver</RouterLink>
    </div>
    <div v-else>
      <div class="page-header">
        <div class="page-eyebrow">{{ seccion.subtitulo }}</div>
        <h1 class="page-title">{{ seccion.nombre }}</h1>
        <p class="page-subtitle">{{ seccion.descripcion }}</p>
        <div style="display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap">
          <span class="badge badge-teal">{{ lista.length }} notas</span>
          <input v-model="filtro" class="form-input" placeholder="Filtrar en esta sección…" aria-label="Filtrar notas de la sección" style="max-width:280px" />
        </div>
      </div>
      <div v-if="!lista.length" class="card empty">Sin resultados para ese filtro.</div>
      <div v-else class="grid-2">
        <RouterLink
          v-for="(n, idx) in lista"
          :key="n.id"
          :to="`/n/${n.id}`"
          v-reveal="(idx % 6) * 60"
          class="card"
          :class="seccion.acento === 'teal' ? 'card--teal' : ''">
          <span class="pill">{{ n.categoria }}</span>
          <h3 style="margin:8px 0;font-size:16px">{{ n.titulo }}</h3>
          <p class="clamp-3" style="color:var(--text-muted);font-size:13px">{{ n.resumen }}</p>
          <span class="origen">{{ n.origen }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
