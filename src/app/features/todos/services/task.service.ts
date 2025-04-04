import { inject, Injectable } from '@angular/core';
import { TodosService } from './todos.service';
import { TaskI } from '../types/task.interface';
import { TodoI } from '../types/todo.interface';
import { checkListI } from '../types/checklist.interface';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private todosService = inject(TodosService);
  tasksApiUrl = environment.apiUrl + 'tasks/';

  // This update function can get more than one field
  apiUpdateTask(
    taskId: string,
    updatedFields: Partial<TaskI>
  ): Promise<TaskI | undefined> {
    const updateTaskUrl = this.tasksApiUrl + `${taskId}/`;
    return this.http.patch<TaskI>(updateTaskUrl, updatedFields).toPromise();
  }

  isTaskOnChecklist(task: TaskI): boolean {
    return task.checklistId ? true : false;
  }

  isTaskInTodo(todo: TodoI, task: TaskI): boolean {
    return task.todoId === todo.id;
  }

  async toggleTaskCompletion(task: TaskI, newValue: boolean) {
    try {
      const taskId = task.id;
      await this.apiUpdateTask(taskId, { isComplete: newValue });
      this.todosService.updateLocalWithNewState((todos) => {
        return todos.map((todo) => {
          if (!this.isTaskInTodo(todo, task)) return todo;
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
    } catch (error) {
      console.error(error);
    }
  }

  async updateTaskTitle(task: TaskI, newTitle: string) {
    try {
      const taskId = task.id;
      await this.apiUpdateTask(taskId, { title: newTitle });
      this.todosService.updateLocalWithNewState((todos) => {
        return todos.map((todo) => {
          if (!this.isTaskInTodo(todo, task)) return todo;
          if (!this.isTaskOnChecklist(task)) {
            return {
              ...todo,
              tasks: todo.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
              ),
            };
          } else {
            return {
              ...todo,
              checklists: todo.checklists.map((checklist) => ({
                ...checklist,
                tasks: checklist.tasks.map((task) =>
                  task.id === taskId ? { ...task, title: newTitle } : task
                ),
              })),
            };
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
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
