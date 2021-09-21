export type TASK = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  created_at: Date;
  categories: number[];
  subtasks: SUBTASK[];
  isDone: boolean;
};
export type SUBTASK = { name: string };
