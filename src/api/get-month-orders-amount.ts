import { api } from '@/lib/axios'

export interface GetMonthOrdersAmounthResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthOrdersAmount() {
  const response = await api.get<GetMonthOrdersAmounthResponse>(
    '/metrics/month-orders-amount',
  )

  return response.data
}
