import type { NewUserExpense } from '@/core/domain/user-expense.types'
import { axiosInstance } from '../..'

export const createUserExpenseTransaction = async (expense: NewUserExpense) => {
  const { data } = await axiosInstance.post('/transactions/expenses', expense)
  return data
}
