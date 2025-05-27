import { http, HttpResponse } from 'msw'

import type { GetMonthRevenueResponse } from '../get-month-revenue'

export const getMonthRevenueMockHandler = http.get<
  never,
  never,
  GetMonthRevenueResponse
>('/metrics/month-receipt', async () => {
  return HttpResponse.json({
    receipt: 2000,
    diffFromLastMonth: -5,
  })
})
