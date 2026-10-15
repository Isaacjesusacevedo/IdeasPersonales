import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior() { return { top: 0 } },
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { title: 'Dashboard' } },
    { path: '/ideas', name: 'ideas', component: () => import('@/views/IdeasView.vue'), meta: { title: 'Ideas sueltas' } },
    { path: '/ideas/:id', name: 'idea-detail', component: () => import('@/views/IdeaDetailView.vue'), meta: { title: 'Detalle' } },
    { path: '/s/:seccion', name: 'seccion', component: () => import('@/views/SeccionView.vue'), meta: { title: 'Sección' } },
    { path: '/n/:id', name: 'nota', component: () => import('@/views/NotaView.vue'), meta: { title: 'Nota' } },
    { path: '/buscar', name: 'buscar', component: () => import('@/views/BuscarView.vue'), meta: { title: 'Buscar' } },
    { path: '/t/:tag', name: 'tag', component: () => import('@/views/TagView.vue'), meta: { title: 'Etiqueta' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue'), meta: { title: 'No encontrado' } }
  ]
})

router.afterEach((to) => {
  const title = (to.meta.title as string) ?? 'App'
  document.title = `${title} · Ideas Personales`
})

export default router
