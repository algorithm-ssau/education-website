import { Routes } from '@angular/router';
import { AuthEntryComponent } from './components/auth-entry/auth-entry.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AuthEntryComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];
export default routes;
