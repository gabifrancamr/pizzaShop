import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { PasswordInput } from '@/components/password-input'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [password, setPassword] = useState('')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const navigate = useNavigate()

  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // toast.success('Enviamos um link de autenticação para seu e-mail', {
      //   action: {
      //     label: 'Reenviar',
      //     onClick: () => handleSignIn(data),
      //   },
      // })
      navigate('/')
    } catch {
      toast.error('Usuário não cadastrado')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="absolute right-8 top-8 flex gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link to="/sign-up">Novo estabelecimento</Link>
          </Button>
        </div>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painer
            </h1>
            <p className="text-sm text-muted-foreground">
              Faça login na sua conta
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <PasswordInput
                {...register('password')}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="ghost" asChild>
            <Link to="/change-password">Esqueci a senha</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
