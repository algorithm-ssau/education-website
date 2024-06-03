import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-education-course',
  templateUrl: './education-course.component.html',
  styleUrl: './education-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationCourseComponent {}
