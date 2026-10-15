import { aristas } from './data/vault-index'
import { notas } from './data/vault'

export interface GNode {
  id: string
  titulo: string
  seccion: string
  grado: number
  x: number
  y: number
  vx: number
  vy: number
}

export interface GEdge { a: number; b: number }

export const COLOR_POR_SECCION: Record<string, string> = {
  purple: '#a78bfa',
  teal: '#2dd4bf',
  mix: '#9aa3ff'
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function colorSeccion(seccion: string, acentoDe: (id: string) => string): string {
  const a = acentoDe(seccion)
  return a === 'teal' ? '#2dd4bf' : a === 'mix' ? '#9aa3ff' : '#a78bfa'
}

/** Grafo completo (opcionalmente filtrado por sección). */
export function buildGraph(
  soloSeccion: string | null,
  acentoDe: (id: string) => string
): { nodes: GNode[]; edges: GEdge[] } {
  const lista = soloSeccion ? notas.filter(n => n.seccion === soloSeccion) : notas
  const set = new Set(lista.map(n => n.id))
  const idx = new Map(lista.map((n, i) => [n.id, i] as [string, number]))
  const nodes: GNode[] = lista.map(n => ({
    id: n.id, titulo: n.titulo, seccion: n.seccion, grado: 0, x: 0, y: 0, vx: 0, vy: 0
  }))
  void acentoDe
  const edges: GEdge[] = []
  for (const [a, b] of aristas()) {
    if (!set.has(a) || !set.has(b)) continue
    edges.push({ a: idx.get(a)!, b: idx.get(b)! })
    nodes[idx.get(a)!].grado++
    nodes[idx.get(b)!].grado++
  }
  return { nodes, edges }
}

/** Vecindad a 1 salto alrededor de un id (para el grafo local). */
export function buildLocal(id: string): { nodes: GNode[]; edges: GEdge[]; centro: number } {
  const vecinas = new Set<string>([id])
  for (const [a, b] of aristas()) {
    if (a === id) vecinas.add(b)
    if (b === id) vecinas.add(a)
  }
  const lista = notas.filter(n => vecinas.has(n.id))
  const idx = new Map(lista.map((n, i) => [n.id, i] as [string, number]))
  const nodes: GNode[] = lista.map(n => ({
    id: n.id, titulo: n.titulo, seccion: n.seccion, grado: 0, x: 0, y: 0, vx: 0, vy: 0
  }))
  const edges: GEdge[] = []
  for (const [a, b] of aristas()) {
    if (!vecinas.has(a) || !vecinas.has(b)) continue
    edges.push({ a: idx.get(a)!, b: idx.get(b)! })
    nodes[idx.get(a)!].grado++
    nodes[idx.get(b)!].grado++
  }
  return { nodes, edges, centro: idx.get(id) ?? 0 }
}

/** Posiciones iniciales en círculo + jitter determinista. */
export function sembrar(nodes: GNode[], w: number, h: number, seed = 7) {
  const rand = mulberry32(seed)
  const cx = w / 2
  const cy = h / 2
  const R = Math.min(w, h) * 0.32
  nodes.forEach((n, i) => {
    const a = (i / Math.max(1, nodes.length)) * Math.PI * 2
    n.x = cx + Math.cos(a) * R + (rand() - 0.5) * 60
    n.y = cy + Math.sin(a) * R + (rand() - 0.5) * 60
    n.vx = 0
    n.vy = 0
  })
}

/** Un tick de fuerzas: repulsión O(n²) + resortes (~70px) + gravedad + amortiguación. */
export function tick(
  nodes: GNode[],
  edges: GEdge[],
  cx: number,
  cy: number,
  alpha: number
) {
  const n = nodes.length
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = nodes[i]
      const b = nodes[j]
      let dx = a.x - b.x
      let dy = a.y - b.y
      let d2 = dx * dx + dy * dy
      if (d2 < 1) { dx = 1; dy = 0; d2 = 1 }
      const d = Math.sqrt(d2)
      const f = Math.min((9000 / d2) * alpha, 4)
      const fx = (dx / d) * f
      const fy = (dy / d) * f
      a.vx += fx
      a.vy += fy
      b.vx -= fx
      b.vy -= fy
    }
  }
  for (const e of edges) {
    const a = nodes[e.a]
    const b = nodes[e.b]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const d = Math.max(1, Math.hypot(dx, dy))
    const f = ((d - 70) / d) * 0.06 * alpha
    a.vx += dx * f
    a.vy += dy * f
    b.vx -= dx * f
    b.vy -= dy * f
  }
  for (const nd of nodes) {
    nd.vx += (cx - nd.x) * 0.015 * alpha
    nd.vy += (cy - nd.y) * 0.015 * alpha
    nd.vx *= 0.85
    nd.vy *= 0.85
    const sp = Math.hypot(nd.vx, nd.vy)
    const cap = 6
    if (sp > cap) { nd.vx = (nd.vx / sp) * cap; nd.vy = (nd.vy / sp) * cap }
    nd.x += nd.vx
    nd.y += nd.vy
  }
}

export const radioNodo = (grado: number) => Math.min(16, 5 + grado * 1.1)
