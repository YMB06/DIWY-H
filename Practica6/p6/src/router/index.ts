import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/ej1',
      name: 'ejercicio1',
      component: () => import('../views/Ejercicio1View.vue')
    },
    {
      path: '/ej2',
      name: 'ejercicio2',
      component: () => import('../views/Ejercicio2View.vue')
    },
    {
      path: '/ej3',
      name: 'ejercicio3',
      component: () => import('../views/Ejercicio3View.vue')
    },
    {
      path: '/ej4',
      name: 'ejercicio4',
      component: () => import('../views/Ejercicio4View.vue')
    },
    {
      path: '/ej5',
      name: 'ejercicio5',
      component: () => import('../views/Ejercicio5View.vue')
    }
  ]
})

export default router
