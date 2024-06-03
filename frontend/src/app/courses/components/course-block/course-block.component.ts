import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import CourseDto from '../../models/course-dto.model';

@Component({
  selector: 'app-course-block',
  templateUrl: './course-block.component.html',
  styleUrl: './course-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseBlockComponent {
  @Input({ required: true }) course!: CourseDto;
}
