'use client';
import { useTaskStore } from '@/store/task-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TasksCompletedChart } from '@/components/charts/tasks-completed-chart';
import { PlantTypesChart } from '@/components/charts/plant-types-chart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useI18n } from '@/context/i18n-context';

export default function StatsView() {
  const tasks = useTaskStore((state) => state.tasks);
  const { t } = useI18n();

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const fullyGrownPlants = tasks.filter(t => t.growthStage >= 5).length;

  return (
    <ScrollArea className="h-full">
        <div className="space-y-6 pr-4">
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">{t('stats.completionRate.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold font-body">{completionRate}%</p>
                        <p className="text-muted-foreground">{t('stats.completionRate.description', { completed: completedTasks, total: totalTasks })}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">{t('stats.maturePlants.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold font-body">{fullyGrownPlants}</p>
                        <p className="text-muted-foreground">{t('stats.maturePlants.description')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">{t('stats.totalPlants.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold font-body">{totalTasks}</p>
                        <p className="text-muted-foreground">{t('stats.totalPlants.description')}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{t('stats.growthStages.title')}</CardTitle>
                        <CardDescription>{t('stats.growthStages.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TasksCompletedChart data={tasks} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{t('stats.plantVariety.title')}</CardTitle>
                        <CardDescription>{t('stats.plantVariety.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PlantTypesChart data={tasks} />
                    </CardContent>
                </Card>
            </div>
        </div>
    </ScrollArea>
  );
}
