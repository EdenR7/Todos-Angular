import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { useAuthRedirect } from '../../shared/utils-functions/useAuthRedirect';
import { TodosService } from './services/todos.service';
import { Subscription } from 'rxjs';
import { TodoI } from './types/todo.interface';
import { CommonModule } from '@angular/common';
import { CreateTodoFormComponent } from './components/create-todo-form/create-todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, CreateTodoFormComponent, TodoListComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit, OnDestroy {
  todos$: Subscription | null = null;
  todos: Signal<TodoI[]> | null = null;

  constructor(private todosService: TodosService) {
    useAuthRedirect(); // cant run in the onInit, the inject function (in the useAuthRedirect) must run in injection context
    this.todos = this.todosService.get();
  }
  ngOnInit(): void {
    console.log('Todos comp initialized');

    this.todos$ = this.todosService.getTodos().subscribe(); // populates the signal
  }
  ngOnDestroy(): void {
    this.todos$?.unsubscribe();
  }

  hasTodos(): boolean {
    return this.todos !== null && this.todos().length > 0;
  }

  getTodosValue(): TodoI[] | null {
    if (!this.todos) {
      return null;
    }
    return this.todos();
  }
}
