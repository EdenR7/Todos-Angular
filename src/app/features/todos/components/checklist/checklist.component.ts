import {
  Component,
  computed,
  effect,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { checkListI } from '../../types/checklist.interface';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskI } from '../../types/task.interface';
import { calculateCompletationPrecentage } from '../../../../shared/utils-functions/calculateCompletationPrecentage';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checklist',
  imports: [CommonModule, TaskComponent, MatIconModule],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
})
export class ChecklistComponent implements OnInit {
  @Input() set checklistInput(value: checkListI | null) {
    this.checkList.set(value);
  }
  checkList = signal<checkListI | null>(null);
  displayChecklist = false;
  changeDisplayChecklistI = 'expand_more';

  completationPrecentage = computed(() => {
    const cl = this.checkList();
    const completedTasks = this.completedTasks();
    if (!cl || !completedTasks) return 0;
    return calculateCompletationPrecentage(cl?.tasks.length, completedTasks);
  });
  completedTasks = computed(() => {
    return this.checkList()?.tasks.reduce((acc, task) => {
      return task.isComplete ? acc + 1 : acc;
    }, 0);
  });

  toggleChecklistTasks(): void {
    this.displayChecklist = !this.displayChecklist;
    this.changeDisplayChecklistI = this.displayChecklist
      ? 'expand_less'
      : 'expand_more';
  }

  ngOnInit(): void {
    console.log('ChecklistComponent initialized');
  }

  trackByTaskId(index: number, task: TaskI) {
    return task.id;
  }
}
