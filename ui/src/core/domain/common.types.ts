import type { User } from './user.types'

export interface AuditProperties {
  createdAt: Date
  createdBy: User['id']
  updatedAt: Date | null
  updatedBy: User['id'] | null
}
