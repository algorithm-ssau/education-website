import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  public isOpen: boolean = false;

  public isAnimating: boolean = false;

  public constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
  ) {}

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
