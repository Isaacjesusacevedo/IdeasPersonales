<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { parseInline } from '@/inline'
import { notaPorId } from '@/data/vault'

defineProps<{ texto: string }>()

const resolver = (id: string) => {
  const n = notaPorId(id)
  if (!n && import.meta.env.DEV) console.warn(`[inline] nota sin resolver: ${id}`)
  return n
}
</script>

<template>
  <span><template v-for="(s, i) in parseInline(texto)" :key="i"><strong v-if="s.k === 'b'">{{ s.texto }}</strong><code v-else-if="s.k === 'c'" class="code">{{ s.texto }}</code><template v-else-if="s.k === 'l'"><span v-if="!resolver(s.id)" class="is-unresolved" title="Nota no encontrada">{{ s.texto }}</span><RouterLink v-else :to="`/n/${s.id}`" class="read-link">{{ s.alias ? s.texto : resolver(s.id)!.titulo }}</RouterLink></template><template v-else>{{ s.texto }}</template></template></span>
</template>
