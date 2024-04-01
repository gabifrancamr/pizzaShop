import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

interface AuthenticateResponse {
  authLink: string
}

export async function signIn({ email }: SignInBody) {
  const response = await api.post('/authenticate', { email })

  // console.log(response.data)

  return response.data as AuthenticateResponse
}
