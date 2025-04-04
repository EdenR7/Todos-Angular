import { Component, Input, OnInit } from '@angular/core';
import { checkListI } from '../../types/checklist.interface';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskI } from '../../types/task.interface';

@Component({
  selector: 'app-checklist',
  imports: [CommonModule, TaskComponent],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
})
export class ChecklistComponent implements OnInit {
  @Input() checkList: checkListI | null = null;

  ngOnInit(): void {
    console.log('ChecklistComponent initialized');
  }
  trackByTaskId(index: number, task: TaskI) {
    return task.id;
  }
}
