"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { type Task } from '@/types';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useI18n } from '@/context/i18n-context';

interface TasksCompletedChartProps {
  data: Task[];
}

export function TasksCompletedChart({ data }: TasksCompletedChartProps) {
  const { t } = useI18n();
  const chartData = Array.from({ length: 6 }, (_, i) => ({
    stage: t('stats.growthStages.stageLabel', { stage: i }),
    count: data.filter(task => task.growthStage === i).length
  }));

  const chartConfig = {
    count: {
      label: t('stats.totalPrompts.label'),
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
