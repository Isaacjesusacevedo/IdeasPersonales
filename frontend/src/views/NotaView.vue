<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { notaPorId, notasPorSeccion, secciones } from '@/data/vault'
import { lecturaMin } from '@/data/vault-index'
import { ui, enterReading, exitReading } from '@/ui'
import NoteRenderer from '@/components/NoteRenderer.vue'
import NoteToc from '@/components/NoteToc.vue'
import CalloutCard from '@/components/CalloutCard.vue'
import Collapsible from '@/components/Collapsible.vue'
import TagChip from '@/components/TagChip.vue'
import ReadingProgress from '@/components/ReadingProgress.vue'
import RelatedNotes from '@/components/RelatedNotes.vue'
import InlineText from '@/components/InlineText.vue'

const route = useRoute()
const filtroColeccion = ref('')
const nota = computed(() => notaPorId(route.params.id as string))
const seccionNombre = computed(() => secciones.find(s => s.id === nota.value?.seccion)?.nombre ?? '')
const tipo = computed(() => nota.value?.tipo ?? 'articulo')

const puntosFiltrados = computed(() => {
  const t = filtroColeccion.value.trim().toLowerCase()
  const pts = nota.value?.puntos ?? []
  if (!t) return pts
  return pts.filter(p => p.toLowerCase().includes(t))
})

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && ui.reading) exitReading()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="page">
    <ReadingProgress v-if="nota" />
    <div v-if="!nota" class="card notfound">
      <div class="page-eyebrow">Nota · no encontrada</div>
      <h2>Esta nota no existe</h2>
      <p style="color:var(--text-muted)">Revisá el enlace o volvé al inicio.</p>
      <br /><RouterLink to="/" class="btn btn-primary">Volver al inicio</RouterLink>
    </div>

    <div v-else>
      <div class="page-header">
        <div class="page-eyebrow">{{ seccionNombre }} · {{ nota.categoria }} · {{ nota.origen }}</div>
        <h1 class="page-title">{{ nota.titulo }}</h1>
        <p v-if="nota.intro" class="lead">{{ nota.intro }}</p>
        <p v-else class="page-subtitle">{{ nota.resumen }}</p>
        <div class="meta-row">
          <span class="id-mono">{{ lecturaMin(nota) }} min de lectura</span>
          <span class="badge badge-muted">{{ tipo }}</span>
          <RouterLink :to="`/s/${nota.seccion}`" class="badge badge-purple" style="text-decoration:none">← {{ seccionNombre }}</RouterLink>
          <button v-if="!ui.reading" class="btn btn-ghost btn-sm" @click="enterReading" aria-label="Activar modo lectura">Modo lectura</button>
        </div>
        <div v-if="nota.tags?.length" class="tag-row">
          <TagChip v-for="t in nota.tags" :key="t" :tag="t" />
        </div>
      </div>

      <div class="nota-layout">
        <div class="nota-col">
          <!-- ARTICULO -->
          <template v-if="tipo === 'articulo'">
            <NoteRenderer v-if="nota.bloques?.length" :bloques="nota.bloques" />
            <ul v-else class="puntos">
              <li v-for="(p, i) in nota.puntos" :key="i">{{ p }}</li>
            </ul>
          </template>

          <!-- FICHA -->
          <template v-else-if="tipo === 'ficha'">
            <CalloutCard v-if="nota.intro" variante="definicion" :texto="nota.intro" />
            <div v-if="nota.claves?.length" class="claves-grid">
              <div v-for="c in nota.claves" :key="c.termino" class="card">
                <div class="card-title" style="margin-bottom:8px">{{ c.termino }}</div>
                <p style="color:var(--text);font-size:14px">{{ c.definicion }}</p>
              </div>
            </div>
            <NoteRenderer v-if="nota.bloques?.length" :bloques="nota.bloques" />
            <ul v-if="!nota.bloques?.length" class="puntos">
              <li v-for="(p, i) in nota.puntos" :key="i">{{ p }}</li>
            </ul>
          </template>

          <!-- COLECCION -->
          <template v-else-if="tipo === 'coleccion'">
            <input v-model="filtroColeccion" class="form-input" placeholder="Filtrar ideas…" aria-label="Filtrar ideas de la colección" style="margin-bottom:14px;max-width:320px" />
            <div class="idea-grid">
              <div v-for="(p, i) in puntosFiltrados" :key="i" class="card">
                <span class="id-mono">#{{ i + 1 }}</span>
                <p style="margin-top:6px"><InlineText :texto="p" /></p>
              </div>
            </div>
            <NoteRenderer v-if="nota.bloques?.length" :bloques="nota.bloques" />
          </template>

          <!-- PROYECTO -->
          <template v-else-if="tipo === 'proyecto'">
            <div class="tag-row" style="margin-bottom:16px">
              <span class="badge badge-teal">{{ nota.categoria }}</span>
              <span class="badge badge-muted">{{ nota.relaciones.length }} conexiones</span>
              <span class="badge badge-muted">{{ lecturaMin(nota) }} min</span>
            </div>
            <NoteRenderer v-if="nota.bloques?.length" :bloques="nota.bloques" />
            <ul v-else class="puntos">
              <li v-for="(p, i) in nota.puntos" :key="i">{{ p }}</li>
            </ul>
          </template>

          <!-- INDICE -->
          <template v-else>
            <NoteRenderer v-if="nota.bloques?.length" :bloques="nota.bloques" />
            <div class="card">
              <div class="card-title" style="margin-bottom:12px">Notas enlazadas</div>
              <RelatedNotes :nota="nota" />
            </div>
          </template>

          <RelatedNotes v-if="tipo !== 'indice'" :nota="nota" />

          <Collapsible titulo="Contenido original del vault" style="margin-top:16px">
            <p style="color:var(--text-muted);font-size:14px;margin-bottom:10px">{{ nota.resumen }}</p>
            <ul class="puntos">
              <li v-for="(p, i) in nota.puntos" :key="i">{{ p }}</li>
            </ul>
          </Collapsible>
        </div>

        <NoteToc v-if="nota.bloques?.length" :bloques="nota.bloques" />
      </div>

      <button v-if="ui.reading" class="reading-exit" @click="exitReading" aria-label="Salir del modo lectura">Salir ✕ (Esc)</button>
    </div>
  </div>
</template>
