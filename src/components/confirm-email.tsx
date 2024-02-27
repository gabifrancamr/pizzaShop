import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const sendEmailForm = z.object({
  email: z.string().email(),
})

type SendEmailTypeInput = z.infer<typeof sendEmailForm>

export function ConfirmEmail() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SendEmailTypeInput>({
    resolver: zodResolver(sendEmailForm),
  })

  const navigate = useNavigate()

  async function handleSendEmail(email: SendEmailTypeInput) {
    try {
      console.log(email)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Email de autentificação enviado')
      navigate('new-password')
    } catch {
      toast.error('Email não cadastrado')
    }
  }

  return (
    <>
      <Helmet title="Mudar senha" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Esqueci senha
            </h1>
            <p className="text-sm text-muted-foreground">
              Faça login na sua conta
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSendEmail)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Enviar email de verificação
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
