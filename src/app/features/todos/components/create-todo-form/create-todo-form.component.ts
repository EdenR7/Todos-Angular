import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateTaskFormComponent } from '../create-task-form/create-task-form.component';
import { TaskI } from '../../types/task.interface';

export type taskFormAtt = Pick<TaskI, 'dueDate' | 'title'> & { tempId: number };
@Component({
  selector: 'app-create-todo-form',
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CreateTaskFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss',
})
export class CreateTodoFormComponent {
  private fb = inject(FormBuilder);
  date: string | null = null;

  newStandAloneTasks: taskFormAtt[] = [];

  form = this.fb.group({
    title: ['', [Validators.required]],
  });

  get title() {
    return this.form.controls.title;
  }

  // A closure function to generate incremental IDs
  private generateTempId = (() => {
    let counter = 0;
    return () => ++counter;
  })();

  addStdTaskForm() {
    const newStdTask: taskFormAtt = {
      title: '',
      dueDate: null,
      tempId: this.generateTempId(),
    };
    this.newStandAloneTasks.push(newStdTask);
    console.log(newStdTask);
  }

  removeStdTaskForm(taskTempId: number) {
    this.newStandAloneTasks = this.newStandAloneTasks.filter(
      (task) => task.tempId !== taskTempId
    );
  }

  trackByTempId(index: number, task: taskFormAtt) {
    return task.tempId;
  }

  onTaskFormChange(
    tempId: number,
    changes: { title: string; dueDate: string | null }
  ) {
    this.newStandAloneTasks = this.newStandAloneTasks.map((task) =>
      task.tempId === tempId ? { ...task, ...changes } : task
    );
    console.log(this.newStandAloneTasks);
  }

  async onSubmit() {}
}
