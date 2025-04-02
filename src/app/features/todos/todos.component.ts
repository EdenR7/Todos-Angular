import { Component, inject, OnInit } from '@angular/core';
import { useAuthRedirect } from '../../shared/sharedFunctions/useAuthRedirect';
import { TodosService } from './todos.service';
import { Observable } from 'rxjs';
import { TodoI } from './types/todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todos$: Observable<TodoI[]> | null = null;
  constructor(private todosService: TodosService) {
    useAuthRedirect(); // cant run in the onInit, the inject function (in the useAuthRedirect) must run in injection context
    this.todos$ = this.todosService.getTodos();
  }
  ngOnInit(): void {}
}
