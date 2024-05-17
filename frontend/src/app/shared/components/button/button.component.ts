import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective } from './button.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
