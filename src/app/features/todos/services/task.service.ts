import { inject, Injectable } from '@angular/core';
import { TodosService } from './todos.service';
import { TaskI } from '../types/task.interface';
import { TodoI } from '../types/todo.interface';
import { checkListI } from '../types/checklist.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private todosService = inject(TodosService);

  isTaskOnChecklist(task: TaskI): boolean {
    return task.checklistId ? true : false;
  }

  isTaskInTodo(todo: TodoI, task: TaskI): boolean {
    return task.todoId === todo.id;
  }

  toggleTaskCompletion(task: TaskI) {
    const taskId = task.id;
    this.todosService.updateLocalWithNewState((todos) => {
      return todos.map((todo) => {
        if (this.isTaskInTodo(todo, task)) return todo;
        if (!this.isTaskOnChecklist(task)) {
          return {
            ...todo,
            tasks: todo.tasks.map((task) =>
              task.id === taskId
                ? { ...task, isComplete: !task.isComplete }
                : task
            ),
          };
        } else {
          return {
            ...todo,
            checklists: todo.checklists.map((checklist) => ({
              ...checklist,
              tasks: checklist.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, isComplete: !task.isComplete }
                  : task
              ),
            })),
          };
        }
      });
    });
  }

  updateTaskTitle(taskId: string, newTitle: string) {
    this.todosService.updateLocalWithNewState((todos) =>
      todos.map((todo) => ({
        ...todo,
        tasks: todo.tasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        ),
        checklists: todo.checklists.map((checklist) => ({
          ...checklist,
          tasks: checklist.tasks.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
          ),
        })),
      }))
    );
  }

  // updateTaskDueDate(taskId: string, dueDate: string | null) {
  //   this.todosService.updateLocalWithNewState((todos) =>
  //     todos.map((todo) => ({
  //       ...todo,
  //       tasks: todo.tasks.map((task) =>
  //         task.id === taskId ? { ...task, dueDate } : task
  //       ),
  //       checklists: todo.checklists.map((checklist) => ({
  //         ...checklist,
  //         tasks: checklist.tasks.map((task) =>
  //           task.id === taskId ? { ...task, dueDate } : task
  //         ),
  //       })),
  //     }))
  //   );
  // }
}
