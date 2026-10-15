// Parser inline propio: [[id]], [[id|visible]], **negrita**, `código`.
// Devuelve segmentos para renderizar con plantilla (PROHIBIDO v-html).
export type Segment =
  | { k: 't'; texto: string }
  | { k: 'b'; texto: string }
  | { k: 'c'; texto: string }
  | { k: 'l'; id: string; texto: string }

const RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]|\*\*([^*]+)\*\*|`([^`]+)`/g

export function parseInline(input: string): Segment[] {
  const out: Segment[] = []
  let last = 0
  RE.lastIndex = 0
  for (let m = RE.exec(input); m; m = RE.exec(input)) {
    if (m.index > last) out.push({ k: 't', texto: input.slice(last, m.index) })
    if (m[1] !== undefined) out.push({ k: 'l', id: m[1].trim(), texto: (m[2] ?? m[1]).trim() })
    else if (m[3] !== undefined) out.push({ k: 'b', texto: m[3] })
    else if (m[4] !== undefined) out.push({ k: 'c', texto: m[4] })
    last = m.index + m[0].length
  }
  if (last < input.length) out.push({ k: 't', texto: input.slice(last) })
  if (!out.length) out.push({ k: 't', texto: input })
  return out
}

/** Slug estable para ids de headings (TOC + anclas). */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Id de heading: MISMA fórmula en NoteRenderer y NoteToc. */
export function headingId(texto: string, prefijo = '', i = 0): string {
  return `${prefijo ? prefijo + '-' : ''}${slugify(texto) || 's'}-${i}`
}
