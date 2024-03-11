import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import { Loading } from '@/components/loading'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

// const data = [
//   { date: '10/12', revenue: 1200 },
//   { date: '11/12', revenue: 880 },
//   { date: '12/12', revenue: 980 },
//   { date: '13/12', revenue: 480 },
//   { date: '14/12', revenue: 2300 },
//   { date: '15/12', revenue: 880 },
//   { date: '16/12', revenue: 640 },
// ]

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const {
    data: dailyRevenueInPeriodFn,
    isLoading: isDailyRevenueInPeriodLoading,
  } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriodFn?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriodFn])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {isDailyRevenueInPeriodLoading ? (
          <Loading size="16" />
        ) : (
          chartData && (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartData} style={{ fontSize: 12 }}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  dy={16}
                />

                <YAxis
                  stroke="#888"
                  axisLine={false}
                  tickLine={false}
                  width={80}
                  tickFormatter={(value: number) =>
                    value.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  }
                />

                <CartesianGrid vertical={false} className="stroke-muted" />
                <Line
                  type="linear"
                  strokeWidth={2}
                  dataKey="receipt"
                  stroke={colors.violet[500]}
                />
              </LineChart>
            </ResponsiveContainer>
          )
        )}
      </CardContent>
    </Card>
  )
}
