<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { notasPorTag, tagIndex } from '@/data/vault-index'
import TagChip from '@/components/TagChip.vue'

const route = useRoute()
const tag = computed(() => route.params.tag as string)
const lista = computed(() => notasPorTag(tag.value))

const relacionadas = computed(() => {
  const cuenta: Record<string, number> = {}
  for (const n of lista.value) {
    for (const t of n.tags ?? []) {
      if (t !== tag.value) cuenta[t] = (cuenta[t] ?? 0) + 1
    }
  }
  return Object.entries(cuenta)
    .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
    .slice(0, 8)
    .map(([t, n]) => ({ tag: t, n }))
})

const totalTags = computed(() => Object.keys(tagIndex).length)
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Etiqueta · {{ totalTags }} en total</div>
      <h1 class="page-title">#{{ tag }}</h1>
      <p class="page-subtitle">{{ lista.length }} {{ lista.length === 1 ? 'nota' : 'notas' }}</p>
      <div v-if="relacionadas.length" class="tag-row">
        <span class="id-mono" style="align-self:center">Co-ocurren:</span>
        <TagChip v-for="r in relacionadas" :key="r.tag" :tag="r.tag" :count="r.n" />
      </div>
    </div>
    <div v-if="!lista.length" class="card empty">
      <h3>Sin notas con esta etiqueta</h3>
      <p>Probá con otra, o <RouterLink to="/explorar" class="read-link">explorá la nube</RouterLink>.</p>
    </div>
    <div v-else class="grid-2">
      <RouterLink v-for="n in lista" :key="n.id" :to="`/n/${n.id}`" class="card">
        <span class="pill">{{ n.categoria }}</span>
        <h3 style="margin:8px 0;font-size:16px">{{ n.titulo }}</h3>
        <p class="clamp-3" style="color:var(--text-muted);font-size:13px">{{ n.resumen }}</p>
      </RouterLink>
    </div>
  </div>
</template>
