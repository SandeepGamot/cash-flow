import { axiosInstance } from '.'
import type { CreateUserDto } from '@/core/domain/user.types'

export const getAccountDetails = async (id: string) => {
  const { data } = await axiosInstance.get(`/accounts/${id}`)
  return data
}

export const registerUser = async (user: CreateUserDto) => {
  const res = await axiosInstance.post('/users/register', user)
  return res
}
export const loginUser = async (user: CreateUserDto) => {
  const res = await axiosInstance.post('/users/login', user)
  return res
}
