import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableHead, TableHeader } from '@/components/ui/table'
import { TableCell, TableFooter, TableRow } from '@/components/ui/table'
import { Table } from '@/components/ui/table'

export function OrdersDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-24" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-24" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-24" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">E-mail</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-24" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              Realizado há
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-24" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-muted-foreground">Produto</TableHead>
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
          <TableRow>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="ml-auto h-4 w-5" />
            </TableCell>
            <TableCell className="ml-auto text-right">
              <Skeleton className="ml-auto h-4 w-8" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="ml-auto h-4 w-8" />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total do pedido</TableCell>
            <TableCell className="flex justify-end text-right">
              <Skeleton className="h-4 w-14" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
