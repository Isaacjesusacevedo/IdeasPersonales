<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNotePreview } from '@/composables/useNotePreview'
import { usePeek } from '@/composables/usePeek'
import { notaPorId, secciones } from '@/data/vault'
import { lecturaLabel } from '@/data/vault-index'

const router = useRouter()
const { targetId, anchorEl, visible, scheduleHide, cancelHide, hide } = useNotePreview()
const peek = usePeek()

const nota = computed(() => (targetId.value ? notaPorId(targetId.value) : null))
const seccionNombre = computed(() => secciones.find(s => s.id === nota.value?.seccion)?.nombre ?? '')
const seccionAcento = computed(() => secciones.find(s => s.id === nota.value?.seccion)?.acento ?? 'purple')
const color = computed(() => {
  const a = seccionAcento.value
  return a === 'teal' ? '#2dd4bf' : a === 'mix' ? '#9aa3ff' : '#a78bfa'
})
const texto = computed(() => nota.value?.intro || nota.value?.resumen || '')

const popoverEl = ref<HTMLElement | null>(null)
const pos = ref({ top: 0, left: 0 })

function posicionar() {
  if (!anchorEl.value || !popoverEl.value) return
  const r = anchorEl.value.getBoundingClientRect()
  const w = 340
  const h = popoverEl.value.offsetHeight
  let left = r.left
  left = Math.min(Math.max(8, left), window.innerWidth - w - 8)
  let top = r.bottom + 8
  if (top + h > window.innerHeight - 8) top = r.top - h - 8
  if (top < 8) top = 8
  pos.value = { top, left }
}

watch(visible, v => {
  if (v) nextTick(() => requestAnimationFrame(posicionar))
})

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && visible.value) hide()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

const abrir = () => {
  if (!targetId.value) return
  router.push(`/n/${targetId.value}`)
  hide()
}
const abrirAlLado = () => {
  if (!targetId.value) return
  peek.open(targetId.value)
  hide()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible && nota"
      id="note-preview"
      ref="popoverEl"
      class="note-preview"
      role="tooltip"
      :style="{ top: pos.top + 'px', left: pos.left + 'px', width: '340px' }"
      @mouseenter="cancelHide()"
      @mouseleave="scheduleHide()"
    >
      <div class="note-preview-head">
        <span class="note-preview-dot" :style="{ background: color }" aria-hidden="true"></span>
        <span class="id-mono">{{ seccionNombre }}</span>
      </div>
      <h3 class="note-preview-title">{{ nota.titulo }}</h3>
      <div class="note-preview-meta">
        <span class="badge badge-muted">{{ nota.categoria }}</span>
        <span class="id-mono">{{ lecturaLabel(nota) }}</span>
      </div>
      <p class="note-preview-text">{{ texto }}</p>
      <div v-if="nota.tags?.length" class="tag-row" style="margin-top:8px">
        <span v-for="t in (nota.tags ?? []).slice(0, 3)" :key="t" class="pill" style="font-size:11px">#{{ t }}</span>
      </div>
      <div class="note-preview-foot">
        <button class="btn btn-primary btn-sm" @click="abrir">Abrir</button>
        <button class="btn btn-ghost btn-sm" @click="abrirAlLado">Abrir al lado</button>
      </div>
    </div>
  </Teleport>
</template>
