import type { AuditProperties } from './common.types'

interface NewOption {
  isApproved: false
}

interface CreatedOption {
  id: string
  isApproved: true
}

interface UnapprovedOption {
  id: string
  isApproved: false
}

export interface NewCategory extends NewOption {
  category: string
}
export interface Category extends CreatedOption {
  category: string
}
export interface UnapprovedCategory extends UnapprovedOption {
  category: string
}

export interface NewSubCategory extends NewOption {
  subCategory: string
}
export interface SubCategory extends CreatedOption {
  subCategory: string
}
export interface UnapprovedSubCategory extends UnapprovedOption {
  subCategory: string
}

export interface NewPaymentMode extends NewOption {
  paymentMode: string
}
export interface PaymentMode extends CreatedOption {
  paymentMode: string
}
export interface UnapprovedPaymentMode extends UnapprovedOption {
  paymentMode: string
}

export interface UserExpenseBase {
  amount: number
  category: Category | NewCategory
  subCategory: SubCategory | NewSubCategory
  paymentMode: PaymentMode | NewPaymentMode
  description: string | null
}
export interface NewUserExpense extends UserExpenseBase {}

export interface UserExpense extends UserExpenseBase, AuditProperties {}
