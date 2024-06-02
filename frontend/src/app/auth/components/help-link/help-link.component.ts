import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-help-link',
  templateUrl: './help-link.component.html',
  styleUrl: './help-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpLinkComponent {
  @Input({ required: true }) link!: string;
}
