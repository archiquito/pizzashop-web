import { http, HttpResponse } from 'msw'

import type { GetOrdersResponse } from '../get-orders'

type OrderStatus = GetOrdersResponse['orders'][number]['status']

const statuses: OrderStatus[] = [
  'pending',
  'processing',
  'delivered',
  'canceled',
  'delivering',
]

const orders: GetOrdersResponse['orders'] = Array.from(
  { length: 30 },
  (_, index) => ({
    orderId: `order-${index + 1}`,
    customerName: `John Doe ${index + 1}`,
    total: 100,
    status: statuses[index % 5],
    createdAt: new Date().toISOString(),
  }),
)

export const getOrdersMockHandler = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)
    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0
    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const totalCount = filteredOrders.length

    const ordersToReturn = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    if (
      pageIndex === 1 &&
      orderId === '1' &&
      customerName === 'John Doe' &&
      status === 'pending'
    ) {
      return HttpResponse.json({
        orders: ordersToReturn,
        meta: {
          totalCount,
          pageIndex,
          perPage: 10,
        },
      })
    }

    return HttpResponse.json({
      orders: ordersToReturn,
      meta: {
        totalCount,
        pageIndex,
        perPage: 10,
      },
    })
  },
)
