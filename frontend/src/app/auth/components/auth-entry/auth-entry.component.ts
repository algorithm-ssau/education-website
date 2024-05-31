import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-auth-entry',
  templateUrl: './auth-entry.component.html',
  styleUrl: './auth-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthEntryComponent implements AfterViewInit {
  @ViewChild('modal') private modal!: ModalComponent;

  public constructor(public router: Router) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.modal.open();
    });
  }

  public onModalClose(): void {
    setTimeout(() => {
      this.router.navigate([{ outlets: { modal: null } }]);
    }, 200);
  }
}
