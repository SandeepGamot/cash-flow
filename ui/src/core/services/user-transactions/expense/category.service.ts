import type { Category, UnapprovedCategory } from '@/core/domain/user-expense.types'
import { axiosInstance } from '../..'

export const getCategories = async () => {
  const { data } = await axiosInstance.get<Category[]>('/transactions/expenses/categories')
  return data
}

export const getAllUnapprovedCategories = async () => {
  const { data } = await axiosInstance.get<UnapprovedCategory[]>(
    '/transactions/expenses/categories?unapprovedOnly=true'
  )
  return data
}
