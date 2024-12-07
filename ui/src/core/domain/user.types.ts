import type { Account } from './account.types'

export type UserRoleKey = 0 | 1

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role_key: UserRoleKey
}

export interface UserStore {
  user: User | null
  account: Account | null
}
