import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseBlockComponent } from './components/course-block/course-block.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import routes from './courses.routes';
import { CreateCoursePageComponent } from './pages/create-course-page/create-course-page.component';

@NgModule({
  declarations: [
    CourseBlockComponent,
    CoursesPageComponent,
    CreateCoursePageComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class CoursesModule {}
