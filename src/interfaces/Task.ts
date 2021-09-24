export type TASK = {
  id: string;
  title: string;
  description: string;
  deadline: Date | string;
  created_at: Date | string;
  categories: number[];
  subtasks: SUBTASK[];
  isDone: boolean;
};
export type SUBTASK = { name: string };
