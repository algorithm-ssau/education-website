import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @ViewChild('mobileSidebar') mobileSidebar!: SidebarComponent;

  public onBurgerMenuButtonClick(): void {
    this.mobileSidebar.open();
  }
}
