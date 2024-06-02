import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import CheckMobile from '../../../shared/utils/is-mobile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @CheckMobile() public isMobile$!: Observable<boolean>;

  public constructor(public route: ActivatedRoute) {}
}
