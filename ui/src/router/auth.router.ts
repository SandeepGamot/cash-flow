import GoogleAuth from '@/views/auth/GoogleAuth.vue'
import type { RouteRecordRaw } from 'vue-router'

export const authRouteNames = {
  google: 'auth.google'
}

export const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    children: [
      {
        name: authRouteNames.google,
        path: '/google',
        component: GoogleAuth
      }
    ]
  }
]
