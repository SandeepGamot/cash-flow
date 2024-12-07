import type { PaymentMode, UnapprovedPaymentMode } from '@/core/domain/user-expense.types'
import { axiosInstance } from '../..'

export const getPaymentModes = async () => {
  const { data } = await axiosInstance.get<PaymentMode[]>('/transactions/expenses/payment-modes')
  return data
}

export const getAllUnapprovedPaymentModes = async () => {
  const { data } = await axiosInstance.get<UnapprovedPaymentMode[]>(
    '/transactions/expenses/payment-modes?unapprovedOnly=true'
  )
  return data
}
