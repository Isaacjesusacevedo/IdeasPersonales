import { notas, notaPorId, secciones, type VaultNote } from './vault'

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

export function lecturaLabel(nota: VaultNote): string {
  const m = lecturaMin(nota)
  return m < 2 ? 'Lectura breve' : `${m} min`
}

export interface BacklinkCtx { nota: VaultNote; fragmento: string; via: 'relacion' | 'wikilink' }
export interface MencionCtx { nota: VaultNote; fragmento: string }

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function camposTexto(n: VaultNote): string[] {
  const out: string[] = []
  if (n.intro) out.push(n.intro)
  if (n.resumen) out.push(n.resumen)
  out.push(...n.puntos)
  for (const c of n.claves ?? []) out.push(c.termino, c.definicion)
  const walk = (bs: VaultNote['bloques']) => {
    for (const b of bs ?? []) {
      if (b.t === 'desplegable') walk(b.bloques)
      else if (b.t === 'lista') out.push(...b.items)
      else {
        if ('titulo' in b && b.titulo) out.push(b.titulo)
        if (b.texto) out.push(b.texto)
      }
    }
  }
  walk(n.bloques)
  return out.filter(Boolean)
}

function fragmentoCon(texto: string, titulo: string): string {
  const nt = norm(titulo)
  const ntText = norm(texto)
  let idx = ntText.indexOf(nt)
  if (idx < 0) {
    // búsqueda por tokens
    const tok = nt.split(/\s+/)[0]
    idx = tok ? ntText.indexOf(tok) : -1
  }
  if (idx < 0) return texto.slice(0, 180).trim()
  let start = 0
  for (let i = idx; i >= 0; i--) {
    if (/[.!?;\n]/.test(texto[i])) { start = i + 1; break }
  }
  let end = texto.length
  for (let i = idx + nt.length; i < texto.length; i++) {
    if (/[.!?;\n]/.test(texto[i])) { end = i + 1; break }
  }
  let frag = texto.slice(start, end).trim()
  if (!frag) frag = texto.slice(Math.max(0, idx - 90), Math.min(texto.length, idx + nt.length + 90)).trim()
  if (frag.length > 200) frag = frag.slice(0, 197) + '…'
  return frag
}

function contieneTitulo(texto: string, titulo: string): boolean {
  const nt = norm(titulo)
  if (nt.length < 4) return false
  const re = new RegExp('(^|[^a-z0-9])' + escapeRegex(nt) + '([^a-z0-9]|$)')
  return re.test(norm(texto))
}

function buscarWikilink(n: VaultNote, targetId: string): string | null {
  const re = new RegExp('\\[\\[' + escapeRegex(targetId) + '(?:\\|[^\\]]*)?\\]\\]')
  for (const c of camposTexto(n)) {
    if (re.test(c)) return fragmentoCon(c, targetId)
  }
  return null
}

function calcularBacklinksContexto(id: string): BacklinkCtx[] {
  const target = notaPorId(id)
  if (!target) return []
  const out: BacklinkCtx[] = []
  const seen = new Set<string>()
  for (const n of notas) {
    if (n.id === id) continue
    const wikiFrag = buscarWikilink(n, id)
    const viaRel = n.relaciones.includes(id)
    if (!wikiFrag && !viaRel) continue
    if (seen.has(n.id)) continue
    seen.add(n.id)
    if (wikiFrag) out.push({ nota: n, fragmento: wikiFrag, via: 'wikilink' })
    else out.push({ nota: n, fragmento: n.intro || n.resumen, via: 'relacion' })
  }
  out.sort((a, b) => {
    const ia = secciones.findIndex(s => s.id === a.nota.seccion)
    const ib = secciones.findIndex(s => s.id === b.nota.seccion)
    if (ia !== ib) return ia - ib
    return a.nota.titulo.localeCompare(b.nota.titulo)
  })
  return out
}

