import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import User from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public user!: User;

  public formGroup = new FormGroup({
    username: new FormControl(
      {
        value: '',
        disabled: true,
      },
      {
        validators: [Validators.required],
        nonNullable: true,
      },
    ),
    email: new FormControl(
      {
        value: '',
        disabled: true,
      },
      {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      },
    ),
    password: new FormControl(
      {
        value: '',
        disabled: true,
      },
      {
        validators: [Validators.required, Validators.minLength(8)],
        nonNullable: true,
      },
    ),
  });

  public isEditable: boolean = false;

  public constructor(
    route: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
  ) {
    route.data.pipe(take(1)).subscribe((user) => {
      this.user = user as User;
      this.formGroup.controls.username.setValue(this.user.username);
      this.formGroup.controls.email.setValue(this.user.email);
    });
  }

  public onEditToggle(): void {
    this.isEditable = !this.isEditable;
    Object.values(this.formGroup.controls).forEach((control) => {
      if (this.isEditable) control.enable();
      else {
        control.disable();
      }
    });

    if (!this.isEditable) {
      if (this.formGroup.valid)
        this.userService
          .updateUser(this.formGroup.getRawValue())
          .pipe(take(1))
          .subscribe(() => {
            this.toastrService.success('Профиль обновлен');
          });
      else this.toastrService.error('Пожалуйста, заполните форму корректно');
    }
  }
}
