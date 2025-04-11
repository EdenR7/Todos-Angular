import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateTaskFormComponent } from '../create-task-form/create-task-form.component';
import { TaskI } from '../../types/task.interface';
import { CreateChecklistFormComponent } from "../create-checklist-form/create-checklist-form.component";

export type taskFormAtt = Pick<TaskI, 'dueDate' | 'title'> & { tempId: number };
export type checklistFormAtt = taskFormAtt & { tasks: taskFormAtt[] };

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
    CreateChecklistFormComponent
],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss',
})
export class CreateTodoFormComponent {
  private fb = inject(FormBuilder);
  date: string | null = null;

  newStandAloneTasks: taskFormAtt[] = [];
  newChecklists: checklistFormAtt[] = [];

  form = this.fb.group({
    title: ['', [Validators.required]],
  });

  get title() {
    return this.form.controls.title;
  }

  // Tasks methods
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
  onTaskFormChange(
    tempId: number,
    changes: { title: string; dueDate: string | null }
  ) {
    this.newStandAloneTasks = this.newStandAloneTasks.map((task) =>
      task.tempId === tempId ? { ...task, ...changes } : task
    );
    console.log(this.newStandAloneTasks);
  }

  // Checklist methods
  addChecklistForm() {
    const newChecklist: checklistFormAtt = {
      title: '',
      dueDate: null,
      tasks: [],
      tempId: this.generateTempId(),
    };
    this.newChecklists.push(newChecklist);
    console.log(newChecklist);
  }
  removeChecklistForm(clTempId: number) {
    this.newChecklists = this.newChecklists.filter(
      (cl) => cl.tempId !== clTempId
    );
  }
  onChecklistFormChange(
    tempId: number,
    changes: { title: string; dueDate: string | null; tasks: taskFormAtt[] }
  ) {
    this.newChecklists = this.newChecklists.map((cl) =>
      cl.tempId === tempId ? { ...cl, ...changes } : cl
    );
    console.log(this.newChecklists);
  }

  // General methods
  trackByStdTaskTempId(index: number, task: taskFormAtt) {
    return task.tempId;
  }
  trackByChecklistTempId(index: number, cl: checklistFormAtt) {
    return cl.tempId;
  }
  // A closure function to generate incremental IDs
  private generateTempId = (() => {
    let counter = 0;
    return () => ++counter;
  })();
  async onSubmit() {}
}