function calcularMenciones(id: string): MencionCtx[] {
  const target = notaPorId(id)
  if (!target || norm(target.titulo).length < 4) return []
  const backlinkIds = new Set((backlinksContextoCache[id] ?? []).map(x => x.nota.id))
  const out: MencionCtx[] = []
  for (const n of notas) {
    if (n.id === id) continue
    if (backlinkIds.has(n.id)) continue
    let frag: string | null = null
    for (const c of camposTexto(n)) {
      if (contieneTitulo(c, target.titulo)) { frag = fragmentoCon(c, target.titulo); break }
    }
    if (!frag) continue
    out.push({ nota: n, fragmento: frag })
  }
  out.sort((a, b) => {
    const ia = secciones.findIndex(s => s.id === a.nota.seccion)
    const ib = secciones.findIndex(s => s.id === b.nota.seccion)
    if (ia !== ib) return ia - ib
    return a.nota.titulo.localeCompare(b.nota.titulo)
  })
  return out.slice(0, 8)
}

const backlinksContextoCache: Record<string, BacklinkCtx[]> = {}
const mencionesCache: Record<string, MencionCtx[]> = {}
for (const n of notas) backlinksContextoCache[n.id] = calcularBacklinksContexto(n.id)
for (const n of notas) mencionesCache[n.id] = calcularMenciones(n.id)

export function backlinksConContexto(id: string): BacklinkCtx[] {
  return backlinksContextoCache[id] ?? []
}
export function mencionesSinEnlazar(id: string): MencionCtx[] {
  return mencionesCache[id] ?? []
}

/** Texto normalizado por nota para el índice de búsqueda. */
export const indiceBusqueda: Record<string, string> = {}
for (const n of notas) indiceBusqueda[n.id] = norm(textoNota(n))

export interface Hit { nota: VaultNote; score: number }

/** Búsqueda con AND de tokens y ranking título > tags/categoría > intro/resumen > cuerpo. */
export function buscarNotas(query: string): Hit[] {
  const toks = norm(query).split(/\s+/).filter(Boolean)
  if (!toks.length) return notas.map(nota => ({ nota, score: 0 }))
  const out: Hit[] = []
  for (const n of notas) {
    const titulo = norm(n.titulo)
    const medio = norm([n.categoria, n.seccion, ...(n.tags ?? [])].join(' '))
    const intro = norm([(n.intro ?? ''), n.resumen].join(' '))
    const cuerpo = indiceBusqueda[n.id]
    let score = 0
    let ok = true
    for (const t of toks) {
      if (titulo.includes(t)) score += 10
      else if (medio.includes(t)) score += 5
      else if (intro.includes(t)) score += 3
      else if (cuerpo.includes(t)) score += 1
      else { ok = false; break }
    }
    if (ok) out.push({ nota: n, score })
  }
  return out.sort((a, b) => b.score - a.score || (a.nota.titulo < b.nota.titulo ? -1 : 1))
}

export interface Frag { texto: string; mark: boolean }

/** Parte el texto en fragmentos para resaltar con <mark> sin v-html. */
export function resaltar(texto: string, query: string): Frag[] {
  const toks = query.trim().split(/\s+/).filter(Boolean)
    .sort((a, b) => b.length - a.length)
  if (!toks.length) return [{ texto, mark: false }]
  const low = texto.toLowerCase()
  const rangos: [number, number][] = []
  for (const t of toks) {
    const lt = t.toLowerCase()
    let i = 0
    while ((i = low.indexOf(lt, i)) >= 0) {
      rangos.push([i, i + t.length])
      i += t.length
    }
  }
  if (!rangos.length) return [{ texto, mark: false }]
  rangos.sort((a, b) => a[0] - b[0])
  const unidos: [number, number][] = [rangos[0]]
  for (const r of rangos.slice(1)) {
    const u = unidos[unidos.length - 1]
    if (r[0] <= u[1]) u[1] = Math.max(u[1], r[1])
    else unidos.push(r)
  }
  const out: Frag[] = []
  let k = 0
  for (const [a, b] of unidos) {
    if (a > k) out.push({ texto: texto.slice(k, a), mark: false })
    out.push({ texto: texto.slice(a, b), mark: true })
    k = b
  }
  if (k < texto.length) out.push({ texto: texto.slice(k), mark: false })
  return out
}

/** Nota al azar distinta de la actual (si se indica). */
export function notaAlAzar(exceptoId?: string): VaultNote {
  const pool = exceptoId ? notas.filter(n => n.id !== exceptoId) : notas
  return pool[Math.floor(Math.random() * pool.length)]
}

if (import.meta.env.DEV) {
  const ids = new Set(notas.map(n => n.id))
  for (const n of notas) {
    for (const r of n.relaciones) {
      if (!ids.has(r)) console.warn(`[vault] relación rota: ${n.id} → ${r}`)
    }
  }
}
