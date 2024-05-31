import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
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
  @Output() public closed = new EventEmitter();

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
    this.closed.emit();
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
