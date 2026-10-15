import type { App, Directive } from 'vue'

// v-reveal: entrada escalonada una sola vez vía IntersectionObserver.
// Uso: v-reveal="80" (retardo en ms, opcional).
let obs: IntersectionObserver | null = null

function getObs() {
  if (!obs) {
    obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).classList.add('visible')
            obs?.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 }
    )
  }
  return obs
}

export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible')
      return
    }
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    getObs().observe(el)
  },
  unmounted(el) {
    obs?.unobserve(el)
  }
}

export function installReveal(app: App) {
  app.directive('reveal', reveal)
}
