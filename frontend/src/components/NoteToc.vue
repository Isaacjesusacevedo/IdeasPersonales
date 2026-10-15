<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { headingId } from '@/inline'
import type { NoteBlock } from '@/data/vault'

const props = defineProps<{ bloques: NoteBlock[] }>()

interface Item { id: string; nivel: 2 | 3; texto: string }

function collect(bs: NoteBlock[], prefijo = ''): Item[] {
  const out: Item[] = []
  bs.forEach((b, i) => {
    if (b.t === 'h2' || b.t === 'h3') {
      out.push({ id: headingId(b.texto, prefijo, i), nivel: b.t === 'h2' ? 2 : 3, texto: b.texto })
    } else if (b.t === 'desplegable') {
      out.push(...collect(b.bloques, headingId(b.titulo, prefijo, i)))
    }
  })
  return out
}

const items = computed(() => collect(props.bloques))
const activa = ref('')

let obs: IntersectionObserver | null = null

function observar() {
  obs?.disconnect()
  if (!items.value.length) return
  obs = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (e.isIntersecting) activa.value = (e.target as HTMLElement).id
      }
    },
    { rootMargin: '-20% 0px -70% 0px' }
  )
  for (const it of items.value) {
    const el = document.getElementById(it.id)
    if (el) obs.observe(el)
  }
}

const ir = (id: string) => {
  // Sin href="#id": rompería la ruta del hash-router. Scroll programático.
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(items, () => requestAnimationFrame(observar), { flush: 'post' })
onMounted(() => requestAnimationFrame(observar))
onUnmounted(() => obs?.disconnect())
</script>

<template>
  <aside v-if="items.length" class="toc" aria-label="En esta página">
    <div class="toc-title">En esta página</div>
    <button
      v-for="it in items"
      :key="it.id"
      class="toc-link"
      :class="{ 'toc-h3': it.nivel === 3, active: activa === it.id }"
      @click.prevent="ir(it.id)">
      {{ it.texto }}
    </button>
  </aside>
</template>
