import { http, HttpResponse } from 'msw'

import type { ApproveOrderParams } from '../approve-order'

export const approveOrderMockHandler = http.patch<
  ApproveOrderParams,
  never,
  never
>('/orders/:orderId/approve', async ({ params }) => {
  const { orderId } = params

  if (orderId === 'error-order-id') {
    return new HttpResponse(null, { status: 400 })
  }

  return new HttpResponse(null, { status: 204 })
})
