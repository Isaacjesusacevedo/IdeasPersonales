<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { notas } from '@/data/vault'

const route = useRoute()
const q = ref((route.query.q as string) ?? '')

watch(() => route.query.q, v => { q.value = (v as string) ?? '' })

const resultados = computed(() => {
  const t = q.value.trim().toLowerCase()
  if (!t) return notas
  return notas.filter(n =>
    (n.titulo + ' ' + n.resumen + ' ' + n.puntos.join(' ') + ' ' + n.categoria + ' ' + n.seccion).toLowerCase().includes(t)
  )
})
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Búsqueda local · sin backend</div>
      <h1 class="page-title">Buscar en el Vault</h1>
      <p class="page-subtitle">{{ resultados.length }} / {{ notas.length }} notas</p>
    </div>
    <input v-model="q" class="form-input" placeholder="Ej: DAVA, brownie, sesgo, JWT, Luciano…" style="margin-bottom:16px" />
    <div class="table-wrap"><table><thead><tr><th>Nota</th><th>Sección</th><th>Resumen</th></tr></thead>
    <tbody><tr v-for="n in resultados.slice(0, 80)" :key="n.id">
      <td><RouterLink :to="`/n/${n.id}`" style="color:var(--accent-bright);text-decoration:none;font-weight:600">{{ n.titulo }}</RouterLink><div class="mono" style="font-size:11px;color:var(--text-3)">{{ n.id }}</div></td>
      <td><span class="badge badge-blue">{{ n.seccion }}</span></td>
      <td>{{ n.resumen }}</td>
    </tr></tbody></table></div>
  </div>
</template>
