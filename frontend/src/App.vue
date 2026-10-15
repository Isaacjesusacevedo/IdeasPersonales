<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { notas, secciones, notaPorId, notasPorSeccion } from '@/data/vault'

const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(false)
const q = ref('')
const searchBox = ref<HTMLInputElement | null>(null)

watch(() => route.name, () => { sidebarOpen.value = false })

const isActive = (name: string | string[]) => {
  if (Array.isArray(name)) return name.includes(route.name as string)
  return route.name === name
}
const isSeccion = (id: string) => route.name === 'seccion' && route.params.seccion === id

const goBuscar = () => {
  router.push({ name: 'buscar', query: q.value.trim() ? { q: q.value.trim() } : {} })
  q.value = ''
}

const onKey = (e: KeyboardEvent) => {
  if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return
  const t = e.target as HTMLElement | null
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  e.preventDefault()
  searchBox.value?.focus()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

interface Crumb { label: string; to?: string }
const crumbs = computed<Crumb[]>(() => {
  const base: Crumb[] = [{ label: 'Inicio', to: '/' }]
  if (route.name === 'seccion') {
    const s = secciones.find(x => x.id === route.params.seccion)
    return [...base, { label: s?.nombre ?? 'Sección' }]
  }
  if (route.name === 'nota') {
    const n = notaPorId(route.params.id as string)
    if (!n) return [...base, { label: 'Nota' }]
    const s = secciones.find(x => x.id === n.seccion)
    return [...base, { label: s?.nombre ?? n.seccion, to: `/s/${n.seccion}` }, { label: n.titulo }]
  }
  if (route.name === 'ideas') return [...base, { label: 'Ideas sueltas' }]
  if (route.name === 'idea-detail') return [...base, { label: 'Ideas sueltas', to: '/ideas' }, { label: 'Detalle' }]
  if (route.name === 'buscar') return [...base, { label: 'Buscar' }]
  return base
})

const secIcon: Record<string, string> = {
  yo: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5"/>',
  sistema: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 12h6M12 9v6"/>',
  brownies: '<path d="M4 9h16v11H4zM4 9l2-5h12l2 5M9 13h6"/>',
  oxida: '<path d="M12 2c1 4-3 5-3 9a5 5 0 0 0 10 0c0-2-1-3-1-3s3 1 3 5a8 8 0 0 1-16 0c0-5 6-7 7-11z"/>',
  mente: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  facultad: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13"/>',
  ideas: '<path d="M12 2v4M4.9 4.9l2.8 2.8M2 12h4M20 12h4M19.1 4.9l-2.8 2.8M12 22a7 7 0 0 0 4-12.7c-.6-.5-1-1.4-1-2.3h-6c0 .9-.4 1.8-1 2.3A7 7 0 0 0 12 22z"/>'
}
</script>

<template>
  <div class="app-shell">
    <button
      @click="sidebarOpen = !sidebarOpen"
      class="hamburger-btn"
      :class="{ open: sidebarOpen }"
      aria-label="Abrir o cerrar menú">
      <span></span><span></span><span></span>
    </button>

    <div v-if="sidebarOpen" class="app-nav__overlay" @click="sidebarOpen = false"></div>

    <nav class="app-nav" :class="{ open: sidebarOpen }" aria-label="Navegación principal">
      <div class="nav-brand">
        <svg class="brand-hex" width="40" height="44" viewBox="0 0 40 44" aria-hidden="true">
          <defs>
            <linearGradient id="ipg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#7c3aed" />
              <stop offset="1" stop-color="#2dd4bf" />
            </linearGradient>
          </defs>
          <polygon points="20,2 37,11.5 37,32.5 20,42 3,32.5 3,11.5" fill="none" stroke="url(#ipg)" stroke-width="2.5" />
          <text x="20" y="27" text-anchor="middle" font-family="Syne, sans-serif" font-weight="800" font-size="13" fill="#e8ebf7">IP</text>
        </svg>
        <div>
          <div class="nav-brand-name">Ideas Personales</div>
          <div class="nav-brand-sub">Obsidian Vault</div>
        </div>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Principal</div>
        <RouterLink to="/" class="nav-link" :class="{ active: isActive('home') }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          Dashboard
        </RouterLink>
        <RouterLink to="/buscar" class="nav-link" :class="{ active: isActive('buscar') }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          Buscar
        </RouterLink>
        <form @submit.prevent="goBuscar" class="cmdbar" role="search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input ref="searchBox" v-model="q" placeholder="Buscar en el vault" aria-label="Buscar en el vault" />
          <kbd title="Pulsa / para enfocar">/</kbd>
        </form>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Vault</div>
        <RouterLink
          v-for="s in secciones"
          :key="s.id"
          :to="`/s/${s.id}`"
          class="nav-link"
          :class="{ active: isSeccion(s.id) }">
          <span class="sec-dot" :class="`sec-dot--${s.acento ?? 'purple'}`" aria-hidden="true"></span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" v-html="secIcon[s.id]"></svg>
          {{ s.nombre }}
          <span class="nav-count">{{ notasPorSeccion(s.id).length }}</span>
        </RouterLink>
      </div>

      <div class="nav-footer">
        <div class="nav-status" role="status">
          <div class="nav-status-dot" aria-hidden="true"></div>
          <span class="nav-status-text">Vault sincronizado</span>
        </div>
        <div class="nav-total">{{ notas.length }} notas en total</div>
      </div>
    </nav>

    <main class="app-main">
      <div class="topbar" aria-label="Ruta actual">
        <nav class="crumbs" aria-label="Breadcrumb">
          <template v-for="(c, i) in crumbs" :key="i">
            <span v-if="i > 0" class="sep" aria-hidden="true">/</span>
            <RouterLink v-if="c.to && i < crumbs.length - 1" :to="c.to">{{ c.label }}</RouterLink>
            <span v-else class="here">{{ c.label }}</span>
          </template>
        </nav>
      </div>
      <RouterView v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>
