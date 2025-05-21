import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const _SignUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof _SignUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        phone: data.phone,
        email: data.email,
      })
      toast.success('Conta cadastrada com sucesso!', {
        position: 'top-right',
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar conta!', {
        position: 'top-right',
      })
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button
          variant={'secondary'}
          asChild
          className="absolute top-8 right-8"
        >
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja um parceiro e começe suas vendas
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                className="bg-accent"
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                className="bg-accent"
                id="managerName"
                type="text"
                {...register('managerName')}
              />
              <Label htmlFor="phone">Telefone</Label>
              <Input
                className="bg-accent"
                id="phone"
                type="tel"
                {...register('phone')}
              />
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                className="bg-accent"
                id="email"
                type="email"
                {...register('email')}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>
            <p className="text-muted-foreground px-6 text-center text-xs leading-relaxed">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="underline underline-offset-2">
                Termos de Serviço
              </a>{' '}
              e nossa{' '}
              <a href="#" className="underline underline-offset-2">
                Política de Privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
