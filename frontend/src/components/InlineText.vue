<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { parseInline } from '@/inline'
import { notaPorId } from '@/data/vault'
import { useNotePreview } from '@/composables/useNotePreview'
import { usePeek } from '@/composables/usePeek'

defineProps<{ texto: string }>()

const { scheduleShow, scheduleHide } = useNotePreview()
const { open: openPeek } = usePeek()
const onLinkClick = (id: string, e: MouseEvent) => {
  if (e.shiftKey || e.ctrlKey || e.metaKey) {
    e.preventDefault()
    openPeek(id)
  }
}

const resolver = (id: string) => {
  const n = notaPorId(id)
  if (!n && import.meta.env.DEV) console.warn(`[inline] nota sin resolver: ${id}`)
  return n
}
</script>

<template>
  <span><template v-for="(s, i) in parseInline(texto)" :key="i"><strong v-if="s.k === 'b'">{{ s.texto }}</strong><code v-else-if="s.k === 'c'" class="code">{{ s.texto }}</code><template v-else-if="s.k === 'l'"><span v-if="!resolver(s.id)" class="is-unresolved" title="Nota no encontrada">{{ s.texto }}</span><RouterLink v-else :to="`/n/${s.id}`" class="read-link"
    @click="onLinkClick(s.id, $event)"
    @mouseenter="scheduleShow(s.id, $event.currentTarget as HTMLElement)"
    @mouseleave="scheduleHide()"
    @focus="scheduleShow(s.id, $event.currentTarget as HTMLElement)"
    @blur="scheduleHide()">{{ s.alias ? s.texto : resolver(s.id)!.titulo }}</RouterLink></template><template v-else>{{ s.texto }}</template></template></span>
</template>
