import { TaskI } from './task.interface';

export interface checkListI {
  id: string;
  todoId: string;
  title: string;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  tasks: TaskI[];
}
