import { ChangeDetectionStrategy, Component } from '@angular/core';
import { take } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import CourseDto from '../../models/course-dto.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent {
  public tags: string[] = [
    'Образовательный курс',
    'Курс по программированию',
    'Курсы по русскому',
    'Математические курсы',
    'Курсы по физике',
  ];

  public get coursesNotEmpty(): boolean {
    return this.myCourses.length > 0;
  }

  public myCourses: CourseDto[] = [];

  public constructor(coursesService: CoursesService) {
    coursesService
      .getMyCourses()
      .pipe(take(1))
      .subscribe((courses) => {
        this.myCourses = courses;
      });
  }
}
