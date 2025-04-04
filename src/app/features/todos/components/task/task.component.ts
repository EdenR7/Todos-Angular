import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject,
} from '@angular/core';
import { TaskI } from '../../types/task.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  imports: [MatCheckboxModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input() task: TaskI | null = null;
  private taskService = inject(TaskService);

  ngOnInit(): void {
    console.log('TaskComponent initialized');
  }

  isTask(): boolean {
    return this.task !== null;
  }

  toggleIsComplete(event: Event): void {
    event.preventDefault();
    // const target = event.target as HTMLInputElement;
    // const taskId = target.id;

    if (!this.task) {
      return;
    }
    this.taskService.toggleTaskCompletion(this.task);
    this.task.isComplete = !this.task.isComplete;
  }
}
