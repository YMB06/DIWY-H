import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/smart-home',
      name: 'smart-home',
      component: () => import('../views/SmartHomeView.vue'),
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('../views/LandingView.vue'),
    },
  ],
})

export default router
