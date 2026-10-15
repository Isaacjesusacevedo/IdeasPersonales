<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { notas, secciones } from '@/data/vault'

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

const badgeDe = (seccion: string) => {
  const a = secciones.find(s => s.id === seccion)?.acento ?? 'purple'
  return a === 'teal' ? 'badge-teal' : a === 'mix' ? 'badge-muted' : 'badge-purple'
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const resalta = (texto: string) => {
  const t = q.value.trim()
  if (!t) return esc(texto)
  const i = texto.toLowerCase().indexOf(t.toLowerCase())
  if (i < 0) return esc(texto)
  return esc(texto.slice(0, i)) + '<mark>' + esc(texto.slice(i, i + t.length)) + '</mark>' + esc(texto.slice(i + t.length))
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Búsqueda local · sin backend</div>
      <h1 class="page-title">Buscar en el <span class="grad-text">Vault</span></h1>
      <p class="page-subtitle">{{ resultados.length }} / {{ notas.length }} notas</p>
    </div>
    <input v-model="q" class="cmd-input cmd-input--big" placeholder="Ej: DAVA, brownie, sesgo, Luciano…" aria-label="Buscar en el vault" style="margin-bottom:16px" />
    <div v-if="!resultados.length" class="card empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M8 11h6"/></svg>
      <h3>Sin resultados</h3>
      <p>Probá con otra palabra: un personaje, una sección o una idea.</p>
    </div>
    <div v-else class="table-wrap"><table><thead><tr><th>Nota</th><th>Sección</th><th>Resumen</th></tr></thead>
    <tbody><tr v-for="n in resultados.slice(0, 80)" :key="n.id">
      <td>
        <RouterLink :to="`/n/${n.id}`" class="row-link" v-html="resalta(n.titulo)"></RouterLink>
        <div class="id-mono">{{ n.id }}</div>
      </td>
      <td><span class="badge" :class="badgeDe(n.seccion)">{{ n.seccion }}</span><div class="id-mono" style="margin-top:4px">{{ n.categoria }}</div></td>
      <td><span v-html="resalta(n.resumen)"></span></td>
    </tr></tbody></table></div>
  </div>
</template>
