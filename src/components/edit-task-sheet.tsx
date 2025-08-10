'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTaskStore } from '@/store/task-store';
import { type Task } from '@/types';
import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useI18n } from '@/context/i18n-context';

interface EditTaskSheetProps {
  task: Task | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const taskSchema = z.object({
  name: z.string().min(3, 'O título da tarefa deve ter pelo menos 3 caracteres.'),
  description: z.string().optional(),
});

type TaskFormInput = z.infer<typeof taskSchema>;

export default function EditTaskSheet({ task, isOpen, onOpenChange }: EditTaskSheetProps) {
  const { updateTask } = useTaskStore();
  const { token } = useAuth();
  const { t, language } = useI18n();

  // Adaptação para usar as traduções no schema
  const dynamicTaskSchema = z.object({
    name: z.string().min(3, t('tasks.form.validation.nameRequired')),
    description: z.string().optional(),
  });
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TaskFormInput>({
    resolver: zodResolver(dynamicTaskSchema),
    key: language, // Força a reinicialização do resolver quando o idioma muda
  });

  useEffect(() => {
    if (task) {
      reset({
        name: task.name,
        description: task.description,
      });
    }
  }, [task, reset]);

  const onSubmit: SubmitHandler<TaskFormInput> = async (data) => {
    if (!task || !token) return;

    await updateTask(task._id, data, token);
    onOpenChange(false); // Fecha o painel após submeter
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('tasks.editTask.title')}</SheetTitle>
          <SheetDescription>{t('tasks.editTask.description')}</SheetDescription>
        </SheetHeader>
        {task && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('tasks.editTask.form.titleLabel')}</Label>
              <Input id="name" {...register('name')} disabled={isSubmitting} />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('tasks.editTask.form.descriptionLabel')}</Label>
              <Textarea id="description" {...register('description')} disabled={isSubmitting} className="min-h-[150px]" />
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <Button type="button" variant="outline">{t('tasks.editTask.form.cancelButton')}</Button>
                </SheetClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('tasks.editTask.form.submittingButton') : t('tasks.editTask.form.submitButton')}
              </Button>
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
