import { Component, OnInit, Signal } from '@angular/core';
import { useAuthRedirect } from '../../shared/sharedFunctions/useAuthRedirect';
import { TodosService } from './services/todos.service';
import { Observable } from 'rxjs';
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
export class TodosComponent implements OnInit {
  todos$: Observable<TodoI[]> | null = null;
  todos: Signal<TodoI[]> | null = null;

  constructor(private todosService: TodosService) {
    useAuthRedirect(); // cant run in the onInit, the inject function (in the useAuthRedirect) must run in injection context
    this.todos$ = this.todosService.getTodos();
    this.todos = this.todosService.todos;
  }
  ngOnInit(): void {
    this.todosService.getTodos().subscribe(); // populates the signal
  }
}
