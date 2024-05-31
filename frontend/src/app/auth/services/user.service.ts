import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import UserResponse from '../models/user-response.model';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public getUser(): Observable<User | null> {
    return this.httpClient.get<UserResponse>('user').pipe(
      map(({ user }) => user),
      catchError(() => {
        return of(null);
      }),
    );
  }
}
