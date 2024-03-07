import { api } from '@/lib/axios'

export interface DeliverOrderProps {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderProps) {
  await api.patch(`orders/${orderId}/deliver`) // patch porque só altera o status
}
