<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { secciones, notasPorSeccion } from '@/data/vault'

const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(false)
const q = ref('')

watch(() => route.name, () => { sidebarOpen.value = false })

const isActive = (name: string | string[]) => {
  if (Array.isArray(name)) return name.includes(route.name as string)
  return route.name === name
}
const isSeccion = (id: string) => route.name === 'seccion' && route.params.seccion === id

const goBuscar = () => {
  if (!q.value.trim()) return
  router.push({ name: 'buscar', query: { q: q.value.trim() } })
  q.value = ''
}
</script>

<template>
  <div class="app-shell">
    <button @click="sidebarOpen = !sidebarOpen" class="hamburger-btn" aria-label="Abrir menú">☰</button>
    <div v-if="sidebarOpen" class="app-nav__overlay" @click="sidebarOpen = false"></div>

    <nav class="app-nav" :class="{ open: sidebarOpen }">
      <div class="nav-brand">
        <div class="nav-brand-logo"><span>IP</span></div>
        <div class="nav-brand-name">Ideas Personales</div>
        <div class="nav-brand-sub">OBSIDIAN · 76 NOTAS · WEB</div>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Principal</div>
        <RouterLink to="/" class="nav-link" :class="{ active: isActive('home') }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
        </RouterLink>
        <RouterLink to="/buscar" class="nav-link" :class="{ active: isActive('buscar') }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          Buscar
        </RouterLink>
        <form @submit.prevent="goBuscar" style="padding:4px 0 0">
          <input v-model="q" class="form-input" placeholder="Buscar nota… (Enter)" style="font-size:13px" />
        </form>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Vault · {{ secciones.length }} secciones</div>
        <RouterLink
          v-for="s in secciones"
          :key="s.id"
          :to="`/s/${s.id}`"
          class="nav-link"
          :class="{ active: isSeccion(s.id) }">
          <span class="mono" style="font-size:11px;opacity:.7">{{ notasPorSeccion(s.id).length }}</span>
          {{ s.nombre }}
        </RouterLink>
      </div>

      <div class="nav-footer">
        <div class="nav-status">
          <div class="nav-status-dot"></div>
          <span class="nav-status-text">Pages ready · hash</span>
        </div>
      </div>
    </nav>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style>
.form-input {
  width: 100%; background: var(--bg-1); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 9px 12px; color: var(--text-0);
  font-family: var(--font-body); outline: none;
}
.form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 900px) { .grid-2 { grid-template-columns: 1fr; } }
.pill { display:inline-block; padding:2px 8px; border-radius:99px; font-size:11px; font-family:var(--font-mono); background:var(--surface); border:1px solid var(--border); color:var(--text-1); margin:0 6px 6px 0; text-decoration:none; }
.pill:hover { border-color: var(--accent); color: var(--text-0); }
.rel-link { display:inline-flex; margin:0 8px 8px 0; }
</style>
