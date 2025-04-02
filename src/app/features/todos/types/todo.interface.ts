import { checkListI } from './checklist.interface';
import { TaskI } from './task.interface';

export interface TodoI {
  id: string;
  userId: string;
  user: {
    id: string;
    username: string;
  };
  title: string;
  createdAt: string;
  updatedAt: string;
  checklists: checkListI[];
  tasks: TaskI[];
}
