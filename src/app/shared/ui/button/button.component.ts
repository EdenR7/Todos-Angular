import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class UiButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;

  get classes(): string {
    const base =
      'px-4 py-2 rounded-md font-medium transition-colors duration-200';
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
      secondary:
        'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
      danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300',
    };
    return `${base} ${variants[this.variant]}`;
  }
}
