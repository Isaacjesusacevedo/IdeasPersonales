<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { parseInline } from '@/inline'

defineProps<{ texto: string }>()
</script>

<template>
  <span><template v-for="(s, i) in parseInline(texto)" :key="i"><strong v-if="s.k === 'b'">{{ s.texto }}</strong><code v-else-if="s.k === 'c'" class="code">{{ s.texto }}</code><RouterLink v-else-if="s.k === 'l'" :to="`/n/${s.id}`" class="read-link">{{ s.texto }}</RouterLink><template v-else>{{ s.texto }}</template></template></span>
</template>
