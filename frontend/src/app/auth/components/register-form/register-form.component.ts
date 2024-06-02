import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import Register from '../../../redux/actions/register.action';
import { CloseNotificationService } from '../../services/close-notification.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  public formGroup = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  });

  public constructor(
    private store: Store,
    private closeNotificationService: CloseNotificationService,
  ) {}

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const { login, email, password } = this.formGroup.getRawValue();
      this.store
        .dispatch(new Register(email, login, password))
        .subscribe(() => {
          this.closeNotificationService.emitCloseEvent();
        });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
