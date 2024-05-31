import { Routes } from '@angular/router';
import { MainPageComponent } from './core/pages/main-page/main-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: MainPageComponent,
  },
  {
    path: 'auth',
    outlet: 'modal',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
export default routes;
