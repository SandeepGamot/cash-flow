import { axiosInstance } from '.'

export const getAccountDetails = async (id: string) => {
  const { data } = await axiosInstance.get(`/accounts/${id}`)
  return data
}
