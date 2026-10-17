<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { usePeek } from '@/composables/usePeek'
import { notaPorId, secciones } from '@/data/vault'
import { lecturaLabel } from '@/data/vault-index'
import NoteRenderer from '@/components/NoteRenderer.vue'
import RelatedNotes from '@/components/RelatedNotes.vue'
import TagChip from '@/components/TagChip.vue'
import InlineText from '@/components/InlineText.vue'

const router = useRouter()
const { stack, closeTop, closeAll } = usePeek()

const topId = computed(() => (stack.value.length ? stack.value[stack.value.length - 1] : null))
const nota = computed(() => (topId.value ? notaPorId(topId.value) : null))
const seccionNombre = computed(() => secciones.find(s => s.id === nota.value?.seccion)?.nombre ?? '')
const tipo = computed(() => nota.value?.tipo ?? 'articulo')

const panel = ref<HTMLElement | null>(null)
const trigger = ref<HTMLElement | null>(null)

watch(() => stack.value.length, (n, o) => {
  if (n > 0 && (o ?? 0) === 0) {
    trigger.value = document.activeElement as HTMLElement | null
    nextTick(() => panel.value?.focus())
  }
  if (n === 0 && (o ?? 0) > 0) {
    trigger.value?.focus()
    trigger.value = null
  }
})

const onKey = (e: KeyboardEvent) => {
  if (!stack.value.length) return
  if (e.key === 'Escape') { e.preventDefault(); closeTop(); return }
  if (e.key !== 'Tab' || !panel.value) return
  const focusables = panel.value.querySelectorAll<HTMLElement>(
    'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
  )
  if (!focusables.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

const abrirPagina = () => {
  if (!topId.value) return
  router.push(`/n/${topId.value}`)
  closeAll()
}
</script>

<template>
  <Teleport to="body">
    <div v-if="stack.length" class="peek-overlay" @click.self="closeAll" aria-hidden="true"></div>
    <aside v-if="stack.length" ref="panel" class="peek-panel" tabindex="-1" aria-label="Vista previa de nota">
      <header class="peek-header">
        <button v-if="stack.length > 1" class="btn btn-ghost btn-sm" @click="closeTop">← Volver</button>
        <h2 class="peek-title">{{ nota?.titulo }}</h2>
        <div class="peek-actions">
          <button class="btn btn-ghost btn-sm" @click="abrirPagina">Abrir página</button>
          <button class="btn btn-ghost btn-sm" @click="closeAll" aria-label="Cerrar panel">Cerrar ✕</button>
        </div>
      </header>
      <div v-if="nota" class="peek-body">
        <p v-if="nota.intro" class="lead">{{ nota.intro }}</p>
        <p v-else class="page-subtitle">{{ nota.resumen }}</p>
        <div class="meta-row" style="margin-bottom:12px">
          <span class="id-mono">{{ lecturaLabel(nota) }}</span>
          <span class="badge badge-muted">{{ tipo }}</span>
          <span class="badge badge-purple">{{ seccionNombre }}</span>
        </div>
        <div v-if="nota.tags?.length" class="tag-row" style="margin-bottom:12px">
          <TagChip v-for="t in nota.tags" :key="t" :tag="t" />
        </div>
        <NoteRenderer v-if="nota.bloques?.length" :bloques="nota.bloques" :nota-id="nota.id" />
        <ul v-else class="puntos">
          <li v-for="(p, i) in nota.puntos" :key="i"><InlineText :texto="p" /></li>
        </ul>
        <RelatedNotes :nota="nota" />
      </div>
    </aside>
  </Teleport>
</template>
