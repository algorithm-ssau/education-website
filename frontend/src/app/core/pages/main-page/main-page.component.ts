import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  isMobile: boolean = false;

  @HostListener('window:resize')
  public onResize(): void {
    this.isMobile = document.documentElement.offsetWidth <= 500;
  }
}
