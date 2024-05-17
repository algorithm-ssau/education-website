import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-course-block',
  templateUrl: './course-block.component.html',
  styleUrl: './course-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseBlockComponent {}
