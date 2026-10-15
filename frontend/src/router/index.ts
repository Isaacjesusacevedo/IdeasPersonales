import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { title: 'Dashboard' } },
    { path: '/ideas', name: 'ideas', component: () => import('@/views/IdeasView.vue'), meta: { title: 'Ideas' } },
    { path: '/ideas/:id', name: 'idea-detail', component: () => import('@/views/IdeaDetailView.vue'), meta: { title: 'Detalle' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue'), meta: { title: 'No encontrado' } }
  ]
})

router.afterEach((to) => {
  const title = (to.meta.title as string) ?? 'App'
  document.title = `${title} · Ideas Personales`
})

export default router
