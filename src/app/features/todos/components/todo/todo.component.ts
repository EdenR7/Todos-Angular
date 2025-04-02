import { Component, inject, Input } from '@angular/core';
import { TodoI } from '../../types/todo.interface';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCreatedByPipe } from '../../../../shared/pipes/created-by.pipe';
import { AuthService } from '../../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { TaskComponent } from "../task/task.component";

@Component({
  selector: 'app-todo',
  imports: [FormatDatePipe, FormatCreatedByPipe, CommonModule, TaskComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input() todo: TodoI | null = null;

  private authService = inject(AuthService);
  user = this.authService.loggedInUser();
}
