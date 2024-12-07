export type TransactionType = 'income' | 'expense' | 'transfer' | 'vault_deposit' | 'vault_withdraw'

export const TransactionTypeEnum = {
  INCOME: 'income',
  EXPENSE: 'expense',
  TRANSFER: 'transfer',
  VAULT_DEPOSIT: 'vault_deposit',
  VAULT_WITHDRAW: 'vault_withdraw'
} as const
