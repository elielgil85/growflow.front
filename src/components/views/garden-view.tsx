'use client';
import { useTaskStore } from '@/store/task-store';
import Plant from '@/components/plant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Leaf } from 'lucide-react';
import { useI18n } from '@/context/i18n-context';
import { type Task } from '@/types';

export default function GardenView() {
  const tasks = useTaskStore((state) => state.tasks);
  const { t } = useI18n();

  // Helper para mapear os dados da API para o componente Plant
  const mapTaskToPlant = (task: Task) => ({
    id: task._id,
    name: task.name,
    completed: task.completed,
    growthStage: task.growthStage,
    type: task.plantType,
  });

  return (
    <div className="h-full flex flex-col">
        <Card className="mb-6 bg-transparent border-none shadow-none shrink-0">
            <CardHeader className="p-0">
                <CardTitle className="font-headline text-2xl">{t('garden.title')}</CardTitle>
                <CardDescription>{t('garden.description')}</CardDescription>
            </CardHeader>
        </Card>
        <ScrollArea className="flex-grow bg-primary/5 p-4 rounded-lg border border-dashed">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-y-8 gap-x-4">
                {tasks.length > 0 ? (
                    tasks.map(task => <Plant key={task._id} task={mapTaskToPlant(task)} />)
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center h-full min-h-[300px] text-center text-muted-foreground">
                        <Leaf className="h-12 w-12 mb-4" />
                        <p className="text-lg font-semibold">{t('garden.empty.title')}</p>
                        <p>{t('garden.empty.description')}</p>
                    </div>
                )}
            </div>
        </ScrollArea>
    </div>
  );
}
