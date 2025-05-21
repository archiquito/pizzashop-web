import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagerRestaurant,
  type GetManagerRestaurantResponse,
} from '@/api/get-manager-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string().nullable(),
})

type StoreProfile = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: restaurant } = useQuery({
    queryKey: ['restaurant'],
    queryFn: getManagerRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreProfile>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: restaurant?.name ?? '',
      description: restaurant?.description ?? '',
    },
  })

  function updateManagerRestaurantCache({
    name,
    description,
  }: GetManagerRestaurantResponse) {
    const cached = queryClient.getQueryData<GetManagerRestaurantResponse>([
      'restaurant',
    ])
    if (cached) {
      queryClient.setQueryData<GetManagerRestaurantResponse>(['restaurant'], {
        ...cached,
        name,
        description,
      })
    }
    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ name, description }) => {
      const { cached } = updateManagerRestaurantCache({
        ...restaurant!,
        name,
        description,
      })
      return { previousCached: cached }
    },
    onError: (_, __, context) => {
      if (context?.previousCached) {
        updateManagerRestaurantCache(context.previousCached)
      }
    },
  })

  async function handleUpdateStoreProfile(data: StoreProfile) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })
      toast.success('Perfil atualizado com sucesso!', {
        position: 'top-right',
      })
    } catch {
      toast.error('Erro ao atualizar perfil!', {
        position: 'top-right',
      })
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateStoreProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-1 text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-1 text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
