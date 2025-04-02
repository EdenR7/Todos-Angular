import { TaskI } from './task.interface';

export interface checkListI {
  id: string;
  todoId: string;
  title: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  tasks: TaskI[];
}
