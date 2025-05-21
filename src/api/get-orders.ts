import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface GetOrdersResponse {
  orders: {
    orderId: string
    customerName: string
    total: number
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    createdAt: string | null
  }[]
  meta: {
    totalCount: number
    pageIndex: number
    perPage: number
  }
}

export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersQuery) {
  const { data } = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName: customerName?.trim(),
      status,
    },
  })

  return data
}
