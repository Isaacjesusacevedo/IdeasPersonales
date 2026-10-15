<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { notaPorId, notasPorSeccion, secciones } from '@/data/vault'

const route = useRoute()
const nota = computed(() => notaPorId(route.params.id as string))
const seccionNombre = computed(() => secciones.find(s => s.id === nota.value?.seccion)?.nombre ?? '')
const vecinas = computed(() => {
  if (!nota.value) return { prev: undefined as string | undefined, next: undefined as string | undefined, idx: 0, total: 0 }
  const lista = notasPorSeccion(nota.value.seccion)
  const idx = lista.findIndex(n => n.id === nota.value!.id)
  return {
    prev: idx > 0 ? lista[idx - 1].id : undefined,
    next: idx < lista.length - 1 ? lista[idx + 1].id : undefined,
    idx: idx + 1,
    total: lista.length
  }
})
const tituloDe = (id: string) => notaPorId(id)?.titulo ?? id
</script>

<template>
  <div class="page">
    <div v-if="!nota" class="card notfound">
      <div class="page-eyebrow">Nota · no encontrada</div>
      <h2>Esta nota no existe</h2>
      <p style="color:var(--text-muted)">Revisá el enlace o volvé al inicio.</p>
      <br /><RouterLink to="/" class="btn btn-primary">Volver al inicio</RouterLink>
    </div>
    <div v-else class="nota">
      <div class="page-header">
        <div class="page-eyebrow">{{ seccionNombre }} · {{ nota.categoria }} · {{ nota.origen }}</div>
        <h1 class="page-title">{{ nota.titulo }}</h1>
        <p class="lead">{{ nota.resumen }}</p>
      </div>
      <div class="card lift" style="margin-bottom:16px">
        <div class="card-header">
          <div class="card-title">Contenido · {{ vecinas.idx }}/{{ vecinas.total }}</div>
          <RouterLink :to="`/s/${nota.seccion}`" class="btn btn-ghost">← {{ seccionNombre }}</RouterLink>
        </div>
        <ul class="puntos">
          <li v-for="(p, i) in nota.puntos" :key="i">{{ p }}</li>
        </ul>
      </div>
      <div v-if="nota.relaciones.length" class="card" style="margin-bottom:16px">
        <div class="card-title" style="margin-bottom:12px">Relacionadas</div>
        <RouterLink v-for="r in nota.relaciones" :key="r" :to="`/n/${r}`" class="pill rel-link" :title="tituloDe(r)">→ {{ tituloDe(r) }}</RouterLink>
      </div>
      <nav class="pager" aria-label="Anterior y siguiente">
        <RouterLink v-if="vecinas.prev" :to="`/n/${vecinas.prev}`" class="btn btn-ghost">← {{ tituloDe(vecinas.prev) }}</RouterLink>
        <span v-else></span>
        <RouterLink v-if="vecinas.next" :to="`/n/${vecinas.next}`" class="btn btn-ghost">{{ tituloDe(vecinas.next) }} →</RouterLink>
      </nav>
    </div>
  </div>
</template>
