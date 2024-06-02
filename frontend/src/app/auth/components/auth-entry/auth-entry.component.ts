import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CloseNotificationService } from '../../services/close-notification.service';

@Component({
  selector: 'app-auth-entry',
  templateUrl: './auth-entry.component.html',
  styleUrl: './auth-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthEntryComponent implements AfterViewInit {
  @ViewChild('modal') private modal!: ModalComponent;

  public constructor(
    public router: Router,
    closeNotificationService: CloseNotificationService,
  ) {
    closeNotificationService.closeNotification$.subscribe(() => {
      this.modal.close();
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.modal.open();
    });
  }

  public onModalClose(): void {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
