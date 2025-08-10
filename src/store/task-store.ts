// src/store/task-store.ts
import { create } from 'zustand';
import { type Task } from '@/types';
import { toast } from '@/hooks/use-toast';

const API_URL = '/api/tasks'; // URL Relativa para o proxy

type TaskState = {
  tasks: Task[];
  isLoading: boolean;
  setTasks: (tasks: Task[]) => void; // Adicionando setTasks de volta para uso interno pelo AuthContext
  fetchTasks: (token: string) => Promise<void>;
  addTask: (taskData: { name: string; description: string; plantType: string }, token: string) => Promise<void>;
  updateTask: (taskId: string, taskData: { name: string; description?: string }, token: string) => Promise<void>;
  toggleTaskCompleted: (taskId: string, token: string) => Promise<void>;
  deleteTask: (taskId: string, token: string) => Promise<void>;
  clearTasks: () => void;
};

// Helper para incluir o token de autenticação
const getAuthHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`, // Usando o cabeçalho 'Authorization'
});

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  
  // Limpa as tarefas ao fazer logout
  clearTasks: () => set({ tasks: [] }),

  // Define as tarefas (usado pelo AuthContext após o fetch inicial)
  setTasks: (tasks) => set({ tasks }),

  // Busca todas as tarefas do usuário autenticado
  fetchTasks: async (token) => {
    set({ isLoading: true });
    try {
      const res = await fetch(API_URL, {
        headers: getAuthHeaders(token),
      });
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const tasks = await res.json();
      set({ tasks, isLoading: false });
    } catch (error) {
      console.error(error);
      toast({ title: 'Erro', description: 'Não foi possível carregar as tarefas.', variant: 'destructive' });
      set({ isLoading: false });
    }
  },

  // Adiciona uma nova tarefa
  addTask: async (taskData, token) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error('Failed to create task');
      const newTask = await res.json();
      set((state) => ({ tasks: [newTask, ...state.tasks] })); // Adiciona no início da lista
      toast({
        title: 'Semente plantada!',
        description: `Sua nova tarefa "${newTask.name}" foi adicionada ao jardim.`,
      });
    } catch (error) {
      console.error(error);
      toast({ title: 'Erro', description: 'Não foi possível adicionar a tarefa.', variant: 'destructive' });
    }
  },

  // Atualiza os dados de uma tarefa (nome, descrição)
  updateTask: async(taskId, taskData, token) => {
    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
          method: 'PUT',
          headers: getAuthHeaders(token),
          body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error('Failed to update task data');

      const updatedTask = await res.json();
      set((state) => ({
          tasks: state.tasks.map((t) => (t._id === taskId ? updatedTask : t)),
      }));
      toast({
          title: 'Tarefa atualizada!',
          description: `Sua tarefa "${updatedTask.name}" foi salva com sucesso.`,
      });
    } catch (error) {
        console.error(error);
        toast({ title: 'Erro', description: 'Não foi possível salvar as alterações.', variant: 'destructive' });
    }
  },

  // Alterna o estado 'completed' de uma tarefa
  toggleTaskCompleted: async (taskId, token) => {
    const originalTasks = get().tasks;
    const task = originalTasks.find((t) => t._id === taskId);
    if (!task) return;

    const updatedTaskData = { ...task, completed: !task.completed };

    // Atualiza o estado local imediatamente para uma UI responsiva
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === taskId ? updatedTaskData : t)),
    }));

    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ completed: updatedTaskData.completed }),
      });

      if (!res.ok) {
        // Se a API falhar, reverte o estado local
        set({ tasks: originalTasks });
        throw new Error('Failed to update task');
      }

      // Atualiza o estado com os dados retornados pela API (que podem incluir o growthStage atualizado)
      const finalUpdatedTask = await res.json();
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === taskId ? finalUpdatedTask : t)),
      }));

      // Mostra a notificação de crescimento se a tarefa foi completada
      if (finalUpdatedTask.completed && finalUpdatedTask.growthStage > task.growthStage) {
        toast({
          title: "Está a crescer!",
          description: `"${finalUpdatedTask.name}" cresceu para o estágio ${finalUpdatedTask.growthStage}.`
        })
      }

    } catch (error) {
      console.error(error);
      toast({ title: 'Erro', description: 'Não foi possível atualizar a tarefa.', variant: 'destructive' });
    }
  },

  // Deleta uma tarefa
  deleteTask: async (taskId, token) => {
    const originalTasks = get().tasks;
    const taskToDelete = originalTasks.find((t) => t._id === taskId);
    if(!taskToDelete) return;

    // Remove do estado local imediatamente
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== taskId),
    }));

    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
      });

      if (!res.ok) {
        // Se a API falhar, reverte
        set({ tasks: originalTasks });
        throw new Error('Failed to delete task');
      }

      toast({
        title: "Planta removida",
        description: `"${taskToDelete.name}" foi removida do seu jardim.`,
        variant: 'destructive'
      });

    } catch (error) {
      console.error(error);
      toast({ title: 'Erro', description: 'Não foi possível remover a tarefa.', variant: 'destructive' });
    }
  },
}));
