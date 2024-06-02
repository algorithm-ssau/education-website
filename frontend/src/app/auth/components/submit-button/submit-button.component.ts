import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitButtonComponent {
  @Input() value: string = '';
}
