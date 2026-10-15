<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { notasPorTag } from '@/data/vault-index'

const route = useRoute()
const tag = computed(() => route.params.tag as string)
const lista = computed(() => notasPorTag(tag.value))
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Etiqueta</div>
      <h1 class="page-title">#{{ tag }}</h1>
      <p class="page-subtitle">{{ lista.length }} {{ lista.length === 1 ? 'nota' : 'notas' }}</p>
    </div>
    <div v-if="!lista.length" class="card empty">Ninguna nota usa esta etiqueta (todavía).</div>
    <div v-else class="grid-2">
      <RouterLink v-for="n in lista" :key="n.id" :to="`/n/${n.id}`" class="card">
        <span class="pill">{{ n.categoria }}</span>
        <h3 style="margin:8px 0;font-size:16px">{{ n.titulo }}</h3>
        <p class="clamp-3" style="color:var(--text-muted);font-size:13px">{{ n.resumen }}</p>
      </RouterLink>
    </div>
  </div>
</template>
