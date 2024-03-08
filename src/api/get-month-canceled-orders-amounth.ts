import { api } from '@/lib/axios'

export interface GetMonthCanceledOrdersAmounthResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<GetMonthCanceledOrdersAmounthResponse>(
    '/metrics/month-canceled-orders-amount',
  )

  return response.data
}
