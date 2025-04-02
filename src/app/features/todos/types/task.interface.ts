export interface TaskI {
  id: string;
  checklistId: string | null;
  todoId: string;
  isComplete: boolean;
  title: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
