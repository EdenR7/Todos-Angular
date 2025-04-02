import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskI } from '../../types/task.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task',
  imports: [MatCheckboxModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task: TaskI | null = null;
  @Output() toggleComplete = new EventEmitter<boolean>();

  onToggleComplete(checked: boolean) {
    this.toggleComplete.emit(checked);
  }
}
