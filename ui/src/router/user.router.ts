import UserLoginForm from '@/views/auth/UserLoginForm.vue'
import UserRegisterationForm from '@/views/auth/UserRegisterationForm.vue'
import type { RouteRecordRaw } from 'vue-router'

export const userRouteNames = {
  base: 'users',
  register: 'users.register',
  login: 'users.login'
}

export const userRoutes: Array<RouteRecordRaw> = [
  {
    name: userRouteNames.base,
    path: '/users',
    children: [
      {
        name: userRouteNames.register,
        path: 'register',
        component: UserRegisterationForm
      },
      {
        name: userRouteNames.login,
        path: 'login',
        component: UserLoginForm
      }
    ]
  }
]
