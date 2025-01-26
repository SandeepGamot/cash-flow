import type { NewUserExpense } from '@/core/domain/user-expense.types'
import { axiosInstance } from '../..'

export const createUserExpenseTransaction = async (expense: NewUserExpense) => {
  const { data } = await axiosInstance.post('/transactions/expenses', expense)
  return data
}

const getExpensesAggregate = async (startDate: Date, endDate: Date, userId?: string) => {
  const query = new URLSearchParams({
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString()
  })

  if (userId) {
    query.append('user', userId)
  }

  const {
    data: { totalAmount }
  } = await axiosInstance.get<{ totalAmount: number }>(
    '/transactions/expenses/aggregate?' + query.toString()
  )
  return totalAmount
}

export const getTodayExpenseAggregate = (userId?: string) => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  return getExpensesAggregate(start, end, userId)
}

export const getWeekExpenseAggregate = (userId?: string) => {
  const start = new Date()
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7)) // Set to the previous Monday
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setDate(end.getDate() + 6) // Set to the following Sunday
  end.setHours(23, 59, 59, 999)
  return getExpensesAggregate(start, end, userId)
}

export const getMonthExpenseAggregate = (userId?: string) => {
  const start = new Date()
  start.setDate(1) // Set to the first day of the month
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setMonth(end.getMonth() + 1) // Move to the next month
  end.setDate(0) // Set to the last day of the current month
  end.setHours(23, 59, 59, 999)
  return getExpensesAggregate(start, end, userId)
}  
