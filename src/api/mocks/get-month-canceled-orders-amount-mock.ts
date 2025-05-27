import { http, HttpResponse } from 'msw'

import type { GetMonthCanceledOrdersAmountResponse } from '../get-month-canceled-orders-amount'

export const getMonthCanceledOrdersAmountMockHandler = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', async () => {
  return HttpResponse.json({
    amount: 7,
    diffFromLastMonth: -5,
  })
})
