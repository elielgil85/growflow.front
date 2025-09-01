"use client"
import { Pie, PieChart, Tooltip, Cell } from "recharts"
import { type Task } from '@/types';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { useMemo } from "react";
import { useI18n } from '@/context/i18n-context';

interface PlantTypesChartProps {
  data: Task[];
}

export function PlantTypesChart({ data }: PlantTypesChartProps) {
  const { t } = useI18n();
  const chartData = useMemo(() => {
    const typeCounts = data.reduce((acc, task) => {
      acc[task.plantType] = (acc[task.plantType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts).map(([name, value]) => ({ name, value, fill: 'var(--color-value)' }));
  }, [data]);
  
  const chartConfig = useMemo(() => {
    const config: any = {};
    chartData.forEach((item, index) => {
        config[item.name] = {
            label: t('stats.plantVariety.categoryLabel', { category: item.name }),
            color: `hsl(var(--chart-${(index % 5) + 1}))`
        }
    });
    return config;
  }, [chartData]);


  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full aspect-square">
        <PieChart accessibilityLayer>
            <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} strokeWidth={5}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartConfig[entry.name]?.color} />
                ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
    </ChartContainer>
  )
}
