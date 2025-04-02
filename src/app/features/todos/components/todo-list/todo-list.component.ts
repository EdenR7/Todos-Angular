import { Component, Input } from '@angular/core';
import { TodoI } from '../../types/todo.interface';
import { CommonModule } from '@angular/common';
import { TodoComponent } from "../todo/todo.component";

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  @Input() todoList: TodoI[] | null = null;
}
