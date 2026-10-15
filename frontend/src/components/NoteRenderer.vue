<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import InlineText from '@/components/InlineText.vue'
import CalloutCard from '@/components/CalloutCard.vue'
import Collapsible from '@/components/Collapsible.vue'
import { headingId } from '@/inline'
import type { NoteBlock } from '@/data/vault'

// Carga diferida de sí mismo para el caso `desplegable` (evita el ciclo
// estático de tipos y divide el chunk). Tipado intencionalmente abierto para
// no realimentar la inferencia del propio SFC.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NestedBlocks: any = defineAsyncComponent(() => import('@/components/NoteRenderer.vue'))

defineProps<{ bloques: NoteBlock[]; prefijo?: string }>()

const hid = (texto: string, prefijo = '', i = 0) => headingId(texto, prefijo, i)
</script>

<template>
  <div class="reading">
    <template v-for="(b, i) in bloques" :key="i">
      <h2 v-if="b.t === 'h2'" :id="hid(b.texto, prefijo, i)" class="read-h2">{{ b.texto }}</h2>
      <h3 v-else-if="b.t === 'h3'" :id="hid(b.texto, prefijo, i)" class="read-h3">{{ b.texto }}</h3>
      <p v-else-if="b.t === 'p'" class="read-p"><InlineText :texto="b.texto" /></p>
      <ul v-else-if="b.t === 'lista' && !b.ordenada" class="puntos">
        <li v-for="(it, j) in b.items" :key="j"><InlineText :texto="it" /></li>
      </ul>
      <ol v-else-if="b.t === 'lista'" class="timeline">
        <li v-for="(it, j) in b.items" :key="j"><InlineText :texto="it" /></li>
      </ol>
      <CalloutCard v-else-if="b.t === 'card'" :variante="b.variante" :titulo="b.titulo" :texto="b.texto" />
      <Collapsible v-else-if="b.t === 'desplegable'" :titulo="b.titulo">
        <NestedBlocks :bloques="b.bloques" :prefijo="hid(b.titulo, prefijo, i)" />
      </Collapsible>
    </template>
  </div>
</template>
