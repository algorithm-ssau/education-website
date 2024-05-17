import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseBlockComponent } from './components/course-block/course-block.component';
import { EducationCourseComponent } from './components/education-course/education-course.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import routes from './courses.routes';

@NgModule({
  declarations: [
    CourseBlockComponent,
    EducationCourseComponent,
    CoursesPageComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CoursesModule {}
