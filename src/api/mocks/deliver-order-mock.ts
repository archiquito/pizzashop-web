import { http, HttpResponse } from 'msw'

import type { DeliverOrderParams } from '../deliver-order'

export const deliverOrderMockHandler = http.patch<
  DeliverOrderParams,
  never,
  never
>('/orders/:orderId/deliver', async ({ params }) => {
  const { orderId } = params

  if (orderId === 'error-order-id') {
    return new HttpResponse(null, { status: 400 })
  }

  return new HttpResponse(null, { status: 204 })
})
