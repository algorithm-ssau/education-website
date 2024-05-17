import { Routes } from '@angular/router';
import { MainPageComponent } from './core/pages/main-page/main-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
export default routes;
