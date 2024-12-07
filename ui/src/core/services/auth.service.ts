import { axiosInstance } from '.'
import type { User } from '../domain/user.types'

export const verifyAuth = async () => {
  const { data } = await axiosInstance.get<{ user: User }>('/users/verify')
  return data.user
}

export const getAuthUrl = async () => {
  const {
    data: { url }
  } = await axiosInstance.get<{ url: string }>('/auth/google', {
    withCredentials: false
  })
  return url
}
