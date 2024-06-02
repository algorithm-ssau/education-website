import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input({ required: true }) control!: FormControl;

  @Input() type: string = 'text';

  @Input() placeholder: string = '';

  public errorMessage?: string;

  public onValueChange(): void {
    if (!this.control.errors) {
      this.errorMessage = undefined;
      return;
    }
    if (this.control.errors['minlength']) {
      this.errorMessage = `Минимальная длина = ${this.control.errors['minlength'].requiredLength}`;
    }
    if (this.control.errors['required'])
      this.errorMessage = 'Обязательное поле';
    if (this.control.errors['email']) this.errorMessage = 'Неверная почта';
  }
}
