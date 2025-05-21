import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilters = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')?.trim()
  const customerName = searchParams.get('customerName')?.trim()
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm<OrderFilters>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? undefined,
      customerName: customerName?.trim() ?? undefined,
      status: status ?? 'all',
    },
  })

  const onSubmit = (data: OrderFilters) => {
    setSearchParams((prev) => {
      prev.set('orderId', data.orderId?.trim() ?? '')
      prev.set('customerName', data.customerName?.trim() ?? '')
      prev.set('status', data.status ?? '')

      prev.set('page', '1')
      return prev
    })
  }

  const handleRemoveFilters = () => {
    setSearchParams((prev) => {
      prev.delete('orderId')
      prev.delete('customerName')
      prev.delete('status')
      prev.set('page', '1')
      return prev
    })
    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="Id do pedido"
        className="h-8 w-auto"
        {...register('orderId')}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value, name, disabled } }) => (
          <Select
            onValueChange={onChange}
            value={value}
            name={name}
            disabled={disabled}
            defaultValue="all"
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button type="submit" variant="secondary">
        <Search className="h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={handleRemoveFilters}
        className="h-8 w-auto"
      >
        <X className="h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
