import { api } from '@/lib/axios'

export type GetDailyRevenueInPeriodParams = {
  from?: Date
  to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodParams) {
  const { data } = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: { from, to },
    },
  )

  return data
}
