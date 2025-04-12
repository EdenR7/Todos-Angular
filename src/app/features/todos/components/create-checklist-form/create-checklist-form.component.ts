import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { createDebouncer } from '../../../../shared/utils-functions/debounce';
import { DatePickerComponent } from '../../../../shared/ui/date-picker/date-picker.component';
import { CreateTaskFormComponent } from '../create-task-form/create-task-form.component';
import {
  checklistFormAtt,
  clTaskFormAtt,
  stdTaskFormAtt,
} from '../create-todo-form/create-todo-form.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-checklist-form',
  imports: [
    DatePickerComponent,
    CreateTaskFormComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './create-checklist-form.component.html',
  styleUrl: './create-checklist-form.component.scss',
})
export class CreateChecklistFormComponent implements OnInit {
  @Input({ required: true }) checklist!: checklistFormAtt;

  @Output() checklistFormChange = new EventEmitter<{
    title: string;
    dueDate: string | null;
    tasks: clTaskFormAtt[];
    checklistId: string;
  }>();

  private destroy$ = new Subject<void>();
  private titleDebouncer = createDebouncer<string>(500); // 500ms debounce

  localTitle: string = '';
  localDueDate: string | null = null;
  localChecklistTasks: clTaskFormAtt[] = [];

  // Component basic functions
  ngOnInit(): void {
    console.log('CL form', this.checklist);

    this.localTitle = this.checklist.title;
    this.localDueDate = this.checklist.dueDate || null;
    this.localChecklistTasks = [...this.checklist.tasks];

    this.titleDebouncer.stream
      .pipe(takeUntil(this.destroy$))
      .subscribe((debouncedTitle) => {
        this.localTitle = debouncedTitle;
        this.emitChanges();
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  trackByTempId(index: number, task: clTaskFormAtt) {
    return task.tempId;
  }
  // A closure function to generate incremental IDs
  private generateTempId = (() => {
    let counter = 0;
    return () => ++counter;
  })();

  // Checklist actions
  onTitleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.titleDebouncer.next(input.value);
    }
  }
  onDueDateInput(newDate: string | null) {
    this.localDueDate = newDate;
    this.emitChanges(); // Due date usually doesn't need debounce
  }
  addClTaskForm() {
    const newClTask: clTaskFormAtt = {
      title: '',
      dueDate: null,
      checklistId: this.checklist.tempId.toString(),
      tempId: this.generateTempId(),
    };
    this.localChecklistTasks.push(newClTask);
    this.emitChanges(); // Emit changes to update parent component
  }
  removeClTaskForm(taskTempId: number) {
    this.localChecklistTasks = this.localChecklistTasks.filter(
      (task) => task.tempId !== taskTempId
    );
    this.emitChanges(); // Emit changes to update parent component
  }
  onTaskFormChange(
    tempId: number,
    changes: { title: string; dueDate: string | null }
  ) {
    this.localChecklistTasks = this.localChecklistTasks.map((task) =>
      task.tempId === tempId ? { ...task, ...changes } : task
    );
    this.emitChanges();
  }
  emitChanges() {
    this.checklistFormChange.emit({
      title: this.localTitle,
      dueDate: this.localDueDate || null,
      tasks: this.localChecklistTasks,
      checklistId: this.checklist.tempId.toString(),
    });
  }
}
