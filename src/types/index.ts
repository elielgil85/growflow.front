// src/types/index.ts
// Note: 'Task' is conceptually now a 'Prompt' in the UI,
// but the backend still refers to it as a task.
export type Task = {
  _id: string; // MongoDB uses _id
  userId: string;
  name: string;
  description: string;
  completed: boolean;
  growthStage: number; // 0 to 5
  plantType: string; // e.g., 'rose', 'tulip'
  date: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  date: string;
}