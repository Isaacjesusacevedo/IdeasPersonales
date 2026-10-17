import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const stack = ref<string[]>([])
let routerRef: ReturnType<typeof useRouter> | null = null
let routeRef: ReturnType<typeof useRoute> | null = null
let initialized = false

function init() {
  if (initialized) return
  initialized = true
  routerRef = useRouter()
  routeRef = useRoute()
  const syncFromQuery = () => {
    const p = routeRef!.query.peek
    const ids = Array.isArray(p) ? p : (typeof p === 'string' ? p.split(',') : [])
    stack.value = ids.map(x => String(x)).filter(Boolean).slice(0, 3)
  }
  watch(() => routeRef!.query.peek, syncFromQuery, { immediate: true })
}

function syncToQuery() {
  if (!routerRef || !routeRef) return
  const q = { ...routeRef.query }
  if (stack.value.length) q.peek = stack.value.join(',')
  else delete q.peek
  routerRef.replace({ query: q })
}

export function usePeek() {
  init()
  const open = (id: string) => {
    if (stack.value.length >= 3) stack.value.shift()
    if (stack.value[stack.value.length - 1] !== id) stack.value.push(id)
    syncToQuery()
  }
  const closeTop = () => {
    stack.value.pop()
    syncToQuery()
  }
  const closeAll = () => {
    stack.value = []
    syncToQuery()
  }
  const replaceTop = (id: string) => {
    if (!stack.value.length) stack.value.push(id)
    else stack.value[stack.value.length - 1] = id
    syncToQuery()
  }
  return { stack, open, closeTop, closeAll, replaceTop }
}