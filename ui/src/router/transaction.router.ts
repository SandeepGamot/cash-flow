import { useUserStore } from '@/stores/user.store'
import UserExpenseForm from '@/views/transaction-forms/UserExpenseForm.vue'
import UserIncomeForm from '@/views/transaction-forms/UserIncomeForm.vue'
import type { RouteRecordRaw } from 'vue-router'
import { userRouteNames } from './user.router'

export const transatctionRouteNames = {
  base: 'transactions',
  vault: 'transactions.vault',
  income: {
    new: 'transactions.income.new',
    detail: 'transactions.income.detail'
  },
  expense: {
    new: 'transactions.expense.new',
    detail: 'transactions.expense.detail'
  }
}

export const transatctionRoutes: Array<RouteRecordRaw> = [
  {
    name: transatctionRouteNames.base,
    path: '/transactions',
    async beforeEnter(_, __, next) {
      const { isLoggedIn, verifyUser } = useUserStore()
      await verifyUser()
      if (!isLoggedIn) {
        return next({ name: userRouteNames.login })
      }
      next()
    },
    children: [
      {
        path: 'expense',
        children: [
          {
            name: transatctionRouteNames.expense.new,
            path: 'new',
            component: UserExpenseForm
          }
        ]
      },
      {
        path: 'income',
        children: [
          {
            name: transatctionRouteNames.income.new,
            path: 'new',
            component: UserIncomeForm
          }
        ]
      }
    ]
  }
]
