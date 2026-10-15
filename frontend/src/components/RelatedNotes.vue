<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { backlinks, notasSimilares } from '@/data/vault-index'
import { notasPorSeccion, notaPorId, type VaultNote } from '@/data/vault'

const props = defineProps<{ nota: VaultNote }>()

const rels = computed(() =>
  props.nota.relaciones.map(id => notaPorId(id)).filter((n): n is VaultNote => !!n)
)
const backs = computed(() => backlinks(props.nota.id))
const mismas = computed(() => notasSimilares(props.nota.id, 4))
const vecinas = computed(() => {
  const lista = notasPorSeccion(props.nota.seccion)
  const i = lista.findIndex(n => n.id === props.nota.id)
  return {
    prev: i > 0 ? lista[i - 1] : undefined,
    next: i >= 0 && i < lista.length - 1 ? lista[i + 1] : undefined
  }
})
</script>

<template>
  <section class="card" aria-label="Seguí explorando" style="margin-top:16px">
    <div class="card-title" style="margin-bottom:14px">Seguí explorando</div>

    <div v-if="rels.length" style="margin-bottom:12px">
      <div class="rel-group">Relacionadas</div>
      <RouterLink v-for="n in rels" :key="n.id" :to="`/n/${n.id}`" class="rel-row">{{ n.titulo }}</RouterLink>
    </div>

    <div v-if="backs.length" style="margin-bottom:12px">
      <div class="rel-group">Mencionada en</div>
      <RouterLink v-for="n in backs" :key="n.id" :to="`/n/${n.id}`" class="rel-row">{{ n.titulo }}</RouterLink>
    </div>

    <div v-if="mismas.length" style="margin-bottom:12px">
      <div class="rel-group">Mismos conceptos</div>
      <RouterLink v-for="n in mismas" :key="n.id" :to="`/n/${n.id}`" class="rel-row">{{ n.titulo }}</RouterLink>
    </div>

    <nav class="pager" aria-label="Anterior y siguiente">
      <RouterLink v-if="vecinas.prev" :to="`/n/${vecinas.prev.id}`" class="btn btn-ghost">← {{ vecinas.prev.titulo }}</RouterLink>
      <span v-else></span>
      <RouterLink v-if="vecinas.next" :to="`/n/${vecinas.next.id}`" class="btn btn-ghost">{{ vecinas.next.titulo }} →</RouterLink>
    </nav>
  </section>
</template>
