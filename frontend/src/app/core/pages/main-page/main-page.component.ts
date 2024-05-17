import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IsMobileService } from '../../services/is-mobile.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  isMobile$: Observable<boolean>;

  isMobile: boolean = false;

  public constructor(isMobileService: IsMobileService) {
    this.isMobile$ = isMobileService.isMobile;
    isMobileService.isMobile.subscribe((newValue) => {
      this.isMobile = newValue;
    });
  }
}
