import { Routes } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import isAuthorizedGuard from '../auth/guards/is-authorized.guard';
import { CreateCoursePageComponent } from './pages/create-course-page/create-course-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-courses',
        component: CoursesPageComponent,
        canActivate: [isAuthorizedGuard],
      },
      {
        path: 'create',
        component: CreateCoursePageComponent,
        canActivate: [isAuthorizedGuard],
      },
    ],
  },
];
export default routes;
