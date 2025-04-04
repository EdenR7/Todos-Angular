import { Component, inject, Input, OnInit } from '@angular/core';
import { TodoI } from '../../types/todo.interface';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { FormatCreatedByPipe } from '../../../../shared/pipes/created-by.pipe';
import { AuthService } from '../../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ChecklistComponent } from '../checklist/checklist.component';
import { checkListI } from '../../types/checklist.interface';

@Component({
  selector: 'app-todo',
  imports: [
    FormatDatePipe,
    FormatCreatedByPipe,
    CommonModule,
    ChecklistComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoI | null = null;

  private authService = inject(AuthService);
  user = this.authService.loggedInUser();

  trackByChecklistId(index: number, cl: checkListI) {
    return cl.id;
  }

  ngOnInit(): void {
    console.log('TodoComponent initialized');
  }
}
