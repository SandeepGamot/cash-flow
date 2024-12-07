import type { UserExpense } from '@/core/domain/user-expense.types'
import type { Nullable } from '@/core/utils/types'
import { defineStore } from 'pinia'

export const useUserExpenseStore = defineStore('userExpenseStore', {
  state: (): Nullable<UserExpense> => ({
    amount: null,
    category: null,
    subCategory: null,
    paymentMode: null,
    description: null,
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null
  }),
  actions: {
    setAmount(value: number) {
      this.amount = value
    },
    clearAmount() {
      this.amount = null
    }
  }
})
