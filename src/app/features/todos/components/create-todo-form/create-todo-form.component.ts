import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePickerComponent } from '../../../../shared/ui/date-picker/date-picker.component';
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
  ],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss',
})
export class CreateTodoFormComponent {
  private fb = inject(FormBuilder);
  date: string | null = null;

  newStandAloneTasks: taskFormAtt[] = [];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get title() {
    return this.form.controls.title;
  }

  get password() {
    return this.form.controls.password;
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

  async onSubmit() {
    // const { email, password } = this.form.value;
    // if (this.form.invalid || !password || !email) return;
  }
}
