'use client';
import { useState } from 'react';
import { useTaskStore } from '@/store/task-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import EditTaskSheet from '@/components/edit-task-sheet';
import { type Task } from '@/types';
import { useAuth } from '@/context/auth-context';
import { useI18n } from '@/context/i18n-context';

const plantTypes = ["rose", "tulip", "oak", "sunflower", "cactus", "bamboo", "bonsai", "fern", "lily", "maple"];

export default function TaskListView() {
  const { tasks, addTask, toggleTaskCompleted, deleteTask } = useTaskStore();
  const { token } = useAuth();
  const { t, language } = useI18n();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const taskSchema = z.object({
    name: z.string().min(3, t('tasks.form.validation.nameRequired')),
    description: z.string().optional(),
  });
  
  type TaskFormInput = z.infer<typeof taskSchema>;
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    key: language, 
  });

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsSheetOpen(true);
  };

  const onSubmit: SubmitHandler<TaskFormInput> = async (data) => {
    if (!token) return;
    const newTaskData = {
      name: data.name,
      description: data.description || '',
      plantType: plantTypes[Math.floor(Math.random() * plantTypes.length)],
    };
    await addTask(newTaskData, token);
    reset();
  };
  
  const handleDelete = (taskId: string) => {
    if (!token) return;
    deleteTask(taskId, token);
  };

  const handleToggle = (taskId: string) => {
    if (!token) return;
    toggleTaskCompleted(taskId, token);
  }

  return (
    <>
      <div className="h-full flex flex-col gap-6">
          <Card className="shrink-0">
              <CardHeader>
                  <CardTitle className="font-headline">{t('tasks.addTask.title')}</CardTitle>
                  <CardDescription>{t('tasks.addTask.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-2">
                           <Input {...register("name")} placeholder={t('tasks.form.placeholder')} disabled={isSubmitting} />
                           {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                          <Textarea {...register("description")} placeholder={t('tasks.form.descriptionPlaceholder')} disabled={isSubmitting} />
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                          <PlusCircle className="mr-2 h-5 w-5" /> 
                          {isSubmitting ? t('tasks.form.submittingButton') : t('tasks.form.submitButton')}
                      </Button>
                  </form>
              </CardContent>
          </Card>

          <Card className="flex-grow flex flex-col">
              <CardHeader>
                  <CardTitle className="font-headline">{t('tasks.list.title')}</CardTitle>
                  <CardDescription>{tasks.length > 0 ? t('tasks.list.description') : t('tasks.list.empty')}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden">
                  <ScrollArea className="h-full pr-4">
                      <Accordion type="multiple" className="space-y-3">
                          {tasks.map(task => (
                              <AccordionItem key={task._id} value={task._id} className={cn("rounded-lg transition-all border", task.completed ? "bg-secondary/30 border-dashed" : "bg-card shadow-sm")}>
                                  <div className="flex items-center gap-4 p-2 pr-4">
                                      <Checkbox
                                          id={`task-${task._id}`}
                                          checked={task.completed}
                                          onCheckedChange={() => handleToggle(task._id)}
                                          className="h-6 w-6 ml-2"
                                          aria-label={`Mark task ${task.name} as complete`}
                                      />
                                      <AccordionTrigger className="flex-1 py-2 text-left">
                                        <span className={cn("font-semibold font-body text-lg", task.completed && "line-through text-muted-foreground")}>
                                            {task.name}
                                        </span>
                                      </AccordionTrigger>
                                      <Badge variant="outline" className="capitalize font-mono text-sm self-center">{t(`plantTypes.${task.plantType}`)}</Badge>
                                      
                                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full" onClick={() => handleEditClick(task)}>
                                        <Pencil className="h-5 w-5" />
                                        <span className="sr-only">Edit task</span>
                                      </Button>
                                      
                                      <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive rounded-full">
                                                  <Trash2 className="h-5 w-5" />
                                                  <span className="sr-only">Delete task</span>
                                              </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                              <AlertDialogHeader>
                                                  <AlertDialogTitle>{t('tasks.deleteDialog.title')}</AlertDialogTitle>
                                                  <AlertDialogDescription>
                                                      {t('tasks.deleteDialog.description', { taskName: task.name })}
                                                  </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <AlertDialogFooter>
                                                  <AlertDialogCancel>{t('tasks.deleteDialog.cancel')}</AlertDialogCancel>
                                                  <AlertDialogAction onClick={() => handleDelete(task._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">{t('tasks.deleteDialog.delete')}</AlertDialogAction>
                                              </AlertDialogFooter>
                                          </AlertDialogContent>
                                      </AlertDialog>
                                  </div>
                                  <AccordionContent className="pb-4 px-6 text-muted-foreground">
                                    {task.description || <span className="italic">{t('tasks.list.noDescription')}</span>}
                                  </AccordionContent>
                              </AccordionItem>
                          ))}
                      </Accordion>
                  </ScrollArea>
              </CardContent>
          </Card>
      </div>
      <EditTaskSheet task={editingTask} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  );
}
