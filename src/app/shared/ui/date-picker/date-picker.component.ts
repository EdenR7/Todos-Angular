import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  imports: [CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  @Input() value: string | null = null; // ISO string (e.g., '2025-04-01')
  @Input() title: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  
  today: string = new Date().toISOString().split('T')[0]; // e.g., '2025-04-07'

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
