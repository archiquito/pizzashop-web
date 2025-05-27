import { http, HttpResponse } from 'msw'

import type {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrdersDetailMockHandler = http.get<
  never,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', async ({ params }: { params: GetOrderDetailsParams }) => {
  const { orderId } = params

  if (orderId === '1') {
    return HttpResponse.json({
      id: '1',
      customerName: 'John Doe',
      total: 100,
      status: 'pending',
      createdAt: '2021-01-01',
      totalInCents: 100,
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      },
      orderItems: [
        {
          id: '1',
          priceInCents: 100,
          quantity: 1,
          product: {
            name: 'Product 1',
          },
        },
      ],
    })
  }

  return HttpResponse.json({
    id: '2',
    customerName: 'Jane Doe',
    total: 200,
    status: 'processing',
    createdAt: '2021-01-02',
    totalInCents: 200,
    customer: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+1234567890',
    },
    orderItems: [
      {
        id: '1',
        priceInCents: 100,
        quantity: 1,
        product: {
          name: 'Product 1',
        },
      },
    ],
  })
})
