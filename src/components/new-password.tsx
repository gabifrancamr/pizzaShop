import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const passwordInputSchema = z.object({
  newPassword: z.string().min(1),
  passwordConfirmation: z.string().min(1),
})

type InputPassword = z.infer<typeof passwordInputSchema>

export function NewPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<InputPassword>({
    resolver: zodResolver(passwordInputSchema),
  })

  const navigate = useNavigate()

  async function handleChangePassword(password: InputPassword) {
    try {
      if (newPassword === passwordConfirmation) {
        console.log(password)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        toast.success('Senha alterada')
        navigate('/sign-in')
      } else {
        toast.error('Não foi possível alterar senha')
      }
    } catch {
      toast.error('Não foi possível alterar senha')
    }
  }

  return (
    <div className="p-8">
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="flex flex-col justify-center gap-6"
      >
        <div className="space-y-4">
          <Label htmlFor="password">New Password</Label>
          <PasswordInput
            {...register('newPassword')}
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <PasswordInput
            {...register('passwordConfirmation')}
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <Button disabled={isSubmitting} type="submit">
          Mudar senha
        </Button>
      </form>
    </div>
  )
}
