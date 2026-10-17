import { computed, ref } from 'vue'
import { notas, notaPorId, notasPorSeccion } from '@/data/vault'

const KEY = 'ip:visited'

function load(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

const state = ref<string[]>(load())

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state.value)) } catch { /* */ }
}

export function useVisited() {
  const visitedSet = computed(() => new Set(state.value))

  const isVisited = (id: string) => visitedSet.value.has(id)

  const markVisited = (id: string) => {
    const idx = state.value.indexOf(id)
    if (idx >= 0) state.value.splice(idx, 1)
    state.value.push(id)
    if (state.value.length > 500) state.value.splice(0, state.value.length - 500)
    save()
  }

  const recent = (n = 3) =>
    state.value
      .slice(-n)
      .reverse()
      .map(id => notaPorId(id))
      .filter((x): x is (typeof notas)[number] => !!x)

  const unvisited = (pool: (typeof notas)[number][], n = 3) => {
    const out: (typeof notas)[number][] = []
    const cand = pool.filter(x => !isVisited(x.id))
    const copy = [...cand]
    while (out.length < n && copy.length) {
      out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0])
    }
    return out
  }

  const reset = () => {
    state.value = []
    save()
  }

  const countFor = (seccion: string) =>
    notasPorSeccion(seccion).filter(n => isVisited(n.id)).length

  const totalVisited = computed(() => visitedSet.value.size)

  return { state, isVisited, markVisited, recent, unvisited, reset, countFor, totalVisited, visitedSet }
}