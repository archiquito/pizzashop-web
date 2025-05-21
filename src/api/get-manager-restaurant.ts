import { api } from '@/lib/axios'

export interface GetManagerRestaurantResponse {
  id: string
  name: string
  description: string | null
  managerId: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getManagerRestaurant() {
  const { data } = await api.get<GetManagerRestaurantResponse>(
    '/managed-restaurant',
  )

  return data
}
