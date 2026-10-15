<script setup lang="ts">
import InlineText from '@/components/InlineText.vue'

defineProps<{
  variante: 'definicion' | 'idea' | 'conclusion' | 'ejemplo'
  titulo?: string
  texto: string
}>()
</script>

<template>
  <aside class="callout" :class="`callout--${variante}`">
    <div class="callout-head">
      <svg v-if="variante === 'definicion'" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13"/></svg>
      <svg v-else-if="variante === 'idea'" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>
      <svg v-else-if="variante === 'conclusion'" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
      <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>
      <strong>{{ titulo ?? ({ definicion: 'Definición', idea: 'Idea clave', conclusion: 'Conclusión', ejemplo: 'Ejemplo' } as const)[variante] }}</strong>
      <span v-if="variante === 'ejemplo'" class="badge badge-teal" style="margin-left:auto">Explicación añadida</span>
    </div>
    <p><InlineText :texto="texto" /></p>
  </aside>
</template>
