import { Injectable, signal } from '@angular/core';
// import { LocalStorageService } from '../../shared/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoI } from '../types/todo.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(
    // private localStorageS: LocalStorageService,
    private http: HttpClient
  ) {}
  private _todos = signal<TodoI[]>([]);
  todos = this._todos.asReadonly();

  todosApiUrl = environment.apiUrl + 'todos/';

  getTodos(): Observable<TodoI[]> {
    return this.http.get<TodoI[]>(this.todosApiUrl);
  }

  // updateTodo(todoId: number, changes: Partial<TodoI>) {
  //   this._todos.mutate(todos => {
  //     const todo = todos.find(t => t.id === todoId);
  //     if (todo) Object.assign(todo, changes);
  //   });

  //   return this.http.patch(`${this.apiUrl}${todoId}/`, changes);
  // }

  // 👇 Used for pure update logic
  updateLocalWithNewState(mutator: (todos: TodoI[]) => TodoI[]) {
    this._todos.update(mutator);
  }
}
