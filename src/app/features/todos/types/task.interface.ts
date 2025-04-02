export interface TaskI {
  id: string;
  checklistId: string | null;
  todoId: string;
  isComplete: boolean;
  title: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
