<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { buscarNotas, notaAlAzar, resaltar } from '@/data/vault-index'
import { ui, closePalette } from '@/ui'

const router = useRouter()
const q = ref('')
const activa = ref(0)
const caja = ref<HTMLInputElement | null>(null)

const resultados = computed(() => buscarNotas(q.value).slice(0, 8))

watch(() => ui.palette, v => {
  if (v) {
    q.value = ''
    activa.value = 0
    nextTick(() => caja.value?.focus())
  }
})

const ir = (id: string) => {
  closePalette()
  router.push(`/n/${id}`)
}

const azar = () => {
  const n = notaAlAzar()
  if (n) ir(n.id)
}

const onKey = (e: KeyboardEvent) => {
  if (!ui.palette) return
  if (e.key === 'Escape') { closePalette(); return }
  if (e.key === 'ArrowDown') { e.preventDefault(); activa.value = Math.min(resultados.value.length - 1, activa.value + 1) }
  if (e.key === 'ArrowUp') { e.preventDefault(); activa.value = Math.max(0, activa.value - 1) }
  if (e.key === 'Enter') {
    const h = resultados.value[activa.value]
    if (h) ir(h.nota.id)
  }
  // Trampa de foco mínima: Tab circular dentro del modal
  if (e.key === 'Tab') {
    const el = document.querySelector('.paleta-panel') as HTMLElement | null
    if (!el) return
    const f = [...el.querySelectorAll<HTMLInputElement | HTMLButtonElement>('input, button')].filter(x => !x.disabled)
    if (!f.length) return
    const primero = f[0]
    const ultimo = f[f.length - 1]
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus() }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus() }
  }
}

watch(q, () => { activa.value = 0 })

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="ui.palette" class="paleta-overlay" @click.self="closePalette">
      <div class="paleta-panel" role="dialog" aria-modal="true" aria-label="Paleta de comandos">
        <div class="paleta-head">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input ref="caja" v-model="q" placeholder="Buscar nota… (Enter para abrir)" aria-label="Buscar nota" autocomplete="off" />
          <kbd>esc</kbd>
        </div>
        <div class="paleta-lista" role="listbox" aria-label="Resultados">
          <button
            v-for="(h, i) in resultados" :key="h.nota.id"
            class="paleta-item" :class="{ active: i === activa }"
            role="option" :aria-selected="i === activa"
            @click="ir(h.nota.id)" @pointerenter="activa = i">
            <span class="paleta-t">
              <template v-for="(f, j) in resaltar(h.nota.titulo, q)" :key="j"><mark v-if="f.mark">{{ f.texto }}</mark><template v-else>{{ f.texto }}</template></template>
            </span>
            <span class="badge badge-muted">{{ h.nota.seccion }}</span>
          </button>
          <div v-if="!resultados.length" class="paleta-vacia">Sin resultados para "{{ q }}"</div>
        </div>
        <div class="paleta-pie">
          <button class="paleta-link" @click="closePalette(); router.push('/explorar')">Ir a Explorar →</button>
          <button class="paleta-link" @click="azar">Nota al azar →</button>
          <span class="id-mono">↑↓ navegar · Enter abrir</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
