import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import CheckMobile from '../../../shared/utils/is-mobile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @ViewChild('mobileSidebar') private mobileSidebar!: SidebarComponent;

  @CheckMobile() public isMobile$!: Observable<boolean>;

  public onBurgerMenuButtonClick(): void {
    this.mobileSidebar.open();
  }
}
