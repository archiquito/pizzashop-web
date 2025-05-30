import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCancelAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                <span className="text-green-500 dark:text-green-400">
                  {monthCanceledOrdersAmount.diffFromLastMonth}% em relação ao
                  mês passado
                </span>
              ) : (
                <span className="text-red-500 dark:text-red-400">
                  +{monthCanceledOrdersAmount.diffFromLastMonth}% em relação ao
                  mês passado
                </span>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
