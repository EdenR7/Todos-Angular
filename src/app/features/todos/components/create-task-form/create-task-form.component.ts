import { Component, Input } from '@angular/core';
import { DatePickerComponent } from '../../../../shared/ui/date-picker/date-picker.component';

@Component({
  selector: 'app-create-task-form',
  imports: [DatePickerComponent],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.scss',
})
export class CreateTaskFormComponent {
  @Input() dueDate: string | null = null;
  @Input() title: string | null = null;
}
