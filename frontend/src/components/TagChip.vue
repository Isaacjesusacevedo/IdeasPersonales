<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ tag: string; count?: number }>()
</script>

<template>
  <RouterLink :to="`/t/${tag}`" class="pill" :aria-label="`Etiqueta ${tag}${count !== undefined ? `, ${count} notas` : ''}`">#{{ tag }}</RouterLink>
</template>
