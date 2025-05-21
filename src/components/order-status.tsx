export type OrderStatusType =
  | 'pending'
  | 'processing'
  | 'delivering'
  | 'delivered'
  | 'canceled'

export interface OrderStatusProps {
  status: OrderStatusType
}

const orderStatusMap: Record<OrderStatusType, string> = {
  pending: 'Pendente',
  processing: 'Processando',
  delivering: 'Entregando',
  delivered: 'Entregue',
  canceled: 'Cancelado',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-yellow-500"
        />
      )}
      {status === 'processing' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-blue-500"
        />
      )}
      {status === 'delivering' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-green-400"
        />
      )}
      {status === 'delivered' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-green-600"
        />
      )}
      {status === 'canceled' && (
        <span data-testid="badge" className="h-2 w-2 rounded-full bg-red-600" />
      )}
      <span className="text-muted-foreground font-medium">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
