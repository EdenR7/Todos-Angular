import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePickerComponent } from '../../../../shared/ui/date-picker/date-picker.component';
import { createDebouncer } from '../../../../shared/utils-functions/debounce';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-task-form',
  imports: [DatePickerComponent],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.scss',
})
export class CreateTaskFormComponent implements OnInit {
  @Input() dueDate: string | null = null;
  @Input() title: string | null = null;

  @Output() formChange = new EventEmitter<{
    title: string;
    dueDate: string | null;
  }>();

  private destroy$ = new Subject<void>();
  private titleDebouncer = createDebouncer<string>(300); // 300ms debounce

  localTitle = '';
  localDueDate: string | null = null;

  ngOnInit(): void {
    this.localTitle = this.title!;
    this.localDueDate = this.dueDate;

    this.titleDebouncer.stream
      .pipe(takeUntil(this.destroy$))
      .subscribe((debouncedTitle) => {
        this.localTitle = debouncedTitle;
        this.emitChanges();
      });
  }

  onTitleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.titleDebouncer.next(input.value);
    }
  }

  onDueDateInput(newDate: string | null) {
    this.localDueDate = newDate;
    this.emitChanges(); // Due date usually doesn't need debounce
  }

  emitChanges() {
    this.formChange.emit({
      title: this.localTitle,
      dueDate: this.localDueDate,
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
