import { checkListI } from './checklist.interface';
import { TaskI } from './task.interface';

export interface TodoI {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  checklists: checkListI[];
  tasks: TaskI[];
}
