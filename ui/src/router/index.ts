import { createRouter, createWebHistory } from 'vue-router'
import { authRouteNames, authRoutes } from '@/router/auth.router'
import NotFound from '@/components/common/NotFound.vue'
import HomePage from '@/views/home-page/HomePage.vue'
import { userRouteNames, userRoutes } from './user.router'
import { transatctionRouteNames, transatctionRoutes } from './transaction.router'
import { useUserStore } from '@/stores/user.store'

export const AppRoutes = {
  base: 'home-page',
  auth: authRouteNames,
  users: userRouteNames,
  transactions: transatctionRouteNames,
  error: {
    notFound: '404'
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    ...userRoutes,
    ...transatctionRoutes,
    {
      path: '/',
      name: AppRoutes.base,
      component: HomePage
    },
    {
      path: '/:pathMatch(.*)*',
      name: AppRoutes.error.notFound,
      component: NotFound
    }
  ]
})

export default router
