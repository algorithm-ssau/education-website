import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../shared/components/modal/modal.component';
import routes from './auth.routes';
import { AuthEntryComponent } from './components/auth-entry/auth-entry.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AuthEntryComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, ModalComponent, RouterModule.forChild(routes)],
})
export class AuthModule {}
