<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'

const route = useRoute()
const sidebarOpen = ref(false)

watch(() => route.name, () => { sidebarOpen.value = false })

const isActive = (name: string | string[]) => {
  if (Array.isArray(name)) return name.includes(route.name as string)
  return route.name === name
}
const activeIdeaId = computed(() => route.params.id as string | undefined)
</script>

<template>
  <div class="app-shell">
    <button
      v-if="isActive(['home','ideas','idea-detail']) || true"
      @click="sidebarOpen = !sidebarOpen"
      class="hamburger-btn"
      aria-label="Abrir menú">
      ☰
    </button>

    <div
      v-if="sidebarOpen"
      class="app-nav__overlay"
      @click="sidebarOpen = false">
    </div>

    <nav class="app-nav" :class="{ open: sidebarOpen }">
      <div class="nav-brand">
        <div class="nav-brand-logo"><span>IP</span></div>
        <div class="nav-brand-name">Ideas Personales</div>
        <div class="nav-brand-sub">LECTURA · INSPIRACIÓN · REGISTRO</div>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Principal</div>

        <RouterLink to="/" class="nav-link" :class="{ active: isActive('home') }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          Dashboard
        </RouterLink>

        <RouterLink to="/ideas" class="nav-link" :class="{ active: isActive(['ideas','idea-detail']) }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/>
          </svg>
          Ideas
        </RouterLink>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Idea activa</div>
        <div v-if="activeIdeaId" class="card" style="padding:12px">
          <div class="mono" style="font-size:12px;color:var(--accent)">#{{ activeIdeaId }}</div>
          <div style="font-size:13px;color:var(--text-1)">Viéndola en detalle →</div>
        </div>
        <div v-else style="padding:0 12px;font-size:13px;color:var(--text-3)">
          Sin selección.<br />
          <RouterLink to="/ideas" style="color:var(--accent-bright)">Ver lista →</RouterLink>
        </div>
      </div>

      <div class="nav-footer">
        <div class="nav-status">
          <div class="nav-status-dot"></div>
          <span class="nav-status-text">Solo lectura · local</span>
        </div>
      </div>
    </nav>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>
