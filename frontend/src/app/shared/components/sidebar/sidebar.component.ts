import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() public side: 'left' | 'right' = 'left';

  public isOpen: boolean = false;

  public isAnimating: boolean = false;

  public constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
  ) {}

  public open(): void {
    this.isOpen = true;
    this.playAnimation();
  }

  public close(): void {
    this.isOpen = false;
    this.playAnimation();
  }

  private playAnimation(): void {
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
