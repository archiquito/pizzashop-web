import { api } from '@/lib/axios'

export interface GetOrderDetailsParams {
  orderId: string
}

export interface GetOrderDetailsResponse {
  id: string
  customerName: string
  total: number
  status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
  createdAt: string | null
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const { data } = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return data
}
