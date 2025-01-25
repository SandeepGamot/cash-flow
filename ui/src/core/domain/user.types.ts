
export type UserRoleKey = 0 | 1

export interface User {
  id: string
  username: string
  password: string
  role_key: UserRoleKey
}

export interface UserStore {
  user: User | null
}


//  DTOs
export type CreateUserDto = Pick<User, 'username' | 'password'> 


