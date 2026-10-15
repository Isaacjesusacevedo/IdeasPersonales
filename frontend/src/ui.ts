import { reactive } from 'vue'

export type SidebarMode = 'expanded' | 'compact'

const KEY = 'ip:sidebar'

function loadMode(): SidebarMode {
  try {
    return localStorage.getItem(KEY) === 'compact' ? 'compact' : 'expanded'
  } catch {
    return 'expanded'
  }
}

function paint() {
  try {
    const root = document.documentElement
    root.setAttribute('data-sidebar', ui.reading ? 'hidden' : ui.mode)
    if (ui.reading) root.setAttribute('data-reading', '1')
    else root.removeAttribute('data-reading')
  } catch {
    /* entorno sin DOM */
  }
}

export const ui = reactive({
  mode: loadMode(),
  drawer: false,
  reading: false
})

export function toggleSidebar() {
  ui.mode = ui.mode === 'expanded' ? 'compact' : 'expanded'
  try {
    localStorage.setItem(KEY, ui.mode)
  } catch {
    /* almacenamiento no disponible */
  }
  paint()
}

export function enterReading() {
  ui.drawer = false
  ui.reading = true
  paint()
}

export function exitReading() {
  ui.reading = false
  paint()
}

// Aplica el estado inicial (el inline de index.html ya evitó el parpadeo)
paint()
