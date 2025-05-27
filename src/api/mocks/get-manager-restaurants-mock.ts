import { http, HttpResponse } from 'msw'

import type { GetManagerRestaurantResponse } from '../get-manager-restaurant'

export const getManagerRestaurantsMockHandler = http.get<
  never,
  never,
  GetManagerRestaurantResponse
>('/managed-restaurant', async () => {
  return HttpResponse.json({
    id: '1',
    name: 'Pizza Shop',
    description: 'Pizza Shop description',
    managerId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
})
