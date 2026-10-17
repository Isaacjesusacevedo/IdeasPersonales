import { ref } from 'vue'

const targetId = ref<string | null>(null)
const anchorEl = ref<HTMLElement | null>(null)
const visible = ref(false)

let showTimer: number | undefined
let hideTimer: number | undefined

function clearTimers() {
  if (showTimer !== undefined) { window.clearTimeout(showTimer); showTimer = undefined }
  if (hideTimer !== undefined) { window.clearTimeout(hideTimer); hideTimer = undefined }
}

export function useNotePreview() {
  const showNow = (id: string, el?: HTMLElement | null) => {
    clearTimers()
    if (anchorEl.value && anchorEl.value !== el) anchorEl.value.removeAttribute('aria-describedby')
    targetId.value = id
    anchorEl.value = el ?? null
    if (el) el.setAttribute('aria-describedby', 'note-preview')
    visible.value = true
  }
  const scheduleShow = (id: string, el?: HTMLElement | null) => {
    clearTimers()
    showTimer = window.setTimeout(() => showNow(id, el), 250)
  }
  const scheduleHide = () => {
    clearTimers()
    hideTimer = window.setTimeout(() => {
      visible.value = false
      if (anchorEl.value) anchorEl.value.removeAttribute('aria-describedby')
      targetId.value = null
      anchorEl.value = null
    }, 150)
  }
  const cancelHide = () => {
    if (hideTimer !== undefined) { window.clearTimeout(hideTimer); hideTimer = undefined }
  }
  const hide = () => {
    clearTimers()
    visible.value = false
    if (anchorEl.value) anchorEl.value.removeAttribute('aria-describedby')
    targetId.value = null
    anchorEl.value = null
  }
  return { targetId, anchorEl, visible, showNow, scheduleShow, scheduleHide, cancelHide, hide }
}