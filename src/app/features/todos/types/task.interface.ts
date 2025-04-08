export interface TaskI {
  id: string;
  checklistId: string | null;
  todoId: string;
  isComplete: boolean;
  title: string;
  dueDate: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}
