import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import CheckMobile from '../../utils/is-mobile';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class SidebarComponent {
  @Input() public side: 'left' | 'right' = 'left';

  @Input() public closeOnDesktop: boolean = false;

  @CheckMobile() isMobile$!: Observable<boolean>;

  public isOpen: boolean = false;

  public isAnimating: boolean = false;

  public constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
  ) {
    if (this.closeOnDesktop) {
      this.isMobile$.pipe(untilDestroyed(this)).subscribe((isMobile) => {
        if (!isMobile) this.close();
      });
    }
  }

  public open(): void {
    this.isOpen = true;
    this.animateChangingState();
  }

  public close(): void {
    this.isOpen = false;
    this.animateChangingState();
  }

  private animateChangingState(): void {
    this.isAnimating = true;
    this.changeDetector.detectChanges();
    this.elementRef.nativeElement.addEventListener(
      'transitionend',
      () => {
        this.isAnimating = false;
        this.changeDetector.detectChanges();
      },
      { once: true },
    );
  }
}
