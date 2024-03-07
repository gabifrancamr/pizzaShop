import { api } from '@/lib/axios'

export interface DispatchOrderProps {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrderProps) {
  await api.patch(`orders/${orderId}/dispatch`) // patch porque só altera o status
}
