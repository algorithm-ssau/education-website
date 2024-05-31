import { Routes } from '@angular/router';
import { AuthEntryComponent } from './components/auth-entry/auth-entry.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import isNotAuthorizedGuard from './guards/is-not-authorized.guard';
import isAuthorizedGuard from './guards/is-authorized.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthEntryComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent,
        canActivate: [isNotAuthorizedGuard],
      },
      {
        path: 'register',
        component: RegisterFormComponent,
        canActivate: [isNotAuthorizedGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [isAuthorizedGuard],
      },
    ],
  },
];
export default routes;
