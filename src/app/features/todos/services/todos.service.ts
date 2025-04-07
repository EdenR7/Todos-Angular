import { Injectable, signal } from '@angular/core';
// import { LocalStorageService } from '../../shared/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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
    return this.http.get<TodoI[]>(this.todosApiUrl).pipe(
      tap((array: TodoI[]) => {
        this._todos.set([...array]);
        return array;
      })
    );
  }

  get() {
    return this.todos;
  }

  deleteTodo(todoId: string): Observable<TodoI> {
    const deleteApiUrl = this.todosApiUrl + todoId;
    return this.http.delete<TodoI>(deleteApiUrl).pipe(
      tap(() => {
        this._todos.update((todos: TodoI[]) => {
          return todos.filter((todo) => {
            return todo.id !== todoId;
          });
        });
        console.log(this._todos());
      })
    );
  }

  updateLocalWithNewState(mutator: (todos: TodoI[]) => TodoI[]): void {
    this._todos.update(mutator);
    // console.log(this._todos());
  }
}
