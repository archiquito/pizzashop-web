import { useQuery } from '@tanstack/react-query'
import { ptBR } from 'date-fns/locale'

import { getOrderDetails } from '@/api/get-order-details'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDistance } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'

import { OrderStatus } from '../../../components/order-status'
import { OrdersDetailsSkeleton } from './orders-details-skeleton'
export interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const { data: orderDetails, isLoading: isLoadingOrderDetails } = useQuery({
    queryKey: ['order-details', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    staleTime: 1000 * 60 * 5,
    enabled: !!orderId && open,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Deatlhes do Pedido</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        {isLoadingOrderDetails ? (
          <OrdersDetailsSkeleton />
        ) : (
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Status
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <OrderStatus status={orderDetails?.status ?? 'pending'} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Cliente
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {orderDetails?.customer.name}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {orderDetails?.customer.phone ?? 'N/A'}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    E-mail
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {orderDetails?.customer.email}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Realizado há
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {orderDetails?.createdAt
                      ? formatDistance(orderDetails.createdAt, ptBR)
                      : ''}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">
                    Produto
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Qtd.
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Preço
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Subtotal
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails?.orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.priceInCents / 100)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        (item.priceInCents * item.quantity) / 100,
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total do pedido</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency((orderDetails?.totalInCents ?? 0) / 100)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        )}
      </div>
    </DialogContent>
  )
}
