import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrl: './create-course-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCoursePageComponent {
  public formGroup = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public constructor(
    private toastrService: ToastrService,
    private coursesService: CoursesService,
  ) {}

  public onSubmit(): void {
    if (!this.formGroup.valid)
      this.toastrService.error('Пожалуйста, заполните все поля');
    else {
      this.coursesService
        .createCourse(this.formGroup.getRawValue())
        .pipe(take(1))
        .subscribe((success) => {
          if (success) this.toastrService.success('Курс успешно создан');
        });
    }
  }
}
