import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import CourseDto from '../models/course-dto.model';
import Endpoints from '../../redux/enums/endpoints';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  public createCourse(course: CourseDto): Observable<boolean> {
    return this.httpClient.post<CourseDto>(Endpoints.CreateCourse, course).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  public getMyCourses(): Observable<CourseDto[]> {
    return this.httpClient.get<CourseDto[]>(Endpoints.MyCourses);
  }
}
