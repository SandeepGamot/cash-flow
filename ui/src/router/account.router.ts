import AccountPage from '@/views/account-page/AccountPage.vue'
import type { RouteRecordRaw } from 'vue-router'

export const accountRouteNames = {
  base: 'accounts',
  user: 'accounts.user'
}

export const accountRoutes: Array<RouteRecordRaw> = [
  {
    name: accountRouteNames.base,
    path: '/accounts/:id',
    children: [
      {
        name: accountRouteNames.user,
        path: '',
        component: AccountPage
      }
    ]
  }
]
