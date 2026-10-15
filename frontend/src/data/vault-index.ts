import { notas, notaPorId, type VaultNote } from './vault'

/** Normaliza para índice/búsqueda: minúsculas + sin acentos. */
export const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Texto completo de una nota para índice y lectura estimada. */
export function textoNota(n: VaultNote): string {
  const partes: string[] = [n.titulo, n.resumen, n.categoria, ...(n.tags ?? [])]
  if (n.intro) partes.push(n.intro)
  partes.push(...n.puntos)
  for (const c of n.claves ?? []) partes.push(c.termino, c.definicion)
  const walk = (bs: VaultNote['bloques']) => {
    for (const b of bs ?? []) {
      if (b.t === 'desplegable') walk(b.bloques)
      else if (b.t === 'lista') partes.push(...b.items)
      else partes.push('titulo' in b && b.titulo ? b.titulo : '', b.texto)
    }
  }
  walk(n.bloques)
  return partes.join(' ')
}

/** Índice etiqueta → notas (solo etiquetas usadas). */
export const tagIndex: Record<string, VaultNote[]> = {}
for (const n of notas) {
  for (const t of n.tags ?? []) {
    ;(tagIndex[t] ??= []).push(n)
  }
}

export const todasLasTags = () => Object.keys(tagIndex).sort()

export function notasPorTag(tag: string): VaultNote[] {
  return tagIndex[tag] ?? []
}

/** Backlinks: notas cuyas `relaciones` apuntan a este id. */
export function backlinks(id: string): VaultNote[] {
  return notas.filter(n => n.relaciones.includes(id))
}

/** Similares por solapamiento de tags + categoría/sección compartidas. */
export function notasSimilares(id: string, n = 4): VaultNote[] {
  const base = notaPorId(id)
  if (!base) return []
  const tagsBase = new Set(base.tags ?? [])
  return notas
    .filter(x => x.id !== id)
    .map(x => {
      let score = 0
      for (const t of x.tags ?? []) if (tagsBase.has(t)) score += 3
      if (x.categoria === base.categoria) score += 2
      if (x.seccion === base.seccion) score += 1
      return { x, score }
    })
    .filter(e => e.score > 0)
    .sort((a, b) => b.score - a.score || (a.x.id < b.x.id ? -1 : 1))
    .slice(0, n)
    .map(e => e.x)
}

/** Aristas no dirigidas deduplicadas entre ids válidos. */
export function aristas(): [string, string][] {
  const ids = new Set(notas.map(n => n.id))
  const seen = new Set<string>()
  const out: [string, string][] = []
  for (const n of notas) {
    for (const r of n.relaciones) {
      if (!ids.has(r)) continue
      const key = [n.id, r].sort().join('|')
      if (seen.has(key)) continue
      seen.add(key)
      out.push([n.id, r])
    }
  }
  return out
}

/** Minutos de lectura estimados (200 palabras/min, mínimo 1). */
export function lecturaMin(nota: VaultNote): number {
  const palabras = textoNota(nota).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(palabras / 200))
}

/** Texto normalizado por nota para el índice de búsqueda. */
export const indiceBusqueda: Record<string, string> = {}
for (const n of notas) indiceBusqueda[n.id] = norm(textoNota(n))

if (import.meta.env.DEV) {
  const ids = new Set(notas.map(n => n.id))
  for (const n of notas) {
    for (const r of n.relaciones) {
      if (!ids.has(r)) console.warn(`[vault] relación rota: ${n.id} → ${r}`)
    }
  }
}
