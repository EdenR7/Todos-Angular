import { Injectable } from '@angular/core';
// import { LocalStorageService } from '../../shared/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoI } from './types/todo.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(
    // private localStorageS: LocalStorageService,
    private http: HttpClient
  ) {}

  todosApiUrl = environment.apiUrl + 'todos/';

  getTodos(): Observable<TodoI[]> {
    return this.http.get<TodoI[]>(this.todosApiUrl);
  }
}
