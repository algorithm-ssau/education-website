import { Routes } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import isAuthorizedGuard from '../auth/guards/is-authorized.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-courses',
        component: CoursesPageComponent,
        canActivate: [isAuthorizedGuard],
      },
    ],
  },
];
export default routes;
