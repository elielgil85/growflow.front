"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { type Task } from '@/types';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface TasksCompletedChartProps {
  data: Task[];
}

export function TasksCompletedChart({ data }: TasksCompletedChartProps) {
  const chartData = Array.from({ length: 6 }, (_, i) => ({
    stage: `Stage ${i}`,
    count: data.filter(task => task.growthStage === i).length
  }));

  const chartConfig = {
    count: {
      label: "Plants",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="stage"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
            />
            <YAxis allowDecimals={false} />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
        </BarChart>
    </ChartContainer>
  )
}
