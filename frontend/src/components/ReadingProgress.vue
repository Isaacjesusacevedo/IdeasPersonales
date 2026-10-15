<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const pct = ref(0)
let raf = 0
let ticking = false

const medir = () => {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  pct.value = max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0
  ticking = false
}
const onScroll = () => {
  if (ticking) return
  ticking = true
  raf = requestAnimationFrame(medir)
}

onMounted(() => {
  medir()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="progress" role="progressbar" aria-label="Progreso de lectura" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="Math.round(pct)">
    <div class="progress-fill" :style="{ width: pct + '%' }"></div>
  </div>
</template>
