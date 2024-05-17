import { Routes } from '@angular/router';
import { MainPageComponent } from './core/pages/main-page/main-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { CoursesPageComponent } from './core/pages/courses-page/courses-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
export default routes;
