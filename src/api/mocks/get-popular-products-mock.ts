import { http, HttpResponse } from 'msw'

import type { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMockHandler = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    {
      product: 'Product 1',
      amount: 100,
    },
    {
      product: 'Product 2',
      amount: 700,
    },
    {
      product: 'Product 3',
      amount: 400,
    },
    {
      product: 'Product 4',
      amount: 200,
    },
  ])
})
