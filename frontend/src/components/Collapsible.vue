<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ titulo: string; abierto?: boolean }>()
const open = ref(false)
</script>

<template>
  <div class="collapsible" :class="{ open }">
    <button class="collapsible-btn" @click="open = !open" :aria-expanded="open">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      {{ titulo }}
    </button>
    <div class="collapsible-body" aria-hidden="false">
      <div class="collapsible-inner"><slot /></div>
    </div>
  </div>
</template>
