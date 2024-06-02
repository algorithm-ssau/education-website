import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/components/modal/modal.component';
import routes from './auth.routes';
import { AuthEntryComponent } from './components/auth-entry/auth-entry.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InputComponent } from './components/input/input.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { HelpLinkComponent } from './components/help-link/help-link.component';

@NgModule({
  declarations: [
    AuthEntryComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    InputComponent,
    SubmitButtonComponent,
    HelpLinkComponent,
  ],
  imports: [
    CommonModule,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
