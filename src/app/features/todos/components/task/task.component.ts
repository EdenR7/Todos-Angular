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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [MatCheckboxModule, CommonModule, FormsModule],
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

  async toggleIsComplete(event: Event): Promise<void> {
    event.preventDefault();
    // const target = event.target as HTMLInputElement;
    // const taskId = target.id;
    if (!this.task) return;

    try {
      const newIsCompleteValue = !this.task.isComplete;
      await this.taskService.toggleTaskCompletion(
        this.task,
        newIsCompleteValue
      );
      this.task.isComplete = newIsCompleteValue;
    } catch (error) {
      console.log(error);
    }
  }

  async changeTitle(): Promise<void> {
    if (!this.task) return;
    try {
      await this.taskService.updateTaskTitle(this.task, this.task.title);
      
    } catch (error) {
      console.log(error);
    }
  }
}
