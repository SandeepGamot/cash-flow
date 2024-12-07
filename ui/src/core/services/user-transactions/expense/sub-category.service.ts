import type { SubCategory, UnapprovedSubCategory } from '@/core/domain/user-expense.types'
import { axiosInstance } from '../..'

export const getSubCategories = async () => {
  const { data } = await axiosInstance.get<SubCategory[]>('/transactions/expenses/sub-categories')
  return data
}

export const getAllUnapprovedSubCategories = async () => {
  const { data } = await axiosInstance.get<UnapprovedSubCategory[]>(
    '/transactions/expenses/sub-categories?unapprovedOnly=true'
  )
  return data
}
