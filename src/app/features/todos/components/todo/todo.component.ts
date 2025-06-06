import { Component, inject, Input, OnInit } from '@angular/core';
import { TodoI } from '../../types/todo.interface';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCreatedByPipe } from '../../../../shared/pipes/created-by.pipe';
import { AuthService } from '../../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ChecklistComponent } from '../checklist/checklist.component';
import { checkListI } from '../../types/checklist.interface';
import { TaskComponent } from '../task/task.component';
import { TaskI } from '../../types/task.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo',
  imports: [
    FormatDatePipe,
    FormatCreatedByPipe,
    CommonModule,
    ChecklistComponent,
    TaskComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoI | null = null;

  private authService = inject(AuthService);
  private todoService = inject(TodosService);
  user = this.authService.loggedInUser();

  trackByChecklistId(index: number, cl: checkListI) {
    return cl.id;
  }

  trackByTaskId(index: number, task: TaskI) {
    return task.id;
  }

  deleteTodo() {
    if (!this.todo?.id) return;
    this.todoService.deleteTodo(this.todo.id).subscribe({
      next: () => {
        // Handle successful deletion if needed
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      },
    });
  }
  

  ngOnInit(): void {
    console.log('TodoComponent initialized');
  }
}
