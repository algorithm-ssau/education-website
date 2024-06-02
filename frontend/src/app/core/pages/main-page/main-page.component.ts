import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import CheckMobile from '../../../shared/utils/is-mobile';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  @CheckMobile() isMobile$!: Observable<boolean>;
}
