<script setup lang="ts">
import { computed } from 'vue'
import { tagIndex } from '@/data/vault-index'
import ConceptCloud from '@/components/ConceptCloud.vue'
import TagChip from '@/components/TagChip.vue'

const tags = computed(() =>
  Object.entries(tagIndex)
    .map(([tag, ns]) => ({ tag, n: ns.length }))
    .sort((a, b) => b.n - a.n || (a.tag < b.tag ? -1 : 1))
)
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div class="page-eyebrow">Descubrir · por conceptos</div>
      <h1 class="page-title">Explorar el <span class="grad-text">Vault</span></h1>
      <p class="page-subtitle">{{ tags.length }} etiquetas en {{ tags.reduce((a, t) => a + t.n, 0) }} usos. El tamaño es frecuencia; el color, la sección dominante.</p>
    </div>

    <div class="card" style="margin-bottom:16px">
      <ConceptCloud :max="40" :hero-max="40" :alto="440" />
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:12px">Todas las etiquetas</div>
      <div class="tag-row" style="margin-top:0">
        <span v-for="t in tags" :key="t.tag" style="display:inline-flex;align-items:center;gap:6px;margin:0 10px 10px 0">
          <TagChip :tag="t.tag" />
          <span class="id-mono">{{ t.n }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
