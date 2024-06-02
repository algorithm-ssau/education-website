import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import Login from '../../../redux/actions/login.action';
import { CloseNotificationService } from '../../services/close-notification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public formGroup = new FormGroup({
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
    private closeService: CloseNotificationService,
    private toastrService: ToastrService,
  ) {}

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.getRawValue();
      this.store
        .dispatch(new Login(email, '', password))
        .subscribe((newState: { user: string }) => {
          if (newState.user) this.closeService.emitCloseEvent();
          this.toastrService.success('Вы успешно вошли в аккаунт');
        });
    } else {
      this.toastrService.error('Пожалуйста, заполните форму корректно');
      this.formGroup.markAllAsTouched();
    }
  }
}
