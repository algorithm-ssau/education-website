import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CourseBlockComponent } from './components/course-block/course-block.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    CourseBlockComponent,
    CoursesPageComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, MainPageComponent],
})
export class CoreModule {}
