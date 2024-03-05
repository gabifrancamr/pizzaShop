import { api } from '@/lib/axios'

export async function signOut() {
  // remover dados do localStorage
  await api.post('/sign-out')
}
