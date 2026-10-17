<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { backlinksConContexto, mencionesSinEnlazar, notasSimilares, resaltar } from '@/data/vault-index'
import { notasPorSeccion, notaPorId, type VaultNote } from '@/data/vault'
import { secciones } from '@/data/vault'
import InlineText from '@/components/InlineText.vue'
import Collapsible from '@/components/Collapsible.vue'
import { useNotePreview } from '@/composables/useNotePreview'
import { usePeek } from '@/composables/usePeek'

const { scheduleShow, scheduleHide } = useNotePreview()
const { open: openPeek } = usePeek()

const props = defineProps<{ nota: VaultNote }>()

const rels = computed(() => props.nota.relaciones.map(id => notaPorId(id)).filter((n): n is VaultNote => !!n))
const backs = computed(() => backlinksConContexto(props.nota.id))
const menciones = computed(() => mencionesSinEnlazar(props.nota.id))
const mismas = computed(() => notasSimilares(props.nota.id, 4))
const vecinas = computed(() => {
  const lista = notasPorSeccion(props.nota.seccion)
  const i = lista.findIndex(n => n.id === props.nota.id)
  return {
    prev: i > 0 ? lista[i - 1] : undefined,
    next: i >= 0 && i < lista.length - 1 ? lista[i + 1] : undefined
  }
})

const colorDe = (sec: string) => {
  const a = secciones.find(s => s.id === sec)?.acento ?? 'purple'
  return a === 'teal' ? '#2dd4bf' : a === 'mix' ? '#9aa3ff' : '#a78bfa'
}
</script>

<template>
  <section id="menciones" class="card" aria-label="Seguí explorando" style="margin-top:16px">
    <div class="card-title" style="margin-bottom:14px">Seguí explorando</div>

    <Collapsible v-if="backs.length" titulo="Enlazan aquí">
      <div class="id-mono" style="margin-bottom:8px">{{ backs.length }} notas</div>
      <div v-for="b in backs" :key="b.nota.id" class="mention-card"
        @mouseenter="scheduleShow(b.nota.id, $event.currentTarget as HTMLElement)"
        @mouseleave="scheduleHide()">
        <RouterLink :to="`/n/${b.nota.id}`" class="rel-row"
          @click="(e: MouseEvent) => { if (e.shiftKey || e.ctrlKey || e.metaKey) { e.preventDefault(); openPeek(b.nota.id) } }"
          @mouseenter="scheduleShow(b.nota.id, $event.currentTarget as HTMLElement)"
          @mouseleave="scheduleHide()"
          @focus="scheduleShow(b.nota.id, $event.currentTarget as HTMLElement)"
          @blur="scheduleHide()">
          <span class="sec-dot" :style="{ background: colorDe(b.nota.seccion) }" aria-hidden="true"></span>
          <strong>{{ b.nota.titulo }}</strong>
        </RouterLink>
        <p class="mention-frag"><InlineText :texto="b.fragmento" /></p>
      </div>
    </Collapsible>

    <Collapsible v-if="menciones.length" titulo="Menciones sin enlazar">
      <div class="id-mono" style="margin-bottom:8px">{{ menciones.length }} notas</div>
      <div v-for="m in menciones" :key="m.nota.id" class="mention-card"
        @mouseenter="scheduleShow(m.nota.id, $event.currentTarget as HTMLElement)"
        @mouseleave="scheduleHide()">
        <RouterLink :to="`/n/${m.nota.id}`" class="rel-row"
          @click="(e: MouseEvent) => { if (e.shiftKey || e.ctrlKey || e.metaKey) { e.preventDefault(); openPeek(m.nota.id) } }"
          @mouseenter="scheduleShow(m.nota.id, $event.currentTarget as HTMLElement)"
          @mouseleave="scheduleHide()"
          @focus="scheduleShow(m.nota.id, $event.currentTarget as HTMLElement)"
          @blur="scheduleHide()">
          <span class="sec-dot" :style="{ background: colorDe(m.nota.seccion) }" aria-hidden="true"></span>
          <strong>{{ m.nota.titulo }}</strong>
        </RouterLink>
        <p class="mention-frag">
          <template v-for="(f, j) in resaltar(m.fragmento, props.nota.titulo)" :key="j">
            <mark v-if="f.mark">{{ f.texto }}</mark><template v-else>{{ f.texto }}</template>
          </template>
        </p>
      </div>
    </Collapsible>

    <div v-if="rels.length" style="margin-bottom:12px">
      <div class="rel-group">Relacionadas</div>
      <RouterLink v-for="n in rels" :key="n.id" :to="`/n/${n.id}`" class="rel-row"
        @click="(e: MouseEvent) => { if (e.shiftKey || e.ctrlKey || e.metaKey) { e.preventDefault(); openPeek(n.id) } }"
        @mouseenter="scheduleShow(n.id, $event.currentTarget as HTMLElement)"
        @mouseleave="scheduleHide()"
        @focus="scheduleShow(n.id, $event.currentTarget as HTMLElement)"
        @blur="scheduleHide()">
        <span class="sec-dot" :style="{ background: colorDe(n.seccion) }" aria-hidden="true"></span>
        {{ n.titulo }}
        <span class="id-mono" style="margin-left:auto">{{ n.resumen.slice(0, 60) }}</span>
      </RouterLink>
    </div>

    <div v-if="mismas.length" style="margin-bottom:12px">
      <div class="rel-group">Mismos conceptos</div>
      <RouterLink v-for="n in mismas" :key="n.id" :to="`/n/${n.id}`" class="rel-row"
        @click="(e: MouseEvent) => { if (e.shiftKey || e.ctrlKey || e.metaKey) { e.preventDefault(); openPeek(n.id) } }"
        @mouseenter="scheduleShow(n.id, $event.currentTarget as HTMLElement)"
        @mouseleave="scheduleHide()"
        @focus="scheduleShow(n.id, $event.currentTarget as HTMLElement)"
        @blur="scheduleHide()">
        <span class="sec-dot" :style="{ background: colorDe(n.seccion) }" aria-hidden="true"></span>
        {{ n.titulo }}
      </RouterLink>
    </div>

    <nav class="pager" aria-label="Anterior y siguiente">
      <RouterLink v-if="vecinas.prev" :to="`/n/${vecinas.prev.id}`" class="btn btn-ghost"
        @click="(e: MouseEvent) => { if (e.shiftKey || e.ctrlKey || e.metaKey) { e.preventDefault(); openPeek(vecinas.prev!.id) } }">{{ vecinas.prev.titulo }} ←</RouterLink>
      <span v-else></span>
      <RouterLink v-if="vecinas.next" :to="`/n/${vecinas.next.id}`" class="btn btn-ghost"
        @click="(e: MouseEvent) => { if (e.shiftKey || e.ctrlKey || e.metaKey) { e.preventDefault(); openPeek(vecinas.next!.id) } }">{{ vecinas.next.titulo }} →</RouterLink>
    </nav>
  </section>
</template>
